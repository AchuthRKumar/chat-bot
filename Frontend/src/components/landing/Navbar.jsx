import React from 'react';

const Navbar = ({ onBookCallClick}) => {
  // Define the reusable classes for the hover effect
  const linkClasses = "relative after:absolute after:bg-stone-400 after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:translate-y-1 after:opacity-0 hover:after:translate-y-0 hover:after:opacity-100 after:transition after:ease-in-out after:duration-200";
  return (
    <header className="fixed top-0 left-0 right-0  backdrop-blur-sm z-30">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Placeholder */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="#hero">Vector Chat</a>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
          <li><a href="#features" className={linkClasses}>Features</a></li>
          <li><a href="#how-it-works" className={linkClasses}>How It Works</a></li>
          <li><a href="#free-demo" className={linkClasses}>Free Demo</a></li> 
          <li><a href="#pricing" className={linkClasses}>Pricing</a></li>
          <li><button onClick={onBookCallClick} className={linkClasses}>Contact</button></li>
        </ul>

        {/* Mobile Menu Button (Optional, but good for future) */}
        <div className="md:hidden">
          {/* You can add a hamburger menu icon here later if needed */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;