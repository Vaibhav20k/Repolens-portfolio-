import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import styles from './PixelTransition.module.css'

export default function PixelTransition({ 
  children, 
  expandedContent, 
  gridSize = 12, 
  pixelColor = 'var(--color-accent)', 
  animationStepDuration = 0.35,
  disabled = false
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [showExpanded, setShowExpanded] = useState(false)
  const containerRef = useRef(null)
  const pixelGridRef = useRef(null)
  const pixelsRef = useRef([])

  const totalPixels = gridSize * gridSize

  useEffect(() => {
    // Hide pixel grid initially
    gsap.set(pixelGridRef.current, { display: 'none' })
  }, [])

  useEffect(() => {
    if (disabled) {
      setIsHovered(false)
      setShowExpanded(false)
      const pixels = pixelsRef.current
      gsap.killTweensOf(pixels)
      gsap.set(pixels, { scale: 0, opacity: 0 })
      gsap.set(pixelGridRef.current, { display: 'none' })
    }
  }, [disabled])

  const handleMouseEnter = () => {
    if (disabled || isHovered) return
    setIsHovered(true)

    const pixels = pixelsRef.current
    gsap.killTweensOf(pixels)
    
    // Show grid overlay
    gsap.set(pixelGridRef.current, { display: 'grid' })

    // Step 1: scale pixels in (solid cover)
    gsap.fromTo(pixels, 
      { scale: 0, opacity: 0 },
      { 
        scale: 1.05, 
        opacity: 1, 
        duration: animationStepDuration, 
        stagger: {
          grid: [gridSize, gridSize],
          from: 'random',
          amount: 0.25
        },
        ease: 'power2.inOut',
        onComplete: () => {
          // Midpoint swap
          setShowExpanded(true)
          
          // Step 2: scale pixels out (reveal back side)
          gsap.to(pixels, {
            scale: 0,
            opacity: 0,
            duration: animationStepDuration,
            stagger: {
              grid: [gridSize, gridSize],
              from: 'random',
              amount: 0.25
            },
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(pixelGridRef.current, { display: 'none' })
            }
          })
        }
      }
    )
  }

  const handleMouseLeave = () => {
    if (disabled || !isHovered) return
    setIsHovered(false)

    const pixels = pixelsRef.current
    gsap.killTweensOf(pixels)

    // Show grid overlay
    gsap.set(pixelGridRef.current, { display: 'grid' })

    // Step 1: scale pixels in (solid cover)
    gsap.fromTo(pixels, 
      { scale: 0, opacity: 0 },
      { 
        scale: 1.05, 
        opacity: 1, 
        duration: animationStepDuration, 
        stagger: {
          grid: [gridSize, gridSize],
          from: 'random',
          amount: 0.25
        },
        ease: 'power2.inOut',
        onComplete: () => {
          // Midpoint swap back to front side
          setShowExpanded(false)

          // Step 2: scale pixels out (reveal front side)
          gsap.to(pixels, {
            scale: 0,
            opacity: 0,
            duration: animationStepDuration,
            stagger: {
              grid: [gridSize, gridSize],
              from: 'random',
              amount: 0.25
            },
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(pixelGridRef.current, { display: 'none' })
            }
          })
        }
      }
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`${styles.pixelContainer} clickable`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Front side content (Default state) */}
      <div className={`${styles.contentFrame} ${showExpanded ? styles.hidden : styles.visible}`}>
        {children}
      </div>

      {/* Back side content (Hover state) */}
      <div className={`${styles.contentFrame} ${showExpanded ? styles.visible : styles.hidden}`}>
        {expandedContent}
      </div>

      {/* Pixel Grid Overlay */}
      <div 
        ref={pixelGridRef}
        className={styles.pixelGrid}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {Array.from({ length: totalPixels }).map((_, i) => (
          <div 
            key={i} 
            ref={el => pixelsRef.current[i] = el}
            className={styles.pixelUnit}
            style={{ backgroundColor: pixelColor }}
          />
        ))}
      </div>
    </div>
  )
}
