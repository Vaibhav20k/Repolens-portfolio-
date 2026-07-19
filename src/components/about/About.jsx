import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './About.module.css'
import { portfolioData } from '../../data/portfolioData'
import ScrollHighlightText from '../hero/ScrollHighlightText'

function TechTicker() {
  const disciplines = [
    "MACHINE LEARNING",
    "DEEP LEARNING",
    "DATA SCIENCE",
    "GENERATIVE AI",
    "LLM SYSTEMS",
    "COMPUTER VISION",
    "NATURAL LANGUAGE PROCESSING",
    "MLOPS"
  ]

  // Triple items for seamless continuous looping in marquee
  const tickerItems = [...disciplines, ...disciplines, ...disciplines]

  return (
    <div className={styles.tickerContainer}>
      <div className={styles.tickerLabel}>W H A T   I   D O</div>
      <div className={styles.tickerViewport}>
        <div className={styles.tickerTrack}>
          {tickerItems.map((item, idx) => (
            <span key={idx} className={styles.tickerItem}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const { about, skills, achievements, experience } = portfolioData
  const [focusedCardId, setFocusedCardId] = useState(null) // null | 'skills' | 'experience' | 'milestones'

  // Escape key exits Focus Mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFocusedCardId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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

      {/* "What I Do" Infinite Marquee Technology Ticker */}
      <TechTicker />

      {/* 3-Column Grid for Skills, Experience, and History (Tiles click to Focus) */}
      <div className={styles.detailsGrid}>
        <motion.div 
          layoutId="skills-card"
          className={`${styles.gridColumn} clickable`}
          onClick={() => setFocusedCardId('skills')}
          whileHover={{ y: -6 }}
        >
          <h3 className={styles.columnHeader}>CORE SKILLS</h3>
          <ul className={styles.skillsList}>
            <li>
              <span className={styles.skillCategory}>Machine Learning:</span>
              <span className={styles.skillValues}>
                {(skills.machineLearning || []).slice(0, 4).join(", ")}...
              </span>
            </li>

            <li>
              <span className={styles.skillCategory}>Deep Learning:</span>
              <span className={styles.skillValues}>
                {(skills.deepLearning || []).slice(0, 4).join(", ")}...
              </span>
            </li>

            <li>
              <span className={styles.skillCategory}>AI & LLMs:</span>
              <span className={styles.skillValues}>
                {(skills.ai || []).slice(0, 4).join(", ")}...
              </span>
            </li>

            <li>
              <span className={styles.skillCategory}>Languages:</span>
              <span className={styles.skillValues}>
                {(skills.languages || []).slice(0, 4).join(", ")}...
              </span>
            </li>
          </ul>
          <div className={styles.clickPrompt}>[ CLICK TO EXPAND ]</div>
        </motion.div>

        <motion.div 
          layoutId="experience-card"
          className={`${styles.gridColumn} clickable`}
          onClick={() => setFocusedCardId('experience')}
          whileHover={{ y: -6 }}
        >
          <h3 className={styles.columnHeader}>EXPERIENCE</h3>
          <ul className={styles.experienceList}>
            {experience.map((exp, idx) => (
              <li key={idx} className={styles.experienceItem}>
                <div className={styles.expRole}>{exp.role}</div>
                <div className={styles.expOrg}>
                  {exp.org}
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.clickPrompt}>[ CLICK TO EXPAND ]</div>
        </motion.div>

        <motion.div 
          layoutId="milestones-card"
          className={`${styles.gridColumn} clickable`}
          onClick={() => setFocusedCardId('milestones')}
          whileHover={{ y: -6 }}
        >
          <h3 className={styles.columnHeader}>MILESTONES</h3>
          <div className={styles.timeline}>
            {achievements.slice(0, 3).map((ach, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineIndicator}></div>
                <div className={styles.timelineContent}>{ach.slice(0, 50)}...</div>
              </div>
            ))}
          </div>
          <div className={styles.clickPrompt}>[ CLICK TO EXPAND ]</div>
        </motion.div>
      </div>

      {/* Focus Mode Card Dialog */}
      <AnimatePresence>
        {focusedCardId && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              className={styles.focusOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFocusedCardId(null)}
            />

            {/* Focused Modal Element */}
            <div className={styles.focusModalContainer}>
              <motion.div
                layoutId={`${focusedCardId}-card`}
                className={styles.focusedCard}
              >
                {/* Close Button */}
                <button 
                  className={`${styles.closeBtn} clickable`}
                  onClick={() => setFocusedCardId(null)}
                  title="Close Focus Mode (ESC)"
                >
                  ✕
                </button>

                {/* Core Skills Expanded Content */}
                {focusedCardId === 'skills' && (
                  <div className={styles.focusedCardContent}>
                    <h3 className={styles.focusedColumnHeader}>CORE SKILLS</h3>
                    <div className={styles.skillsExpandedList}>
                      {Object.entries(skills).map(([category, list]) => (
                        <div key={category} className={styles.skillsCategoryGroup}>
                          <h4 className={styles.skillsSubHeader}>
                            {{
                              languages: "Languages",
                              machineLearning: "Machine Learning",
                              deepLearning: "Deep Learning",
                              ai: "AI & LLMs",
                              dataScience: "Data Science",
                              dataEngineering: "Data Engineering",
                              backend: "Backend Development",
                              databases: "Databases",
                              devops: "DevOps & Cloud"
                            }[category] || category}
                          </h4>
                          <div className={styles.skillsPillsContainer}>
                            {list.map(skill => (
                              <span key={skill} className={styles.skillPill}>{skill}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience Expanded Content */}
                {focusedCardId === 'experience' && (
                  <div className={styles.focusedCardContent}>
                    <h3 className={styles.focusedColumnHeader}>EXPERIENCE</h3>
                    <div className={styles.richContentList}>
                      {experience.map((exp, idx) => (
                        <div key={idx} className={styles.expExpandedItem}>
                          <div className={styles.expHeaderRow}>
                            <span className={styles.expExpandedRole}>{exp.role}</span>
                            <span className={styles.expExpandedDuration}>{exp.duration}</span>
                          </div>
                          <div className={styles.expExpandedOrg}>{exp.org}</div>
                          <p className={styles.expExpandedDesc}>{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milestones Expanded Content */}
                {focusedCardId === 'milestones' && (
                  <div className={styles.focusedCardContent}>
                    <h3 className={styles.focusedColumnHeader}>MILESTONES & ACHIEVEMENTS</h3>
                    <div className={styles.richContentList}>
                      {achievements.map((ach, idx) => (
                        <div key={idx} className={styles.milestoneExpandedItem}>
                          <div className={styles.milestoneRow}>
                            <span className={styles.milestoneIcon}>🏆</span>
                            <span className={styles.milestoneText}>{ach}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
