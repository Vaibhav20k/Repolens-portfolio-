import React, { useEffect, useState } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor({ mousePos }) {
  const [isHovered, setIsHovered] = useState(false)
  const [renderedPos, setRenderedPos] = useState({ x: 0, y: 0 })

  // Linear interpolation (lerp) for smooth lag follow
  useEffect(() => {
    let animationFrameId;
    
    const updateCursor = () => {
      setRenderedPos(prev => {
        // Lerp factor of 0.15 gives approximately 80ms smooth delay at 60fps
        const dx = mousePos.x - prev.x
        const dy = mousePos.y - prev.y
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        }
      })
      animationFrameId = requestAnimationFrame(updateCursor)
    }

    updateCursor()
    return () => cancelAnimationFrame(animationFrameId)
  }, [mousePos])

  useEffect(() => {
    // Check if cursor is hovering over clickable elements or text
    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.classList.contains('card-hover-trigger')

      setIsHovered(!!isClickable)
    }

    window.addEventListener('mouseover', handleMouseOver)
    return () => window.removeEventListener('mouseover', handleMouseOver)
  }, [])

  return (
    <div 
      className={`${styles.cursor} ${isHovered ? styles.hovered : ''}`}
      style={{
        transform: `translate3d(${renderedPos.x}px, ${renderedPos.y}px, 0) translate(-50%, -50%)`
      }}
    />
  )
}
