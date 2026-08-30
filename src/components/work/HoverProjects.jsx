import React, { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './HoverProjects.module.css'

/**
 * Measure text width accurately using an offscreen canvas.
 * Falls back to character count heuristic if canvas is not available.
 */
function getMeasuredTextWidth(text, fontFamily = 'Impact, Haettenschweiler, "Franklin Gothic Bold", sans-serif') {
  if (!text) return 100
  if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.font = `900 100px ${fontFamily}`
        const metrics = ctx.measureText(text.toUpperCase())
        if (metrics && metrics.width > 0) {
          return metrics.width
        }
      }
    } catch {
      // Fallback below
    }
  }
  return text.length * 56
}

/**
 * HoverProjects
 * Scaled Hero Projects Section with expanded spring thumbnails (100px -> 180x235px),
 * pop-out circle arrow badge, and dynamic responsive giant kinetic title.
 */
export function HoverProjects({ 
  projects = [], 
  defaultName = "PROJECTS",
  onSelectProject 
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const containerRef = useRef(null)
  const titleContainerRef = useRef(null)

  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : null
  const currentTitle = activeProject ? activeProject.name : defaultName

  // Responsive font size state
  const [fontSize, setFontSize] = useState(null)

  // Recalculate font size whenever title or container size changes
  useLayoutEffect(() => {
    const calculateSize = () => {
      if (!titleContainerRef.current) return

      const containerWidth = titleContainerRef.current.clientWidth || window.innerWidth
      // Safe available width leaves comfortable padding on left/right
      const safeWidth = Math.max(containerWidth - 24, 100)

      // Measure string width at reference 100px font-size
      const textWidthAt100 = getMeasuredTextWidth(currentTitle)

      // Viewport-aware maximum font size cap
      const vw = window.innerWidth
      let maxCap = 208 // 13rem
      if (vw < 480) {
        maxCap = Math.min(96, vw * 0.22)
      } else if (vw < 768) {
        maxCap = Math.min(130, vw * 0.2)
      } else if (vw < 1024) {
        maxCap = Math.min(160, vw * 0.18)
      } else {
        maxCap = Math.min(208, vw * 0.16)
      }

      // Calculate the exact font size that fits safeWidth
      const idealSize = (safeWidth / textWidthAt100) * 100
      const finalSize = Math.max(14, Math.min(maxCap, idealSize))

      setFontSize(finalSize)
    }

    calculateSize()

    // ResizeObserver for robust layout changes
    let observer
    if (typeof ResizeObserver !== 'undefined' && titleContainerRef.current) {
      observer = new ResizeObserver(() => {
        calculateSize()
      })
      observer.observe(titleContainerRef.current)
    }

    window.addEventListener('resize', calculateSize)

    return () => {
      if (observer) observer.disconnect()
      window.removeEventListener('resize', calculateSize)
    }
  }, [currentTitle])

  return (
    <div ref={containerRef} className={styles.sectionContainer}>
      {/* Horizontal Centered Thumbnails Row */}
      <div className={styles.thumbnailsRow} onMouseLeave={() => setHoveredIndex(null)}>
        {projects.map((project, idx) => {
          const isHovered = hoveredIndex === idx

          return (
            <motion.div
              key={project.id || project.name || idx}
              className={styles.thumbnailWrapper}
              animate={{
                width: isHovered ? 180 : 100,
                height: isHovered ? 235 : 100,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 26,
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onClick={() => onSelectProject && onSelectProject(project, idx)}
              role="button"
              tabIndex={0}
              aria-label={`Project: ${project.name}`}
            >
              {/* Clipped Inner Image Box (overflow: hidden, rounded corners) */}
              <div 
                className={`${styles.imageClippedBox} ${isHovered ? styles.imageActive : styles.imageDimmed}`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className={styles.thumbnailImg}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.fallbackPlaceholder}>
                    <span className={styles.placeholderChar}>
                      {project.name ? project.name.charAt(0).toUpperCase() : 'P'}
                    </span>
                  </div>
                )}
              </div>

              {/* Sibling Circle Arrow Badge (Popping out past right edge, NOT clipped) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className={styles.circleArrowBadge}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <svg
                      className={styles.arrowIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Giant Dominant Kinetic Title */}
      <div 
        ref={titleContainerRef} 
        className={styles.giantTitleContainer}
        style={fontSize ? { '--title-font-size': `${fontSize}px` } : undefined}
      >
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentTitle}
            className={styles.giantTitle}
            style={fontSize ? { fontSize: `${fontSize}px` } : undefined}
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            {currentTitle}
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default HoverProjects
