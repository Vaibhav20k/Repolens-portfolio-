import React from 'react'
import styles from './About.module.css'
import { portfolioData } from '../../data/portfolioData'

export default function About() {
  const { about, skills, achievements } = portfolioData

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
            {about.heading}
          </h2>
          
          <p className={styles.bodyText}>
            {about.paragraph}
          </p>
        </div>
      </div>

      {/* Grid of details for Skills & History */}
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
