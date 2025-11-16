import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ThemeToggle from './components/ThemeToggle';
import { useMobile } from './hooks/useMobile';

// Welcome component that handles the suggestion clicks
const Welcome = ({ isDarkMode, onCreateNewChat }) => {
  const navigate = useNavigate();

  const handleSuggestionClick = async (suggestion) => {
    try {
      const sessionId = await onCreateNewChat();
      if (sessionId) {
        // Navigate to the new chat session
        navigate(`/chat/${sessionId}`);
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <div className="text-center w-full max-w-md animate-fade-in">
        <div className="floating mb-6">
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-2xl' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl'
          }`}>
            💬
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gradient">
          Welcome to Lumibyte
        </h2>
        <p className={`text-sm mb-6 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Start a conversation with our AI assistant and get intelligent, structured responses.
        </p>
        <div className="space-y-3">
          <div 
            className={`p-3 rounded-xl text-left smooth-transition hover-lift cursor-pointer ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/80 shadow-sm'
            }`}
            onClick={() => handleSuggestionClick("Show me project metrics")}
          >
            <div className="font-semibold mb-1 text-sm">💡 Ask anything</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Get detailed answers with structured data
            </div>
          </div>
          <div 
            className={`p-3 rounded-xl text-left smooth-transition hover-lift cursor-pointer ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/80 shadow-sm'
            }`}
            onClick={() => handleSuggestionClick("What are the system requirements?")}
          >
            <div className="font-semibold mb-1 text-sm">📊 Structured responses</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Receive information in beautiful tables
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    if (!isMobile) {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const createNewChat = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/new-chat');
      const data = await response.json();
      return data.sessionId;
    } catch (error) {
      console.error('Error creating new chat:', error);
      return null;
    }
  };

  return (
    <Router>
      <div className={`min-h-screen w-full transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
      }`}>
        <div className="flex h-screen w-full overflow-hidden">
          {/* Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            onToggle={toggleSidebar}
            onClose={closeSidebar}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
          />
          
          {/* Main Content - Full width, no shifting */}
          <div className="flex-1 flex flex-col w-full">
            {/* Header - Full width, starts exactly after sidebar */}
            <header className={`glass border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } p-4 flex justify-between items-center sticky top-0 z-40`}>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleSidebar}
                  className={`p-3 rounded-2xl smooth-transition hover-lift ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm'
                  }`}
                  aria-label="Toggle sidebar"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center">
                    <div className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 ${
                      isSidebarOpen ? 'rotate-45 translate-y-0.5' : ''
                    }`}></div>
                    <div className={`w-4 h-0.5 bg-current rounded-full transition-all duration-300 mt-1 ${
                      isSidebarOpen ? '-rotate-45 -translate-y-0.5' : ''
                    }`}></div>
                  </div>
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  }`}>
                    L
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Lumibyte AI
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  Online
                </div>
                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={
                  <Welcome 
                    isDarkMode={isDarkMode} 
                    onCreateNewChat={createNewChat}
                  />
                } />
                <Route path="/chat/:sessionId" element={
                  <ChatWindow 
                    isDarkMode={isDarkMode} 
                    isMobile={isMobile}
                    isSidebarOpen={isSidebarOpen}
                  />
                } />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;