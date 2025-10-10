import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start items-center p-4">
      <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;