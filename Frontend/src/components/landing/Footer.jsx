import React from 'react';
import { FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    <div className="col-span-1">
                        <h2 className="text-2xl font-bold">Vector Chat</h2>
                        <p className="mt-4 text-gray-400">
                            Building custom AI assistants to solve your unique business challenges.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="https://x.com/achuth_rk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg></a>
                            {/* <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition"><FiLinkedin size={20} /></a> */}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-semibold uppercase tracking-wider">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                            <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a></li>
                            <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                            <li><a href="#faq" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="font-semibold uppercase tracking-wider">Contact</h3>
                        <ul className="mt-4 space-y-2">
                            <li className="text-gray-400 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                                <a href="mailto:achuthrkumar@gmail.com" className="hover:text-white transition">achuthrkumar@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="bg-gray-900 py-4">
                <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                    <span>Made with ❤️ by Achuth</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;