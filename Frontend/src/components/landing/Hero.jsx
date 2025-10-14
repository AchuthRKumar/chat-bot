import React from 'react';
import { FiChevronRight, FiPlayCircle } from 'react-icons/fi';

const Hero = ({ onTryBotClick }) => {
    return (
        <section id="hero" className="pt-16 pb-16">
            <div className="container mx-auto px-6 text-center">
                {/* MODIFIED: Main Headline */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
                    Go Beyond Simple Chat. <br />
                    Deploy an <span className="text-indigo-600">AI That Takes Action.</span>
                </h1>

                {/* MODIFIED: Sub-headline */}
                <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
                    From intelligent product finders and virtual try-ons to deeply integrated customer support and custom database agents. Build a specialized AI that solves your unique challenges.
                </p>

                {/* CTA Buttons (No change here) */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a
                        href="#contact"
                        className="flex items-center justify-center px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-md shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
                    >
                        Book a Free Demo
                        <FiChevronRight className="ml-2" />
                    </a>
                    <button
                        onClick={onTryBotClick}
                        className="flex items-center justify-center px-8 py-3 bg-white text-gray-700 text-lg font-medium rounded-md shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 border border-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>

                        Try the Bot Now
                    </button>
                </div>
            </div>

            {/* MODIFIED: Trust Bar to showcase use cases */}
            <div className="mt-20 text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Build a bot for any use case
                </p>
                <div className="mt-6 flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
                    <span className="font-semibold text-lg text-gray-600">Customer Support</span>
                    <span className="font-semibold text-lg text-gray-600">E-commerce</span>
                    <span className="font-semibold text-lg text-gray-600">Data Analysis</span>
                    <span className="font-semibold text-lg text-gray-600">Virtual Try-On</span>
                </div>
                <span className=" mt-6 flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 font-semibold text-lg text-gray-600">& More...</span>
            </div>
        </section>
    );
};

export default Hero;