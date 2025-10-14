import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { IoClose } from "react-icons/io5";

// 1. Accept the new isVisible prop
const ChatInterface = ({ isExpanded, setIsExpanded, isVisible }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const interfaceRef = useRef(null);

    const handleSendMessage = async () => {
        if (!query.trim() && !selectedImage) return;
        const userMessage = { text: query, type: 'user', image: selectedImage ? URL.createObjectURL(selectedImage) : null };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        const formData = new FormData();
        formData.append('query', query);
        if (selectedImage) formData.append('image', selectedImage);
        setQuery('');
        setSelectedImage(null);
        try {
            const response = await fetch('http://localhost:4000/api/v1/search', { method: 'POST', body: formData });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            setMessages(prev => [...prev, { text: '', type: 'bot' }]);
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text += chunk;
                    return newMessages;
                });
            }
        } catch (err) {
            console.error('API Error:', err);
            const errorMessage = { text: "Sorry, I ran into an error. Please try again.", type: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    // This effect handles clicks outside the component to collapse it
    useEffect(() => {
    function handleClickOutside(event) {
    if (interfaceRef.current && !interfaceRef.current.contains(event.target)) {
    setIsExpanded(false);
    }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [interfaceRef]);

    return (
        <div
      ref={interfaceRef}
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#1E1F22] border border-gray-700/80 shadow-2xl flex flex-col z-50 
                 transition-discrete  mb-5 
                 ${isExpanded ? 'h-[80vh] rounded-t-xl' : 'h-auto rounded-full'}
                 ${isVisible ? 'opacity-100 translate-y-0 ' : 'opacity-0 translate-y-full pointer-events-none'}`}
    >
      {isExpanded && (
        <div className="p-4 flex justify-between items-center text-white border-b border-gray-700/80">
          <h1 className="text-lg font-semibold">Recipe Bot</h1>
          <button onClick={() => setIsExpanded(false)} className="p-1 hover:bg-gray-700 rounded-full">
            <IoClose size={24} />
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="flex-1 flex flex-col-reverse overflow-y-auto bg-black/20 p-2">
          {loading && <TypingIndicator />}
          <MessageList messages={messages} />
        </div>
      )}
      
      <div onFocus={() => setIsExpanded(true)} className='rounded-full'>
        <ChatInput
          query={query}
          setQuery={setQuery}
          handleSendMessage={handleSendMessage}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default ChatInterface;