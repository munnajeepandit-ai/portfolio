import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // <-- AnimatePresence added
import { Link as ScrollLink } from 'react-scroll';
import styles from './Hero.module.css';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full-Stack Developer';
  const [index, setIndex] = useState(0);

  // Scroll indicator show/hide
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollIndicator(window.scrollY < 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Generate floating 3D particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: `${(i * 41) % 100}%`,
    top: `${(i * 13 + 20) % 100}%`,
    delay: (i % 8) * 0.3,
    scale: 0.7 + (i % 3) * 0.2,
  }));

  return (
    <section id="home" className={styles.hero}>
      {/* Animated background */}
      <div className={styles.background}>
        <div className={styles.particles}>
          {particles.map((particle, idx) => (
            <motion.div
              key={idx}
              className={styles.particle}
              style={{
                left: particle.left,
                top: particle.top,
                scale: particle.scale,
              }}
              animate={{
                y: [0, -55, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + particle.scale * 1.5,
                repeat: Infinity,
                delay: particle.delay,
                repeatType: 'loop',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
          className={styles.profileImage}
        >
          <div className={styles.imageContainer}>
            <div className={styles.imageGlow} />
            <div className={styles.imageRing}>
              <div className={styles.imageInner}>👨‍💻</div>
            </div>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={styles.greeting}
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={styles.name}
        >
          Munna Pandey
        </motion.h1>

        {/* Typing effect title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className={styles.title}>
            {typedText}
            <span className={styles.cursor}>|</span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={styles.tagline}
        >
          Crafting exceptional digital experiences with{' '}
          <span>React</span>, <span>Node.js</span>, and <span>MongoDB</span>.
          Specialized in building scalable full-stack applications with modern technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={styles.buttons}
        >
          <ScrollLink to="projects" smooth={true} duration={500} offset={-80}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className={styles.btnPrimary}
              type="button"
            >
              View Projects
            </motion.button>
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-80}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className={styles.btnSecondary}
              type="button"
            >
              Contact Me
            </motion.button>
          </ScrollLink>
        </motion.div>

        {/* Scroll Down Indicator (now auto-hides on scroll) */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className={styles.scrollIndicator}
            >
              <motion.div
                animate={{ y: [0, 18, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className={styles.scrollArrow}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <p>Scroll Down</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
