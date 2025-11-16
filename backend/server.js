const express = require('express');
const cors = require('cors');
const path = require('path');
const { mockSessions, mockConversations, tableTemplates } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
app.use(cors({
  origin: [
    'https://chat-app-project-1-97ff.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Serve React app for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

let sessionCounter = 5;

app.get('/api/sessions', (req, res) => {
  res.json(mockSessions);
});

app.get('/api/new-chat', (req, res) => {
  const newSessionId = sessionCounter.toString();
  const newSession = {
    id: newSessionId,
    title: `New Chat ${newSessionId}`,
    timestamp: new Date().toISOString()
  };
  
  mockSessions.unshift(newSession);
  mockConversations[newSessionId] = [];
  sessionCounter++;
  
  res.json({ sessionId: newSessionId });
});

app.get('/api/session/:id', (req, res) => {
  const sessionId = req.params.id;
  const conversation = mockConversations[sessionId] || [];
  res.json(conversation);
});

app.post('/api/chat/:id', (req, res) => {
  const sessionId = req.params.id;
  const userMessage = req.body.message;
  
  if (!mockConversations[sessionId]) {
    mockConversations[sessionId] = [];
  }
  
  mockConversations[sessionId].push({
    type: 'user',
    content: userMessage,
    timestamp: new Date().toISOString()
  });
  
  const randomTemplate = tableTemplates[Math.floor(Math.random() * tableTemplates.length)];
  
  const assistantResponse = {
    type: 'assistant',
    content: `I understand you're asking about "${userMessage}". Here's the information you requested:`,
    tableData: randomTemplate,
    timestamp: new Date().toISOString()
  };
  
  mockConversations[sessionId].push(assistantResponse);
  
  if (mockSessions.find(s => s.id === sessionId)?.title.startsWith('New Chat')) {
    const session = mockSessions.find(s => s.id === sessionId);
    session.title = userMessage.substring(0, 30) + (userMessage.length > 30 ? '...' : '');
  }
  
  res.json(assistantResponse);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
