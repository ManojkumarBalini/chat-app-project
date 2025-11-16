import React, { useState, useRef } from 'react';

const ChatInput = ({ onSendMessage, isDarkMode, isMobile }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const quickSuggestions = [
    "Show analytics",
    "Team performance",
    "System specs",
    "Project status"
  ];

  return (
    <div className="w-full">
      {/* Quick Suggestions */}
      {message.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-3 animate-fade-in">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              className={`px-3 py-1.5 rounded-full text-sm smooth-transition hover-lift ${
                isDarkMode
                  ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative w-full">
        <div className={`relative rounded-2xl smooth-transition overflow-hidden w-full ${
          isFocused 
            ? 'ring-2 ring-blue-500 shadow-lg' 
            : 'shadow-md'
        } ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Message Lumibyte AI..."
            rows="1"
            className={`w-full resize-none py-4 px-4 focus:outline-none ${
              isDarkMode
                ? 'bg-gray-800 text-white placeholder-gray-400'
                : 'bg-white text-gray-900 placeholder-gray-500'
            } ${isMobile ? 'pr-16' : 'pr-20'}`}
            style={{ minHeight: '56px', maxHeight: '120px' }}
          />
          
          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center smooth-transition ${
              message.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : isDarkMode
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg 
              className={`w-5 h-5 smooth-transition ${
                message.trim() ? 'scale-100' : 'scale-90'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Character count and helper text */}
        <div className={`flex justify-between items-center mt-2 px-2 text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span>
            {message.length > 0 && `${message.length} characters`}
          </span>
          <span>Press Enter to send</span>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;