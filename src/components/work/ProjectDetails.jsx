import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ProjectDetails.module.css'

/**
 * ProjectDetails Component
 * Dynamic 2-column showcase displayed below the HoverProjects hero.
 * Left: Project Info & "Know More About It" (terminal trigger).
 * Right: Active Project Image.
 */
export default function ProjectDetails({ project, onKnowMoreClick }) {
  if (!project) return null

  const fallbackDescription = "In-depth architecture, engineering breakdown, and system telemetry available in the interactive console."

  return (
    <div id="project-details" className={styles.detailsContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id || project.name}
          className={styles.detailsGrid}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left Column: Project Information & Terminal Action */}
          <div className={styles.infoCol}>
            {project.type && (
              <span className={styles.projectTypeBadge}>
                {project.type}
              </span>
            )}

            <h3 className={styles.projectName}>
              {project.name}
            </h3>

            <p className={styles.projectDesc}>
              {project.description && project.description.trim() !== ''
                ? project.description
                : fallbackDescription}
            </p>

            {/* "Know More About It" CTA (The only terminal trigger) */}
            <button
              type="button"
              className={`${styles.knowMoreBtn} clickable`}
              onClick={() => onKnowMoreClick && onKnowMoreClick(project)}
              aria-label={`Know More About ${project.name}`}
            >
              <span>Know More About It</span>
              <svg
                className={styles.btnArrow}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Right Column: Project Image Showcase */}
          <div className={styles.imageCol}>
            <div className={styles.imageCardWrapper}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className={styles.projectImage}
                  loading="lazy"
                />
              ) : (
                <div className={styles.imageFallback}>
                  <span className={styles.fallbackLetter}>
                    {project.name ? project.name.charAt(0) : 'P'}
                  </span>
                </div>
              )}
              <div className={styles.imageGlowOverlay} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
