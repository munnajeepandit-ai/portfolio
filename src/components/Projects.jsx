import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Projects.module.css';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'Mother Earth AI',
      category: 'AI Projects',
      description:
        'An innovative AI-powered platform addressing climate change challenges through intelligent data analysis and predictive modeling.',
      image: '🌍',
      tags: ['React', 'Node.js', 'AI API', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'HappyEnding',
      category: 'Full-Stack',
      description:
        'A service marketplace connecting consumers with local service providers through an intuitive request-and-accept system.',
      image: '🤝',
      tags: ['React', 'Node.js', 'MongoDB', 'Authentication'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      category: 'Web Apps',
      description:
        'Full-featured online shopping platform with cart management, payment integration, and admin dashboard.',
      image: '🛒',
      tags: ['React', 'Express', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 4,
      title: 'Task Management App',
      category: 'Web Apps',
      description:
        'Collaborative task management tool with real-time updates, team features, and progress tracking.',
      image: '✅',
      tags: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      category: 'Full-Stack',
      description:
        'Analytics dashboard for social media metrics with data visualization and reporting features.',
      image: '📊',
      tags: ['React', 'TypeScript', 'REST API', 'Charts'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      id: 6,
      title: 'Weather Forecast App',
      category: 'Web Apps',
      description:
        'Real-time weather application with location-based forecasts and interactive weather maps.',
      image: '🌤️',
      tags: ['React', 'Weather API'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  const filters = ['All', 'Web Apps', 'AI Projects', 'Full-Stack'];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className={styles.projects}>
      <div ref={ref} className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.filters}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? styles.filterBtnActive
                  : styles.filterBtn
              }
              type="button"
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className={styles.grid}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className={styles.projectCard}
                aria-label={`${project.title} project`}
              >
                {/* Project Icon/Image */}
                <div className={styles.projectImage}>
                  <div className={styles.projectEmoji}>{project.image}</div>
                  {/* Overlay */}
                  <div className={styles.projectOverlay}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className={styles.overlayBtn}
                    >
                      {/* Live demo SVG icon */}
                      <svg
                        className={styles.overlayIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View GitHub repo for ${project.title}`}
                      className={`${styles.overlayBtn} ${styles.overlayBtnSecondary}`}
                    >
                      {/* GitHub icon */}
                      <svg
                        className={styles.overlayIcon}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

                  {/* Tags */}
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className={styles.projectLinks}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkBtnPrimary}
                      aria-label={`Live demo of ${project.title}`}
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkBtnSecondary}
                      aria-label={`GitHub repo of ${project.title}`}
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className={styles.viewMore}
        >
          <a
            href="https://github.com/munnajeepandit-ai"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewMoreBtn}
          >
            View More on GitHub
            <svg
              className={styles.viewMoreIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
