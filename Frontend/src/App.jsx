import React, { useState, useEffect, useRef } from 'react'; 
import ChatInterface from './components/chat/ChatInterface.jsx';
import Navbar from './components/landing/Navbar.jsx';
import Hero from './components/landing/Hero.jsx';
import Features from './components/landing/Features.jsx';
import HowItWorks from './components/landing/HowItWorks.jsx';
import WhyChooseUs from './components/landing/WhyChooseUs.jsx';
import Pricing from './components/landing/Pricing.jsx';
import FAQ from './components/landing/FAQ.jsx';
import CTA from './components/landing/CTA.jsx';
import Footer from './components/landing/Footer.jsx';
import BookingForm from './components/landing/BookingForm.jsx';
import FreeDemo from './components/landing/FreeDemo.jsx';


function App() {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  
  const [isChatBarVisible, setIsChatBarVisible] = useState(true);  
  const ctaRef = useRef(null);

  useEffect(() => {
    const mainScrollContainer = document.querySelector('main');
    
    const handleScroll = () => {
      if (ctaRef.current) {
        const { top } = ctaRef.current.getBoundingClientRect();
        const isVisible = top > window.innerHeight;
        setIsChatBarVisible(isVisible);
      }
    };

    if (mainScrollContainer) {
      mainScrollContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (mainScrollContainer) {
        mainScrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); 

  const handleBookCallClick = (tierName) => {
    setSelectedTier(tierName);
  }

  return (
    <main className="h-screen overflow-y-auto w-screen no-scrollbar">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10"></div>

      <Navbar onBookCallClick={() => setIsFormOpen(true)}/>

      <div className="relative z-10">
        <Hero onTryBotClick={() => setIsChatExpanded(true)} onBookCallClick={() => handleBookCallClick('Hero')} />
        <Features />
        <HowItWorks />
        <WhyChooseUs />
        <FreeDemo />
        <Pricing onBookCallClick={handleBookCallClick}/>
        <FAQ />
        <div ref={ctaRef}>
          <CTA onBookCallClick={() => handleBookCallClick('CTA')}/>
        </div>
        <Footer />
      </div>

      <ChatInterface
        isExpanded={isChatExpanded}
        setIsExpanded={setIsChatExpanded}
        isVisible={isChatBarVisible}
      />

      <BookingForm isOpen={selectedTier !== null} onClose={() => setSelectedTier(null)} selectedTier={selectedTier} />
    </main>
  );
}

export default App;