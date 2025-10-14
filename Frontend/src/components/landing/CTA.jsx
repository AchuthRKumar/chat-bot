import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const CTA = () => {
  return (
    <section id="cta" className="py-20 bg-indigo-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Ready to Build Your Custom AI Assistant?
        </h2>

        <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
          Schedule a free, no-obligation discovery call directly with me. I will personally work with you to explore your needs and map out a strategy for your success.
        </p>

        <div className="mt-8">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-indigo-600 text-lg font-bold rounded-md shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            Book Your Free Strategy Call
            <FiChevronRight className="ml-2" />
          </a>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-indigo-200 opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>

            <span>Totally free to start. No purchase or commitment necessary.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;