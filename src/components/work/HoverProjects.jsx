import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './HoverProjects.module.css'

/**
 * HoverProjects
 * Scaled Hero Projects Section with expanded spring thumbnails (100px -> 180x235px),
 * pop-out circle arrow badge, and dominant giant kinetic title (clamp(5rem, 16vw, 13rem)).
 */
export function HoverProjects({ 
  projects = [], 
  defaultName = "PROJECTS",
  onSelectProject 
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : null
  const currentTitle = activeProject ? activeProject.name : defaultName

  return (
    <div className={styles.sectionContainer}>
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
      <div className={styles.giantTitleContainer}>
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentTitle}
            className={styles.giantTitle}
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
