import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onToggle, onClose, isDarkMode, isMobile }) => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/new-chat');
      const data = await response.json();
      navigate(`/chat/${data.sessionId}`);
      fetchSessions();
      if (isMobile) {
        onClose();
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleSessionClick = (sessionId) => {
    navigate(`/chat/${sessionId}`);
    if (isMobile) {
      onClose();
    }
  };

  const isActiveSession = (sessionId) => {
    return location.pathname === `/chat/${sessionId}`;
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={handleOverlayClick}
        ></div>
      )}
      
      <div className={`${isMobile ? 'fixed inset-y-0 left-0 w-80 transform' : 'fixed md:static md:inset-y-0 md:left-0 w-80 h-full'} ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } flex flex-col z-50 transition-transform duration-300 ease-out ${
        isDarkMode 
          ? 'bg-gray-900/95 backdrop-blur-xl border-r border-gray-700' 
          : 'bg-white/95 backdrop-blur-xl border-r border-gray-200'
      } ${!isOpen && !isMobile ? 'md:hidden' : ''}`}>
        
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={handleNewChat}
            className="btn-primary w-full group relative overflow-hidden text-sm"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Chat
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Recent Chats
              </h3>
              <button
                onClick={fetchSessions}
                className={`p-1 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {isLoading ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl animate-pulse ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    <div className={`h-3 rounded mb-2 ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`h-2 rounded w-3/4 ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => handleSessionClick(session.id)}
                    className={`w-full text-left p-3 rounded-xl smooth-transition hover-lift group ${
                      isActiveSession(session.id)
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                          : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                        : isDarkMode
                        ? 'hover:bg-gray-800/50 border border-transparent'
                        : 'hover:bg-gray-50/80 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium truncate mb-1 text-sm group-hover:text-blue-500 transition-colors ${
                          isActiveSession(session.id)
                            ? 'text-blue-500'
                            : isDarkMode
                            ? 'text-gray-200'
                            : 'text-gray-900'
                        }`}>
                          {session.title}
                        </div>
                        <div className={`text-xs ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {new Date(session.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`p-4 border-t flex-shrink-0 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 p-2 rounded-xl smooth-transition hover-lift cursor-pointer group">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-semibold text-xs ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            } group-hover:scale-110 transition-transform duration-300`}>
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-medium truncate text-sm ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                User Account
              </div>
              <div className={`text-xs truncate ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Free Plan
              </div>
            </div>
            <div className={`p-1 rounded ${
              isDarkMode 
                ? 'text-gray-400 group-hover:text-gray-300' 
                : 'text-gray-500 group-hover:text-gray-700'
            }`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;