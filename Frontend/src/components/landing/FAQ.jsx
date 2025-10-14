import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const faqData = [
  {
    question: "How is your service different from a DIY chatbot platform?",
    answer: "DIY platforms provide the tools; I provide the complete solution. I handle the entire process from strategy and development to integration and ongoing support. This saves you time, guarantees a professional result, and ensures the AI is perfectly tailored to solve your specific business challenges."
  },
  {
    question: "What kind of data can the AI be trained on?",
    answer: "Virtually any data source you have. This includes your public website, internal documentation, FAQs, knowledge bases, product catalogs, and even direct connections to your private databases or APIs. The more comprehensive the data, the more powerful the AI."
  },
  {
    question: "How long does the custom build process typically take?",
    answer: "The timeline depends on the complexity of the project. A standard support or lead-gen bot can often be ready for launch within 2-4 weeks. More complex solutions, like a virtual try-on, will have a more detailed timeline which we'll establish during our discovery call."
  },
  {
    question: "Can the chatbot's appearance be customized to match my brand?",
    answer: "Absolutely. I ensure the chatbot's interface, colors, fonts, and icons are all styled to seamlessly integrate with your website's existing design for a consistent and professional user experience."
  },
  {
    question: "What does 'ongoing support' include?",
    answer: "My partnership with you continues after launch. I provide technical support, monitor the AI's performance, and offer strategic advice for improvements. As your business evolves, I help ensure your AI assistant evolves with it."
  }
];

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800"
        onClick={onClick}
      >
        <span>{item.question}</span>
        <FiChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <p className="text-gray-600">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Frequently Asked Questions</h2>
          {/* Minor tweak for consistency */}
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? I've got answers. If you don't find what you're looking for, feel free to contact me.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;