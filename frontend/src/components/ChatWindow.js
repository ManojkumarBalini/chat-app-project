import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';
import TableResponse from './TableResponse';
import AnswerFeedback from './AnswerFeedback';

const ChatWindow = ({ isDarkMode, isMobile, isSidebarOpen }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sessionId } = useParams();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      fetchSessionHistory();
    }
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchSessionHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/session/${sessionId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching session history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { 
      type: 'user', 
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/chat/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const assistantResponse = await response.json();
      setMessages(prev => [...prev, { ...assistantResponse, timestamp: new Date().toISOString() }]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        tableData: null,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate dynamic width for chat input based on sidebar state
  const getChatInputWidth = () => {
    if (isMobile) {
      return 'w-full'; // Full width on mobile
    }
    return isSidebarOpen ? 'w-[calc(100%-20rem)]' : 'w-full'; // Adjust based on sidebar
  };

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center h-full w-full p-4">
        <div className={`text-center p-6 rounded-2xl max-w-md w-full ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
        } shadow-xl backdrop-blur-sm`}>
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-xl">
            ⚠️
          </div>
          <h2 className="text-xl font-bold mb-2 text-gradient">No Session Selected</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Please start a new chat or select an existing one from the sidebar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 pb-20"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <div className={`text-center p-6 rounded-2xl max-w-md w-full ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
            } shadow-xl backdrop-blur-sm animate-fade-in`}>
              <div className="floating mb-4">
                <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-2xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                } shadow-xl`}>
                  🚀
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gradient">Start Conversation</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Ask me anything and I'll provide intelligent responses with structured data.
              </p>
              <div className="grid grid-cols-1 gap-2 text-left">
                {[
                  "Show me project metrics",
                  "What are the system requirements?",
                  "Display team performance data"
                ].map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg smooth-transition hover-lift cursor-pointer text-sm ${
                      isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-50 hover:bg-white'
                    }`}
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`w-full max-w-3xl mx-auto message-enter`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`rounded-2xl p-4 smooth-transition hover-lift ${
                message.type === 'user'
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl'
                  : isDarkMode
                  ? 'bg-gray-800/80 border border-gray-700 shadow-lg'
                  : 'bg-white/80 border border-gray-200 shadow-lg'
              }`}>
                {/* Message Header */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    message.type === 'user'
                      ? 'bg-white/20 text-white'
                      : isDarkMode
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  }`}>
                    {message.type === 'user' ? 'U' : 'AI'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">
                      {message.type === 'user' ? 'You' : 'Lumibyte AI'}
                    </div>
                    <div className={`text-xs ${
                      message.type === 'user' 
                        ? 'text-white/70' 
                        : isDarkMode 
                          ? 'text-gray-400' 
                          : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="whitespace-pre-wrap leading-relaxed text-sm">
                  {message.content}
                </div>
                
                {/* Table Data */}
                {message.tableData && (
                  <div className="mt-4 animate-fade-in">
                    <TableResponse data={message.tableData} isDarkMode={isDarkMode} />
                  </div>
                )}
                
                {/* Feedback */}
                {message.type === 'assistant' && (
                  <div className="mt-4 pt-3 border-t border-gray-300 dark:border-gray-600">
                    <AnswerFeedback isDarkMode={isDarkMode} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="w-full max-w-3xl mx-auto animate-fade-in">
            <div className={`rounded-2xl p-4 ${
              isDarkMode
                ? 'bg-gray-800/80 border border-gray-700'
                : 'bg-white/80 border border-gray-200'
            } shadow-lg`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                } text-white`}>
                  AI
                </div>
                <div className="flex space-x-1">
                  <div className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-4 w-full" />
      </div>

      {/* Chat Input - Dynamically positioned based on sidebar state */}
      <div className={`fixed bottom-0 ${getChatInputWidth()} transition-all duration-300 z-30 ${
        isMobile ? 'pb-4 left-0' : isSidebarOpen ? 'left-80' : 'left-0'
      }`}>
        <div className={`px-4 pt-4 backdrop-blur-lg bg-gradient-to-t ${
          isDarkMode 
            ? 'from-gray-900/80 via-gray-900/40 to-transparent border-t border-gray-700/50' 
            : 'from-white/80 via-white/40 to-transparent border-t border-gray-200/50'
        }`}>
          <div className="max-w-3xl w-full mx-auto">
            <ChatInput onSendMessage={handleSendMessage} isDarkMode={isDarkMode} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;