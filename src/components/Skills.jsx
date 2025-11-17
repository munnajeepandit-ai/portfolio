import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Skills.module.css';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '🎨',
      skills: [
        { name: 'React', level: 90, icon: '⚛️' },
        { name: 'JavaScript', level: 88, icon: '📜' },
        { name: 'TypeScript', level: 82, icon: '📘' },
        { name: 'HTML/CSS', level: 95, icon: '🌐' },
        { name: 'Tailwind CSS', level: 90, icon: '🎨' },
      ],
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85, icon: '🟢' },
        { name: 'Express', level: 83, icon: '🚂' },
        { name: 'REST APIs', level: 88, icon: '🔌' },
      ],
    },
    {
      title: 'Database',
      icon: '💾',
      skills: [
        { name: 'MongoDB', level: 85, icon: '🍃' },
        { name: 'Schema Design', level: 82, icon: '📊' },
      ],
    },
    {
      title: 'Tools & Others',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 87, icon: '📝' },
        { name: 'API Integration', level: 90, icon: '🔗' },
        { name: 'Authentication', level: 85, icon: '🔐' },
        { name: 'UI/UX Design', level: 80, icon: '🎯' },
      ],
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className={styles.skills}>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={styles.container}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className={styles.header}>
          <h2 className={styles.title}>Skills & Expertise</h2>
          <p className={styles.subtitle}>
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className={styles.grid}>
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={styles.category}
              tabIndex={-1}
            >
              {/* Category header */}
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon} role="img" aria-label={`${category.title} icon`}>
                  {category.icon}
                </span>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
              </div>

              {/* Skills list */}
              <div className={styles.skillsList}>
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <div className={styles.skillName}>
                        <span className={styles.skillIcon} role="img" aria-label={`${skill.name} icon`}>
                          {skill.icon}
                        </span>
                        <span>{skill.name}</span>
                      </div>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>

                    <div className={styles.progressBar}>
                      <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: idx * 0.1 + skillIdx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills cloud */}
        <motion.div
          variants={itemVariants}
          className={styles.additionalSkills}
          tabIndex={-1}
        >
          <h3 className={styles.additionalTitle}>Also Familiar With</h3>
          <div className={styles.tags}>
            {[
              'Redux',
              'Webpack',
              'Vite',
              'Figma',
              'Postman',
              'JWT',
              'OAuth',
              'Responsive Design',
              'Performance Optimization',
              'SEO',
              'Accessibility',
              'Agile/Scrum',
            ].map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.12, y: -5 }}
                className={styles.tag}
                tabIndex={0}
                role="listitem"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
