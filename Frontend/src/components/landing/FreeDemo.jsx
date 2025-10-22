import React, { useState } from 'react';

const FreeDemo = () => {
    const VITE_FORM_API = import.meta.env.VITE_FORM_API;
    const [formData, setFormData] = useState({
        url: '',
        email: ''
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
            subject: "New Free Demo Request from Vector Chat Website", 
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
                setStatus(`Success! I'll build your demo and email a private link to ${formData.email} shortly.`);
                setIsSuccess(true);
                setFormData({ url: '', email: '' }); 
            } else {
                console.error("Form submission error:", result);
                setStatus(result.message || 'An error occurred. Please try again.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setStatus('An error occurred while submitting the form.');
            setIsSuccess(false);
        }
    };

    return (
        <section id="free-demo" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    See It in Action: Your AI, Your Data
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Stop imagining. See for yourself how an AI assistant can master your content. Provide your website URL, and I'll build a free, temporary proof-of-concept bot just for you.
                </p>

                <div className="mt-10 max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="url" className="block text-left text-sm font-medium text-gray-700">Your Website URL</label>
                            <input
                                type="url"
                                name="url"
                                id="url"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="https://yourbusiness.com"
                                value={formData.url}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">Your Business Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="you@yourbusiness.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50"
                            disabled={status === 'Submitting...'}
                        >
                            {status === 'Submitting...' ? 'Building...' : 'Build My Free Demo'}
                        </button>
                    </form>
                    
                    {status && status !== 'Submitting...' && (
                        <p className={`text-center text-sm mt-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                            {status}
                        </p>
                    )}

                    <p className="mt-4 text-xs text-gray-500">
                        This is a limited, proof-of-concept demo. The bot's knowledge will be restricted to the URL provided. The demo will be active for 48 hours.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FreeDemo;