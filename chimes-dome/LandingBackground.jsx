import React from 'react'
import styles from './LandingBackground.module.css'
import IndianDomeCloth from './IndianDomeCloth'

export default function LandingBackground({ onNavigate }) {
  return (
    <div className={styles.backgroundViewport}>
      {/* Central Indian Dome & Devanagari Physics Hanging Cloth + Welcome Button */}
      <IndianDomeCloth onNavigate={onNavigate} />
    </div>
  )
}
