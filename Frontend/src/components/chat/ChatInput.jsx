import React, { useRef, useState } from 'react';

const ChatInput = ({ query, setQuery, handleSendMessage, selectedImage, setSelectedImage, isLoading }) => {
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleCancelImage = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const adjustTextareaHeight = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        setQuery(e.target.value);
    };

    const handleTextareaKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="p-3 bg-[#1E1F22] rounded-full">
            {previewUrl && (
                <div className="relative w-20 h-20 mb-2 p-1 border border-gray-600 rounded-lg">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded" />
                    <button onClick={handleCancelImage} className="absolute top-0 right-0 -m-2 bg-gray-900 text-white rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
            )}
            <div className="flex items-center gap-2 p-1 rounded-full">
                <textarea
                    ref={textareaRef}
                    className="flex-1 bg-transparent text-sm pl-4 text-gray-200 placeholder-gray-300 resize-none focus:outline-none"
                    placeholder="Ask about recipes or ingredients..."
                    value={query}
                    onChange={adjustTextareaHeight}
                    onKeyDown={handleTextareaKeyPress}
                    rows={1}
                    disabled={isLoading}
                />
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageSelect} />
                <button onClick={() => fileInputRef.current.click()} className="p-2 text-gray-400 hover:text-white" title="Upload image"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </button>
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || (!query.trim() && !selectedImage)}
                    className="p-3 text-white bg-gray-600 rounded-full disabled:opacity-50 transition-all duration-300 transform hover:scale-110"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatInput;