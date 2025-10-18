import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { IoClose } from "react-icons/io5";

const initialMessage = {
  type: 'intro', 
  text: `
Welcome to the Recipe Bot Demo!

This is a sample chatbot with knowledge formed from a database of recipes from a famous Chef's website.

**Here's what you can try:**

*   **Ask for a recipe:**  
    *"Can I get the recipe for Chicken Tikka Masala?"*

*   **Get creative with an image:**  
    Upload a photo of your ingredients, and I'll suggest a recipe you can cook!
  `
};
const ChatInterface = ({ isExpanded, setIsExpanded, isVisible }) => {
  const [messages, setMessages] = useState([initialMessage]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const sessionIdRef = useRef(null); 
  
  const interfaceRef = useRef(null);

    const handleSendMessage = async () => {
        if (!query.trim() && !selectedImage) return;

        const userMessage = { text: query, type: 'user', image: selectedImage ? URL.createObjectURL(selectedImage) : null };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        let requestBody;
        let requestHeaders = {};

        if (selectedImage) {
            const formData = new FormData();
            formData.append('query', query);
            formData.append('image', selectedImage);
            // --- FIX: Read the ID from the ref's .current property ---
            if (sessionIdRef.current) {
                formData.append('sessionId', sessionIdRef.current);
            }
            requestBody = formData;
        } else {
            requestBody = JSON.stringify({
                query: query,
                // --- FIX: Read the ID from the ref's .current property ---
                sessionId: sessionIdRef.current 
            });
            requestHeaders['Content-Type'] = 'application/json';
        }
        
        setQuery('');
        setSelectedImage(null);

        try {
            const response = await fetch('https://chat-bot-rec7.onrender.com/api/v1/search', { 
                method: 'POST', 
                headers: requestHeaders,
                body: requestBody 
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            // --- FIX: Check the ref's current value to see if we need a new ID ---
            if (!sessionIdRef.current) {
                const newSessionId = response.headers.get('X-Session-Id');
                if (newSessionId) {
                    console.log("New session started with ID:", newSessionId);
                    // --- FIX: Update the ref's .current property. This does NOT cause a re-render. ---
                    sessionIdRef.current = newSessionId;
                }
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            setMessages(prev => [...prev, { text: '', type: 'bot' }]);

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    const lastMessage = updatedMessages[updatedMessages.length - 1];
                    updatedMessages[updatedMessages.length - 1] = {
                        ...lastMessage,
                        text: lastMessage.text + chunk,
                    };
                    return updatedMessages;
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

    const handleCloseChat = () => {
        setIsExpanded(false);
        setMessages([initialMessage]);
        sessionIdRef.current = null; 
        console.log("Chat closed and session has been reset.");
    };

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
            className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#1E1F22] border border-gray-700/80 shadow-2xl flex flex-col z-50 transition-[height,opacity,transform] duration-300 ease-in-out mb-5
                 ${isExpanded ? 'h-[80vh] rounded-xl' : 'h-auto rounded-full'}
                 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[calc(100%+20px)] pointer-events-none'}`}
        >
            {isExpanded && (
                <div className="p-4 flex justify-between items-center text-white border-b border-gray-700/80">
                    <h1 className="text-lg font-semibold">Recipe Bot</h1>
                    <button onClick={handleCloseChat} className="p-1 hover:bg-gray-700 rounded-full">
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
      
            <div onClick={() => !isExpanded && setIsExpanded(true)}>
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