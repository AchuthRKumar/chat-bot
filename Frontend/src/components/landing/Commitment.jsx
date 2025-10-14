import React from 'react';

const Commitment = () => {
  return (
    <section id="commitment" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-12 rounded-lg shadow-xl border border-gray-200 text-center">
          {/* Optional: Add a subtle icon or your logo here */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            More Than a Service, We're Your Partner
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Your success is the ultimate measure of our success. We are deeply committed to building an AI solution that not only meets your expectations but dramatically exceeds them. We're in this for the long haul, providing the support and expertise you need to grow and thrive.
          </p>
          
          {/* A large, impactful quote that acts as the testimonial */}
          <div className="mt-10 border-t-2 border-indigo-500 pt-8 max-w-2xl mx-auto">
            <p className="text-2xl font-medium text-gray-700 italic">
              "We believe the best AI is built through collaboration. We're not just a vendor; we're an extension of your team, dedicated to solving your biggest challenges."
            </p>
            <p className="mt-6 font-bold text-gray-800">
              — The Founders
            </p>
            {/* You can add your name here later */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitment;