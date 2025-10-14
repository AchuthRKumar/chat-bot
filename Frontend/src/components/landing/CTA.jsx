import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const CTA = () => {
  return (
    <section id="cta" className="py-20 bg-indigo-600">
      <div className="container mx-auto px-6 text-center">
        {/* Main Headline */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Ready to Build Your Custom AI Assistant?
        </h2>
        
        {/* Sub-headline */}
        <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
          Schedule a free, no-obligation discovery call with our team. Let's explore your needs and map out a strategy for your success.
        </p>
        
        {/* CTA Button */}
        <div className="mt-8">
          <a
            href="#contact" // This will link to the contact/footer section
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-indigo-600 text-lg font-bold rounded-md shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            Book Your Free Strategy Call
            <FiChevronRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;