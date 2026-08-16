import React from 'react'
import styles from './LandingBackground.module.css'

export default function LandingBackground() {
  return (
    <div className={styles.backgroundViewport}>
      {/* Subtle organic paper/fabric fiber texture */}
      <div className={styles.paperGrain} aria-hidden="true" />
    </div>
  )
}
