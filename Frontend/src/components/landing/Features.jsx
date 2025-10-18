import React from 'react';

const features = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>,
    title: 'Connect to Your Data',
    description: 'Connect securely to your knowledge bases, product documentation, or other custom data sources. I\'ll build an intelligent, queryable resource that provides instant, accurate answers drawn directly from your own information.',
    screenshotUrl: 'https://via.placeholder.com/400x300.png/E0E7FF/4F46E5?text=Secure+Data+Connection'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>,
    title: 'Create a Personalized Shopping Assistant',
    description: 'Guide customers to the perfect product with an intelligent AI finder. From personalized recommendations to answering detailed product questions, create an experience that boosts engagement and sales.',
    screenshotUrl: 'https://via.placeholder.com/400x300.png/E0E7FF/4F46E5?text=AI+Product+Finder'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288" /></svg>,
    title: 'Automate & Elevate Support',
    description: 'Deploy a 24/7 support agent that resolves queries, creates tickets, and guides users, freeing up your team for high-value interactions and complex problem-solving.',
    screenshotUrl: 'https://via.placeholder.com/400x300.png/E0E7FF/4F46E5?text=Support+Chat'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>,
    title: 'A Solution Tailored to You',
    description: 'I don\'t give you a box of tools; I build your solution for you. As your dedicated AI specialist, I work directly with you to understand your goals and integrate a perfectly-tuned AI assistant into your workflow.',
    screenshotUrl: 'https://via.placeholder.com/400x300.png/E0E7FF/4F46E5?text=Custom+Integration+Plan'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">A Custom-Built Solution for Any Challenge</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            I leverage cutting-edge AI to build powerful, bespoke solutions that integrate seamlessly into your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              {/* <div className="bg-gray-100 rounded-md overflow-hidden">
                <img src={feature.screenshotUrl} alt={`${feature.title} screenshot`} className="w-full h-auto" />
              </div> */}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-gray-800">The Impact You Can Expect</h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <p className="text-4xl font-extrabold text-indigo-600">Up to 75%</p>
                    <p className="mt-2 text-gray-600 font-medium">Fewer Repetitive Questions</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <p className="text-4xl font-extrabold text-indigo-600">24/7</p>
                    <p className="mt-2 text-gray-600 font-medium">Lead Capture & Engagement</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <p className="text-4xl font-extrabold text-indigo-600">Instant</p>
                    <p className="mt-2 text-gray-600 font-medium">Response Times for Users</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Features;