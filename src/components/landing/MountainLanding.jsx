import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './MountainLanding.module.css'

// Configurable lens radius in one central place
const LENS_RADIUS = 140

export default function MountainLanding() {
  const containerRef = useRef(null)
  const [lensPos, setLensPos] = useState({ x: -999, y: -999 })
  const [isHovered, setIsHovered] = useState(false)
  const [isRealLoaded, setIsRealLoaded] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const targetPosRef = useRef({ x: -999, y: -999 })
  const currentPosRef = useRef({ x: -999, y: -999 })
  const rafRef = useRef(null)

  // Detect touch / non-hover devices
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches || 'ontouchstart' in window)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Smooth lens position interpolation (requestAnimationFrame)
  const updateLens = useCallback(() => {
    if (!isHovered) {
      rafRef.current = null
      return
    }

    const ease = 0.25
    currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * ease
    currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * ease

    setLensPos({
      x: Math.round(currentPosRef.current.x),
      y: Math.round(currentPosRef.current.y)
    })

    rafRef.current = requestAnimationFrame(updateLens)
  }, [isHovered])

  const handleMouseEnter = (e) => {
    if (isTouchDevice || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    targetPosRef.current = { x, y }
    currentPosRef.current = { x, y }
    setLensPos({ x, y })
    setIsHovered(true)
  }

  const handleMouseMove = (e) => {
    if (isTouchDevice || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    targetPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updateLens)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const clipPathStyle = isHovered && isRealLoaded && !isTouchDevice
    ? `circle(${LENS_RADIUS}px at ${lensPos.x}px ${lensPos.y}px)`
    : 'circle(0px at -999px -999px)'

  return (
    <div className={styles.landingViewport}>
      {/* Subtle paper/fabric fiber texture overlay */}
      <div className={styles.paperTexture} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Himalayan Mountain System (Phase 2) */}
      <section 
        className={styles.mountainSection}
        aria-label="Himalayan Mountain Visual Feature"
      >
        <div
          ref={containerRef}
          className={`${styles.mountainContainer} ${isHovered && !isTouchDevice ? styles.lensActive : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Base Layer: Mountain Sketch Line Art (always visible) */}
          <img
            src="/mountain_sketch.png"
            alt="Himalayan Mountain Sketch"
            className={styles.mountainSketch}
            loading="eager"
            decoding="async"
            draggable="false"
          />

          {/* Reveal Layer: Photorealistic Himalayan Mountain (revealed only inside circular lens) */}
          <img
            src="/real-mountain.jpg"
            alt=""
            aria-hidden="true"
            className={styles.mountainReal}
            style={{
              clipPath: clipPathStyle,
              WebkitClipPath: clipPathStyle,
              opacity: isRealLoaded ? 1 : 0
            }}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsRealLoaded(true)}
            draggable="false"
          />

          {/* Minimal Lens Border Ring */}
          {isHovered && isRealLoaded && !isTouchDevice && lensPos.x >= 0 && (
            <div
              className={styles.lensRing}
              style={{
                width: `${LENS_RADIUS * 2}px`,
                height: `${LENS_RADIUS * 2}px`,
                transform: `translate(${lensPos.x - LENS_RADIUS}px, ${lensPos.y - LENS_RADIUS}px)`,
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </section>
    </div>
  )
}
