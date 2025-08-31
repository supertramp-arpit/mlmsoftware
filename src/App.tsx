import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PlatformsPage from './pages/PlatformsPage';
import MLMPlansPage from './pages/MLMPlansPage';
import PricingPage from './pages/PricingPage';
import MLMPlanDetail from './pages/MLMPlanDetail';
import ParticleBackground from './components/ParticleBackground';

function App() {
  useEffect(() => {
    // Add scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Handle hash navigation on home page
    const handleHashChange = () => {
      if (window.location.pathname === '/' && window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
          const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '100');
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight - 20,
            behavior: 'smooth'
          });
        }
      }
    };

    // Handle initial hash on page load
    setTimeout(handleHashChange, 100);
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden relative">
      <ParticleBackground />
      <Navigation />
      
      <div style={{ paddingTop: 'var(--nav-height)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/platforms" element={<PlatformsPage />} />
          <Route path="/mlm-plans" element={<MLMPlansPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/mlm-plans/:planName" element={<MLMPlanDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;