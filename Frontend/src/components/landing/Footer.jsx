import React from 'react';
import { FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Column 1: Branding */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <h2 className="text-2xl font-bold">YourLogo</h2>
                        <p className="mt-4 text-gray-400">
                            Building custom AI assistants to solve your unique business challenges.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition"><FiTwitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><FiLinkedin size={20} /></a>
                            <a href="mailto:achuthrkumar@gmail.com" className="text-gray-400 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            </a>
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

                    {/* Column 4: Contact */}
                    <div>
                        <h3 className="font-semibold uppercase tracking-wider">Contact Us</h3>
                        <ul className="mt-4 space-y-2">
                            <li className="text-gray-400">
                                <a href="mailto:achuthrkumar@gmail.com" className="hover:text-white transition">achuthrkumar@gmail.com</a>
                            </li>
                            {/* <li className="text-gray-400">+1 (555) 123-4567</li> */}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Copyright Bar */}
            <div className="bg-gray-900 py-4">
                <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                    <span>Made with ❤️ by Achuth</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;