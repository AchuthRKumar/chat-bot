import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const Hero = ({ onTryBotClick, onBookCallClick }) => {
    return (
        <section id="hero" className="pt-24 pb-20">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
                    Go Beyond Simple Chat. <br />
                    Deploy an <span className="text-indigo-600">AI That Takes Action.</span>
                </h1>

                <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
                    I design and deploy specialized AI assistants that solve your unique challenges—from intelligent e-commerce finders and generative virtual try-ons to support agents deeply integrated with your business data.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button
                        onClick={onBookCallClick} 
                        className="flex items-center justify-center px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-md shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
                    >
                        Book a Free Call
                        <FiChevronRight className="ml-2" />
                    </button>
                    <button
                        onClick={onTryBotClick}
                        className="flex items-center justify-center px-8 py-3 bg-white text-gray-700 text-lg font-medium rounded-md shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 border border-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2"> {/* Added margin to the icon */}
                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>
                        Try the Bot Now
                    </button>
                </div>
            </div>

            <div className="mt-20 text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Custom-Built Solutions for Any Use Case
                </p>
                <div className="mt-6 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 md:gap-x-12 text-gray-600 opacity-80">
                    <span className="font-medium">AI Support Agents</span>
                    <span className="font-medium">E-commerce Assistants</span>
                    <span className="font-medium">Custom Data Insights</span>
                    <span className="font-medium">Generative Virtual Try-On</span>
                    <span className="font-medium">&amp; More</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;