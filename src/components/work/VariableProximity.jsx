import React, { useEffect, useRef } from 'react'

export default function VariableProximity({ text, className }) {
  const containerRef = useRef(null)
  const charRefs = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let charCoords = []

    const updateCoords = () => {
      charCoords = charRefs.current.map((charEl) => {
        if (!charEl) return null
        const rect = charEl.getBoundingClientRect()
        return {
          el: charEl,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      }).filter(Boolean)
    }

    // Delayed measurement to ensure layout completes
    const timer = setTimeout(updateCoords, 200)

    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords, { passive: true })

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      
      charCoords.forEach((char) => {
        const dx = clientX - char.x
        const dy = clientY - char.y
        const distance = Math.hypot(dx, dy)
        
        const maxDist = 120 // pixels range
        let weight = 200 // default weight
        
        if (distance < maxDist) {
          const power = (maxDist - distance) / maxDist // 0 to 1
          weight = Math.round(200 + power * 800) // maps to 200-1000
          char.el.style.color = 'var(--color-accent)'
        } else {
          char.el.style.color = ''
        }
        
        char.el.style.fontWeight = weight
        char.el.style.fontVariationSettings = `"wght" ${weight}`
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [text])

  const chars = Array.from(text)

  return (
    <span 
      ref={containerRef} 
      className={className} 
      style={{ 
        fontFamily: 'var(--font-secondary), sans-serif', 
        display: 'inline-block',
        overflow: 'visible' 
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => (charRefs.current[i] = el)}
          style={{
            display: 'inline-block',
            fontWeight: 200,
            fontVariationSettings: '"wght" 200',
            transition: 'font-weight 0.15s ease, font-variation-settings 0.15s ease, color 0.15s ease',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
