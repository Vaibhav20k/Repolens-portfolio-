import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ProjectDetailsModal.module.css'

/**
 * ProjectDetailsModal
 * A physical emerging overlay card displaying verified technical architecture,
 * categorized tech stack chips, problem solved breakdown, and the "Know More About It" trigger.
 */
export default function ProjectDetailsModal({ project, isOpen, onClose, onKnowMoreClick }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!project) return null

  const techChips = project.tech || []
  const techStack = project.techStack || {}

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlayRoot}>
          {/* Frosted Atmospheric Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
          />

          {/* Physical Emerging Card Layer */}
          <motion.div
            className={styles.cardContainer}
            initial={{ opacity: 0, scale: 0.88, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 24,
              mass: 0.9,
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`Project Details: ${project.name}`}
          >
            {/* Close Button */}
            <button
              type="button"
              className={`${styles.closeBtn} clickable`}
              onClick={onClose}
              aria-label="Close project details"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Inner Content Grid */}
            <div className={styles.cardContentGrid}>
              {/* Left Column: Technical Overview & Stack */}
              <div className={styles.infoColumn}>
                {project.type && (
                  <span className={styles.typeBadge}>
                    {project.type}
                  </span>
                )}

                <h2 className={styles.projectTitle}>
                  {project.name}
                </h2>

                <p className={styles.projectOverview}>
                  {project.overview || project.description}
                </p>

                {/* Problem Solved & Architecture Highlights */}
                {project.problemSolves && (
                  <div className={styles.technicalDetailBox}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>PROBLEM SOLVED</span>
                      <p className={styles.detailText}>{project.problemSolves}</p>
                    </div>
                    {project.architecture && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>KEY ARCHITECTURE</span>
                        <p className={styles.detailText}>{project.architecture}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className={styles.techStackSection}>
                  <span className={styles.techStackHeader}>TECH STACK</span>
                  <div className={styles.techChipsRow}>
                    {techChips.map((techItem, idx) => (
                      <span key={idx} className={styles.techChip}>
                        {techItem}
                      </span>
                    ))}
                  </div>

                  {/* Grouped Stack Breakdown (Languages, Frameworks, ML/AI, Databases, Tools) */}
                  {techStack.languages && (
                    <div className={styles.groupedStackGrid}>
                      {techStack.languages?.length > 0 && (
                        <div className={styles.groupItem}>
                          <span className={styles.groupCategory}>Languages:</span>
                          <span className={styles.groupValues}>{techStack.languages.join(", ")}</span>
                        </div>
                      )}
                      {techStack.frameworks?.length > 0 && (
                        <div className={styles.groupItem}>
                          <span className={styles.groupCategory}>Frameworks:</span>
                          <span className={styles.groupValues}>{techStack.frameworks.join(", ")}</span>
                        </div>
                      )}
                      {techStack.mlAi?.length > 0 && (
                        <div className={styles.groupItem}>
                          <span className={styles.groupCategory}>ML & AI:</span>
                          <span className={styles.groupValues}>{techStack.mlAi.join(", ")}</span>
                        </div>
                      )}
                      {techStack.databases?.length > 0 && (
                        <div className={styles.groupItem}>
                          <span className={styles.groupCategory}>Databases:</span>
                          <span className={styles.groupValues}>{techStack.databases.join(", ")}</span>
                        </div>
                      )}
                      {techStack.tools?.length > 0 && (
                        <div className={styles.groupItem}>
                          <span className={styles.groupCategory}>Tools & Infra:</span>
                          <span className={styles.groupValues}>{techStack.tools.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* "Know More About It" CTA Button (The ONLY terminal trigger) */}
                <button
                  type="button"
                  className={`${styles.knowMoreButton} clickable`}
                  onClick={() => onKnowMoreClick && onKnowMoreClick(project)}
                  aria-label={`Know More About ${project.name}`}
                >
                  <span>Know More About It</span>
                  <svg
                    className={styles.buttonArrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Right Column: Visual Media Showcase */}
              <div className={styles.mediaColumn}>
                <div className={styles.mediaFrame}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className={styles.mediaImage}
                    />
                  ) : (
                    <div className={styles.mediaFallback}>
                      <span className={styles.fallbackLetter}>
                        {project.name ? project.name.charAt(0) : 'P'}
                      </span>
                    </div>
                  )}
                  <div className={styles.mediaGlowOverlay} />
                </div>

                {/* GitHub link if available */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.githubRepoLink} clickable`}
                    aria-label={`View ${project.name} on GitHub`}
                  >
                    <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>View Repository on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
