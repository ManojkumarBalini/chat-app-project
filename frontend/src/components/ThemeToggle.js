import React from 'react';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full smooth-transition p-1 ${
        isDarkMode
          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
          : 'bg-gradient-to-r from-yellow-400 to-orange-500'
      } shadow-lg hover:shadow-xl hover:scale-105`}
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg smooth-transition transform ${
          isDarkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        <div className="w-full h-full flex items-center justify-center">
          {isDarkMode ? (
            <span className="text-yellow-400 text-sm">🌙</span>
          ) : (
            <span className="text-orange-500 text-sm">☀️</span>
          )}
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className={`absolute inset-0 rounded-full overflow-hidden ${
        isDarkMode ? 'opacity-100' : 'opacity-0'
      } smooth-transition`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;