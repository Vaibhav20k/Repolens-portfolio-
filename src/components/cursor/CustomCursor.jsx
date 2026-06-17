import React, { useEffect, useState } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor({ mousePos }) {
  const [hoverType, setHoverType] = useState(null)
  const [renderedPos, setRenderedPos] = useState(null)
  const [isClicked, setIsClicked] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  // Detect touch capability to disable custom cursor on mobile/tablet devices
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      )
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Linear interpolation (lerp) for smooth lag follow
  useEffect(() => {
    if (!mousePos || isTouch) return

    let animationFrameId;
    const updateCursor = () => {
      setRenderedPos(prev => {
        if (!prev) return mousePos // Immediately snap to initial mouse position when first detected
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
  }, [mousePos, isTouch])

  useEffect(() => {
    if (isTouch) return

    // Detect if cursor is hovering over clickable elements or text
    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return

      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable') ||
        target.classList.contains('card-hover-trigger') ||
        target.closest('.clickable')

      if (isClickable) {
        setHoverType('clickable')
        return
      }

      // Check if target is a text node container or explicitly marked for blending
      const textTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'CODE']
      const isText = textTags.includes(target.tagName) || target.closest('.text-blend')

      if (isText) {
        setHoverType('text')
      } else {
        setHoverType(null)
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isTouch])

  if (isTouch || !mousePos || !renderedPos) return null

  return (
    <div 
      className={styles.cursorContainer}
      style={{
        transform: `translate3d(${renderedPos.x}px, ${renderedPos.y}px, 0)`
      }}
    >
      <div 
        className={`${styles.cursor} ${hoverType ? styles[hoverType] : ''} ${isClicked ? styles.clicked : ''}`}
      />
    </div>
  )
}
