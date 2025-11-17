import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Eager load critical components (above the fold)
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';

// Lazy load non-critical components for better performance
const About = lazy(() => import('./components/About.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Projects = lazy(() => import('./components/Projects.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

// Import global styles
import './App.css';
import './index.css';

/* ========================================
   LOADING SPINNER COMPONENT
   ======================================== */
const LoadingSpinner = () => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-dark-bg to-dark-card z-50"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative w-24 h-24">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 border-4 border-transparent border-t-primary border-r-purple-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Middle rotating ring */}
      <motion.div
        className="absolute inset-4 border-4 border-transparent border-b-purple-500 border-l-primary rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner pulsing dot */}
      <motion.div
        className="absolute inset-8 bg-gradient-to-r from-primary to-purple-500 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Loading text */}
      <motion.p
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-16 text-primary font-semibold text-sm tracking-widest uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading
      </motion.p>
    </div>
  </motion.div>
);

/* ========================================
   SCROLL TO TOP BUTTON COMPONENT
   ======================================== */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-purple-500 hover:from-primary-dark hover:to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-bg group"
          whileHover={{
            scale: 1.1,
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.5)',
          }}
          whileTap={{
            scale: 0.95,
          }}
          aria-label="Scroll to top"
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ========================================
   MAIN APP COMPONENT
   ======================================== */
function App() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initial page load effect
  useEffect(() => {
    // Simulate initial loading
    const loadingTimer = setTimeout(() => setLoading(false), 1200);
    
    // Mark as mounted for animations
    setMounted(true);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Add performance observer
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log(`${entry.name}: ${entry.duration}ms`);
          }
        });
        observer.observe({ entryTypes: ['measure', 'navigation'] });
        return () => observer.disconnect();
      } catch (e) {
        console.log('Performance observer not supported');
      }
    }
  }, []);

  return (
    <div className="App min-h-screen bg-dark-bg transform-gpu">
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && <LoadingSpinner key="loading-spinner" />}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full min-h-screen flex flex-col"
          >
            {/* Navigation */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1 w-full">
              {/* Hero Section - Eager Loaded */}
              <Hero />

              {/* Lazy Loaded Sections */}
              <Suspense
                fallback={
                  <motion.div
                    className="min-h-screen flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <p className="text-gray-400 text-sm font-medium tracking-widest">
                        Loading section...
                      </p>
                    </div>
                  </motion.div>
                }
              >
                {/* About Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <About />
                </motion.div>

                {/* Skills Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Skills />
                </motion.div>

                {/* Projects Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Projects />
                </motion.div>

                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Contact />
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Footer />
                </motion.div>
              </Suspense>
            </main>

            {/* Scroll to Top Button */}
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
