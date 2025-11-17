import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Navbar.module.css';

const navItems = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For react-scroll spy
  const handleSetActive = (to) => setActiveSection(to);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.navContainer}>
        {/* Logo */}
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className={styles.logo}
          tabIndex={0}
        >
          <motion.div
            whileHover={{ scale: 1.06, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 330, damping: 22 }}
          >
            &lt;Dev Portfolio /&gt;
          </motion.div>
        </ScrollLink>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.to}>
              <ScrollLink
                to={item.to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-80}
                onSetActive={handleSetActive}
                className={activeSection === item.to ? styles.active : ''}
                tabIndex={0}
              >
                <motion.span
                  whileHover={{ scale: 1.12, y: -2 }}
                  className={styles.linkText}
                >
                  {item.name}
                </motion.span>
                {activeSection === item.to && (
                  <motion.div
                    layoutId="activeSection"
                    className={styles.activeUnderline}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.menuButton}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg
            className={styles.menuIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className={styles.mobileMenu}
          >
            <ul>
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + 0.07 * idx }}
                >
                  <ScrollLink
                    to={item.to}
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-80}
                    className={activeSection === item.to ? styles.active : ''}
                    onClick={() => setIsOpen(false)}
                    tabIndex={0}
                  >
                    {item.name}
                  </ScrollLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
