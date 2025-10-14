import React, { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">A Plan for Every Ambition</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a starting point for our conversation. All plans are fully customized to your needs.
          </p>
        </div>

        {/* Annual/Monthly Toggle */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <span className={`font-medium ${!isAnnual ? 'text-indigo-600' : 'text-gray-500'}`}>Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} className="sr-only peer" />
            <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
          <span className={`font-medium ${isAnnual ? 'text-indigo-600' : 'text-gray-500'}`}>
            Annually <span className="text-sm text-green-500">(Save up to 20%)</span>
          </span>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Tier 1: LaunchPad */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800">LaunchPad</h3>
            <p className="mt-2 text-gray-500">Perfect for startups and single-use case needs.</p>
            <ul className="mt-6 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> One core AI function (e.g., Support Bot)</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Trained on your knowledge base</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Standard website integration</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Basic analytics</li>
            </ul>
            <a href="#contact" className="mt-8 block w-full text-center px-6 py-3 bg-gray-100 text-indigo-600 font-semibold rounded-md hover:bg-gray-200 transition">Get a Custom Quote</a>
          </div>

          {/* Tier 2: Growth Engine (Highlighted) */}
          <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-indigo-600 flex flex-col relative">
            <span className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
            <h3 className="text-2xl font-bold text-gray-800">Growth Engine</h3>
            <p className="mt-2 text-gray-500">For businesses looking to scale with advanced AI.</p>
            <ul className="mt-6 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Multiple AI functions (e.g., Support + Sales)</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Connect to custom databases & APIs</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Advanced integration (Slack, CRM, etc.)</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Detailed analytics & reporting</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Priority support</li>
            </ul>
            <a href="#contact" className="mt-8 block w-full text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">Get a Custom Quote</a>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800">Enterprise</h3>
            <p className="mt-2 text-gray-500">For complex, mission-critical AI solutions.</p>
            <ul className="mt-6 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Fully bespoke AI capabilities (e.g., Virtual Try-On)</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Custom data pipelines & model tuning</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Dedicated account manager</li>
              <li className="flex items-start"><FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" /> Performance SLAs & advanced security</li>
            </ul>
            <a href="#contact" className="mt-8 block w-full text-center px-6 py-3 bg-gray-100 text-indigo-600 font-semibold rounded-md hover:bg-gray-200 transition">Book a Strategy Call</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;