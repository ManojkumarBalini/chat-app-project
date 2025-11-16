import React, { useState } from 'react';

const AnswerFeedback = ({ isDarkMode }) => {
  const [feedback, setFeedback] = useState(null);
  const [showThanks, setShowThanks] = useState(false);

  const handleFeedback = (type) => {
    setFeedback(type);
    setShowThanks(true);
    
    // Hide thanks message after 3 seconds
    setTimeout(() => {
      setShowThanks(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Was this helpful?
        </span>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleFeedback('like')}
            disabled={feedback !== null}
            className={`p-2 rounded-xl smooth-transition transform hover:scale-110 ${
              feedback === 'like'
                ? 'bg-green-500/20 text-green-500 shadow-inner'
                : isDarkMode
                ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700'
                : 'text-gray-500 hover:text-green-500 hover:bg-gray-100'
            } ${feedback && feedback !== 'like' ? 'opacity-50' : ''}`}
          >
            <div className={`transform smooth-transition ${
              feedback === 'like' ? 'scale-110' : ''
            }`}>
              👍
            </div>
          </button>
          
          <button
            onClick={() => handleFeedback('dislike')}
            disabled={feedback !== null}
            className={`p-2 rounded-xl smooth-transition transform hover:scale-110 ${
              feedback === 'dislike'
                ? 'bg-red-500/20 text-red-500 shadow-inner'
                : isDarkMode
                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
            } ${feedback && feedback !== 'dislike' ? 'opacity-50' : ''}`}
          >
            <div className={`transform smooth-transition ${
              feedback === 'dislike' ? 'scale-110' : ''
            }`}>
              👎
            </div>
          </button>
        </div>
      </div>

      {/* Thank you message */}
      {showThanks && (
        <div className={`text-center py-2 px-4 rounded-xl smooth-transition animate-fade-in ${
          isDarkMode 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span>🎉</span>
            <span>Thank you for your feedback!</span>
          </div>
        </div>
      )}

      {/* Additional feedback option */}
      {feedback && !showThanks && (
        <div className={`p-3 rounded-xl ${
          isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className={`text-xs mb-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Want to provide more detailed feedback?
          </div>
          <button className={`text-xs px-3 py-1 rounded-lg smooth-transition ${
            isDarkMode 
              ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
          }`}>
            Share additional comments
          </button>
        </div>
      )}
    </div>
  );
};

export default AnswerFeedback;