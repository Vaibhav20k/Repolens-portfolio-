import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollHighlightText({ text, className, enableProximity = false }) {
  const containerRef = useRef(null)
  const wordRefs = useRef([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.word-highlight')
    
    const ctx = gsap.context(() => {
      gsap.to(words, {
        color: 'var(--color-text-primary)',
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 45%',
          scrub: true,
        }
      })
    }, el)

    return () => ctx.revert()
  }, [text])

  // Proximity logic
  useEffect(() => {
    if (!enableProximity) return

    const container = containerRef.current
    if (!container) return

    let wordCoords = []

    const updateCoords = () => {
      wordCoords = wordRefs.current.map((wordEl) => {
        if (!wordEl) return null
        const rect = wordEl.getBoundingClientRect()
        return {
          el: wordEl,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      }).filter(Boolean)
    }

    // Measure initially and on resize/scroll
    // Delayed slightly to ensure rendering completes
    const timer = setTimeout(updateCoords, 200)

    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords, { passive: true })

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      
      wordCoords.forEach((word) => {
        const dx = clientX - word.x
        const dy = clientY - word.y
        const distance = Math.hypot(dx, dy)
        
        const maxDist = 120 // pixels
        if (distance < maxDist) {
          const power = (maxDist - distance) / maxDist // 0 to 1
          
          word.el.style.transform = `scale(${1 + power * 0.15}) translateY(${power * -3}px)`
          word.el.style.color = `var(--color-accent)`
          word.el.style.textShadow = `0 0 ${power * 10}px rgba(232, 71, 42, 0.6)`
          word.el.style.fontWeight = '500'
        } else {
          word.el.style.transform = ''
          word.el.style.color = ''
          word.el.style.textShadow = ''
          word.el.style.fontWeight = ''
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [enableProximity, text])

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-block', overflow: 'visible' }}>
      {words.map((word, i) => (
        <span 
          key={i} 
          ref={(el) => (wordRefs.current[i] = el)}
          className="word-highlight" 
          style={{ 
            color: 'var(--color-text-secondary)', 
            opacity: 0.25, 
            display: 'inline-block', 
            marginRight: '0.25em',
            transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.25s ease, text-shadow 0.25s ease',
            transformOrigin: 'center center',
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
