import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const BookingForm = ({ isOpen, onClose }) => {
    const VITE_FORM_API = import.meta.env.VITE_FORM_API;
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectDetails: '',
    });
    const [status, setStatus] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');
        setIsSuccess(null);

        const finalFormData = {
            ...formData,
            access_key: VITE_FORM_API,
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(finalFormData)
            });

            const result = await response.json();

            if (result.success) {
                setStatus('Thank you! Your details have been submitted.');
                setIsSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000); 
            } else {
                console.error("Form submission error:", result);
                setStatus(result.message || 'An error occurred.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setStatus('An error occurred while submitting the form.');
            setIsSuccess(false);
        }
    };

    return (
        // Backdrop
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity"
        >
            {/* Modal Content */}
            <div
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
                className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full text-gray-800 transform transition-all"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold font-poppins">Let's Build Your AI Bot</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <FiX size={24} />
                    </button>
                </div>

                <p className="mb-6 text-gray-600 font-montserrat">
                    Please fill out the form below, and I'll get back to you within 24 hours to discuss your project.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" >

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700">Tell me about your project (Optional)</label>
                        <textarea name="projectDetails" id="projectDetails" rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={formData.projectDetails} onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50" disabled={status === 'Submitting...'}>
                        {status === 'Submitting...' ? 'Sending...' : 'Submit Details'}
                    </button>

                    {status && status !== 'Submitting...' && (
                        <p className={`text-center text-sm mt-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                            {status}
                        </p>
                    )}
                </form>

                <div className="mt-6 text-center">
                    <a
                        href="https://calendly.com/achuthrkumar/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        Rather jump straight to booking a call?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;