import React from 'react'; // Removed useState as the toggle is gone
import { FiCheckCircle } from 'react-icons/fi';

const Pricing = ({ onBookCallClick }) => {
  // The isAnnual state and toggle have been removed for clarity.
  return (
    <section id="pricing" className="py-20 bg-gray-50"> {/* Added background for visual separation */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">A Plan for Every Ambition</h2>
          {/* REVISED: Wording is more direct and personal */}
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            These tiers are designed as a starting point for our conversation. Every solution I build is fully customized to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Tier 1: LaunchPad */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800">LaunchPad</h3>
            <p className="mt-2 text-gray-500">Perfect for startups and single-use case needs.</p>
            <div className="mt-6">
              <span className="text-3xl font-extrabold text-gray-800">Begins at ₹1999</span>
              <span className="text-lg font-medium text-gray-500">/ month</span>
            </div>
            <ul className="mt-6 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> One core AI function (e.g., Support Bot)</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Trained on your knowledge base</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Standard website integration</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Basic analytics</li>
            </ul>
            <button onClick={() => onBookCallClick('Launch Pad')} className="mt-8 block w-full text-center px-6 py-3 bg-gray-100 text-indigo-600 font-semibold rounded-md hover:bg-gray-200 transition">Get a Custom Quote</button>
          </div>

          {/* Tier 2: Growth Engine (Highlighted) */}
          <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-indigo-600 flex flex-col relative">
            <span className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
            <h3 className="text-2xl font-bold text-gray-800">Growth Engine</h3>
            <p className="mt-2 text-gray-500">For businesses looking to scale with advanced AI.</p>
            <div className="mt-6">
              <span className="text-3xl font-extrabold text-gray-800">Begins at ₹4499</span>
              <span className="text-lg font-medium text-gray-500">/month</span>
            </div>
            <ul className="mt-6 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Multiple AI functions (e.g., Support + Sales)</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Connect to custom databases & APIs</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Advanced integration (Slack, CRM, etc.)</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Detailed analytics & reporting</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Priority support</li>
            </ul>
            <button onClick={() => onBookCallClick('Growth Engine')} className="mt-8 block w-full text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">Get a Custom Quote</button>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800">Enterprise</h3>
            <p className="mt-2 text-gray-500">For complex, mission-critical AI solutions.</p>
            <ul className="mt-6 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Advanced generative solutions (e.g., AI Virtual Try-On)</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Custom data pipelines & model tuning</li>              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Direct one-on-one partnership and strategy with me</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Performance SLAs & advanced security</li>
            </ul>
            <button onClick={() => onBookCallClick('Enterprise')} className="mt-8 block w-full text-center px-6 py-3 bg-gray-100 text-indigo-600 font-semibold rounded-md hover:bg-gray-200 transition">Book a Free Call</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;