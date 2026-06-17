import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './About.module.css'
import { portfolioData } from '../../data/portfolioData'
import ScrollHighlightText from '../hero/ScrollHighlightText'

const disciplines = [
  "AI ENGINEERING",
  "FULL STACK",
  "DATA SCIENCE",
  "RAG SYSTEMS",
  "API DESIGN"
]

function StackedRotatingWords() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % disciplines.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.stackedRotationContainer}>
      <div className={styles.stackedRotationLabel}>W H A T   I   D O</div>
      <div className={styles.stackedRotationViewport}>
        <motion.div 
          className={styles.stackedRotationList}
          animate={{ y: -activeIndex * 60 }}
          transition={{ type: 'spring', stiffness: 90, damping: 15 }}
        >
          {disciplines.map((discipline, idx) => {
            const isActive = idx === activeIndex
            return (
              <motion.div
                key={idx}
                className={`${styles.stackedRotationItem} ${isActive ? styles.activeItem : ''}`}
                animate={{
                  scale: isActive ? 1.05 : 0.9,
                  opacity: isActive ? 1 : 0.25,
                }}
                transition={{ duration: 0.4 }}
              >
                {discipline}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default function About() {
  const { about, skills, achievements, experience } = portfolioData

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.sectionHeader}>
        <div className="uppercase-spaced">A B O U T   M E</div>
      </div>

      <div className={styles.aboutContent}>
        {/* Large Decorative Overlapping Accent Circle */}
        <div className={styles.decorativeCircle}></div>

        <div className={styles.textBlock}>
          {/* Oversized Bold Text */}
          <h2 className={styles.oversizedTitle}>
            <ScrollHighlightText text={about.heading} enableProximity={true} />
          </h2>
          
          <p className={styles.bodyText}>
            <ScrollHighlightText text={about.paragraph} enableProximity={true} />
          </p>
        </div>
      </div>

      {/* "What I Do" Stacked Rotating Ticker */}
      <StackedRotatingWords />

      {/* 3-Column Grid for Skills, Experience, and History */}
      <div className={styles.detailsGrid}>
        <div className={styles.gridColumn}>
          <h3 className={styles.columnHeader}>CORE SKILLS</h3>
          <ul className={styles.skillsList}>
            <li>
              <span className={styles.skillCategory}>AI Engineering:</span>
              <span className={styles.skillValues}>{skills.ai.join(', ')}</span>
            </li>
            <li>
              <span className={styles.skillCategory}>Full Stack:</span>
              <span className={styles.skillValues}>{skills.frameworks.join(', ')}</span>
            </li>
            <li>
              <span className={styles.skillCategory}>Languages:</span>
              <span className={styles.skillValues}>{skills.languages.join(', ')}</span>
            </li>
            <li>
              <span className={styles.skillCategory}>Databases:</span>
              <span className={styles.skillValues}>{skills.databases.join(', ')}</span>
            </li>
          </ul>
        </div>

        <div className={styles.gridColumn}>
          <h3 className={styles.columnHeader}>EXPERIENCE</h3>
          <ul className={styles.experienceList}>
            {experience.map((exp, idx) => (
              <li key={idx} className={styles.experienceItem}>
                <div className={styles.expRole}>{exp.role}</div>
                <div className={styles.expOrg}>
                  {exp.org} <span className={styles.expDuration}>— {exp.duration}</span>
                </div>
                <p className={styles.expDesc}>{exp.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.gridColumn}>
          <h3 className={styles.columnHeader}>MILESTONES</h3>
          <div className={styles.timeline}>
            {achievements.map((ach, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineIndicator}></div>
                <div className={styles.timelineContent}>{ach}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
