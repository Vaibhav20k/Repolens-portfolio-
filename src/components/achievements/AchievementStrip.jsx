import React from 'react'
import styles from './AchievementStrip.module.css'

export default function AchievementStrip() {
  const items = [
    "NASA SPACE APPS CHALLENGE — GLOBAL TOP 5 FINISH",
    "SMART INDIA HACKATHON PARTICIPANT",
    "IIT ROORKEE DATA SCIENCE & AI PROGRAMME",
    "DELOITTE AUSTRALIA DATA ANALYTICS CERTIFICATION",
  ]

  // Double the list for infinite looping marquee
  const marqueeItems = [...items, ...items]

  return (
    <div className={styles.stripWrapper}>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((item, idx) => (
            <div key={idx} className={styles.marqueeItem}>
              <span className={styles.dot}></span>
              <span className={styles.text}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
