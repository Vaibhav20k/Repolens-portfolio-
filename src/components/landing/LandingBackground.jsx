import React from 'react'
import styles from './LandingBackground.module.css'
import HimalayanMountainLens from './HimalayanMountainLens'

export default function LandingBackground() {
  return (
    <div className={styles.backgroundViewport}>
      {/* Procedural Himalayan Mountain Range & Interactive Circular Lens */}
      <HimalayanMountainLens />
    </div>
  )
}
