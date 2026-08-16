import React, { useRef, useEffect } from 'react'
import styles from './WelcomeButton.module.css'

export default function WelcomeButton({ onNavigate }) {
  const buttonRef = useRef(null)
  const overlayRef = useRef(null)
  const animRef = useRef(null)
  const targetRadiusRef = useRef(0)
  const currentRadiusRef = useRef(0)
  const mousePosRef = useRef({ x: 105, y: 26 })

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    let isRunning = true

    const updateLoop = () => {
      if (!isRunning) return

      // Silky smooth spring interpolation for lens expansion & collapse
      const targetR = targetRadiusRef.current
      currentRadiusRef.current += (targetR - currentRadiusRef.current) * 0.2

      if (Math.abs(targetR - currentRadiusRef.current) < 0.2) {
        currentRadiusRef.current = targetR
      }

      const r = currentRadiusRef.current
      const { x, y } = mousePosRef.current

      if (r > 0.1) {
        overlay.style.clipPath = `circle(${r.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`
        overlay.style.opacity = '1'
        overlay.style.visibility = 'visible'
      } else {
        overlay.style.clipPath = `circle(0px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`
        overlay.style.opacity = '0'
        overlay.style.visibility = 'hidden'
      }

      animRef.current = requestAnimationFrame(updateLoop)
    }

    animRef.current = requestAnimationFrame(updateLoop)

    return () => {
      isRunning = false
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  const handlePointerMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handlePointerEnter = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    targetRadiusRef.current = 54
  }

  const handlePointerLeave = () => {
    targetRadiusRef.current = 0
  }

  const handleClick = (e) => {
    if (onNavigate) {
      onNavigate(e)
    } else {
      if (window.location.hash !== '#portfolio') {
        window.location.hash = 'portfolio'
      }
      const portfolioSection = document.getElementById('portfolio') || document.querySelector('main')
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

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
        ref={overlayRef}
        className={styles.lensOverlay}
        aria-hidden="true"
      >
        <span className={styles.hindiLabel}>
          स्वागतम्
        </span>
      </span>
    </button>
  )
}
