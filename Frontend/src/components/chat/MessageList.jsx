import React, { useRef, useEffect } from 'react';
import Markdown from 'react-markdown';

const MessageList = ({ messages }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-lg lg:max-w-xl px-4 py-3 rounded-2xl ${
              msg.type === 'user' 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="Uploaded content"
                className="max-h-48 rounded-lg mb-2"
              />
            )}
            {msg.type === 'bot' ? (
              <div className='prose'>
                <Markdown>{msg.text}</Markdown>
              </div>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;