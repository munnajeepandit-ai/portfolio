import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, type: "spring" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 40 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className={styles.about}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={styles.container}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className={styles.header}>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.subtitle}>
            Get to know more about my background and expertise
          </p>
        </motion.div>

        <div className={styles.content}>
          {/* Left: 3D Image + Badges */}
          <motion.div variants={itemVariants} className={styles.imageSection}>
            <div className={styles.imageGlow} />
            <div className={styles.imageContainer}>
              <div className={styles.imageInner}>
                {/* Your Avatar (replace with <img src=... /> for photo) */}
                <span className={styles.emoji} role="img" aria-label="Laptop">
                  💻
                </span>
              </div>
            </div>
            {/* Floating Badges */}
            <motion.div
              className={`${styles.badge} ${styles.badgeTop}`}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              tabIndex={-1}
            >
              Full-Stack Dev
            </motion.div>
            <motion.div
              className={`${styles.badge} ${styles.badgeBottom}`}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
              tabIndex={-1}
            >
              React Expert
            </motion.div>
          </motion.div>

          {/* Right: Bio & Stats */}
          <motion.div variants={itemVariants} className={styles.textSection}>
            <p className={styles.text}>
              I'm a passionate <span>Full-Stack Developer</span> with expertise in building <span>modern, scalable web applications</span>.
              My journey in web development has led me to specialize in the <span>MERN stack</span> (MongoDB, Express, React, Node.js), where I craft seamless user experiences from front to back.
            </p>
            <p className={styles.text}>
              I have hands-on experience developing innovative projects like <span>Mother Earth AI</span>, an AI-powered climate change solution, and <span>HappyEnding</span>, a service marketplace platform connecting consumers with local service providers. These showcase my ability to integrate AI APIs, implement robust authentication, and design intuitive UIs.
            </p>
            <p className={styles.text}>
              My toolkit includes React for dynamic frontends, Node.js for scalable backends, MongoDB for flexible databases, and strong expertise in API integration, database schema design, and authentication systems. I'm always learning to deliver high-quality, production-ready apps.
            </p>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>10+</div>
                <div className={styles.statLabel}>Projects</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>3+</div>
                <div className={styles.statLabel}>Years Exp</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>15+</div>
                <div className={styles.statLabel}>Technologies</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
