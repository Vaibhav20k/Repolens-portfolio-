import React, { useEffect, useState, useRef } from 'react'
import styles from './Mascot.module.css'

export default function Mascot({ resetExperience }) {
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 })
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const mascotRef = useRef(null)

  // Track cursor position to simulate eyes following mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mascotRef.current) return
      
      const rect = mascotRef.current.getBoundingClientRect()
      const mascotCenterX = rect.left + rect.width / 2
      const mascotCenterY = rect.top + rect.height / 2
      
      const dx = e.clientX - mascotCenterX
      const dy = e.clientY - mascotCenterY
      const distance = Math.hypot(dx, dy)
      
      // Limit eye motion range
      const maxOffset = 4
      if (distance > 0) {
        const factor = Math.min(distance / 200, 1)
        setEyeOffset({
          x: (dx / distance) * maxOffset * factor,
          y: (dy / distance) * maxOffset * factor
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Simulate random head turns and looks at random intervals
  useEffect(() => {
    const interval = setInterval(() => {
      // 30% chance to look in a random direction
      if (Math.random() < 0.35) {
        const randomX = (Math.random() - 0.5) * 15 // +/- 7.5deg
        const randomY = (Math.random() - 0.5) * 10 // +/- 5deg
        setHeadRotation({ x: randomX, y: randomY })
      } else {
        // Return to center
        setHeadRotation({ x: 0, y: 0 })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className={`${styles.mascotContainer} clickable`} 
      ref={mascotRef}
      onClick={resetExperience}
      title="Click to reboot experience"
    >
      {/* Floating Wrapper */}
      <div className={styles.floater}>
        {/* Glowing Orange Dot */}
        <div className={styles.antennaGlow}></div>

        {/* Ear Left */}
        <div className={styles.earLeft}></div>
        {/* Ear Right */}
        <div className={styles.earRight}></div>

        {/* Head Surface */}
        <div 
          className={styles.head}
          style={{
            transform: `rotateX(${headRotation.y}deg) rotateY(${headRotation.x}deg)`
          }}
        >
          {/* Eye Left */}
          <div className={styles.eyeContainer}>
            <div className={styles.eye}>
              <div 
                className={styles.pupil}
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`
                }}
              />
            </div>
          </div>

          {/* Eye Right */}
          <div className={styles.eyeContainer}>
            <div className={styles.eye}>
              <div 
                className={styles.pupil}
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`
                }}
              />
            </div>
          </div>

          {/* Nose */}
          <div className={styles.nose}></div>
          
          {/* Whisker Lines */}
          <div className={styles.whiskerLeft1}></div>
          <div className={styles.whiskerLeft2}></div>
          <div className={styles.whiskerRight1}></div>
          <div className={styles.whiskerRight2}></div>
        </div>
      </div>
    </div>
  )
}
