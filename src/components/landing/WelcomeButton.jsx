import React, { useState, useRef } from 'react'
import styles from './WelcomeButton.module.css'

export default function WelcomeButton({ onNavigate }) {
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef(null)

  const handlePointerMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setLensPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handlePointerEnter = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setLensPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsHovered(true)
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
  }

  const handleClick = (e) => {
    if (onNavigate) {
      onNavigate(e)
    } else {
      // Default navigation to portfolio route/hash
      if (window.location.hash !== '#portfolio') {
        window.location.hash = 'portfolio'
      }
      const portfolioSection = document.getElementById('portfolio') || document.querySelector('main')
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const lensRadius = 54

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.welcomeButton}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      aria-label="Welcome to portfolio"
    >
      {/* Base Layer: WELCOME (Dark Brown Background, Cream Text) */}
      <span className={styles.baseLabel}>
        WELCOME
      </span>

      {/* Lens Overlay Layer: स्वागतम् (Cream Background, Dark Brown Bold Hindi Text in Tiro Devanagari Hindi) */}
      <span
        className={styles.lensOverlay}
        style={{
          clipPath: isHovered
            ? `circle(${lensRadius}px at ${lensPos.x}px ${lensPos.y}px)`
            : `circle(0px at ${lensPos.x}px ${lensPos.y}px)`,
        }}
        aria-hidden="true"
      >
        <span className={styles.hindiLabel}>
          स्वागतम्
        </span>
      </span>
    </button>
  )
}
