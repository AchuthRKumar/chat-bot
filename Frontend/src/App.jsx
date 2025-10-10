import React from 'react';
import ChatInterface from './components/chat/ChatInterface.jsx';

function App() {
  return (
    <main className="w-screen h-screen bg-gray-100 font-sans">
      {/* Your landing page content will go here */}
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-bold text-gray-800">Your SaaS Landing Page</h1>
        <p className="text-gray-600 mt-4 text-lg">Interact with our Recipe Bot below!</p>
      </div>
      
      <ChatInterface />
    </main>
  );
}

export default App;