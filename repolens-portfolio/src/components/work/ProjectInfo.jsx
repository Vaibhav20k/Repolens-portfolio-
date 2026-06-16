import React from 'react'
import styles from './Work.module.css'

export default function ProjectInfo({ project, onAskClick }) {
  if (!project) return null

  return (
    <div className={styles.infoWrapper}>
      {/* Type badge */}
      <span className={styles.projectType}>{project.type}</span>
      
      {/* Variable Proximity Mock Heading */}
      <h2 className={styles.projectTitle}>
        {project.name}
      </h2>

      {/* Ownership strip */}
      <div className={styles.ownershipText}>
        <span>Role:</span> {project.ownership}
      </div>

      {/* Text Type Mock Description */}
      <p className={styles.projectDescription}>
        {project.description}
      </p>

      {/* Key Highlights list */}
      <ul className={styles.highlightsList}>
        {project.highlights.map((highlight, idx) => (
          <li key={idx} className={styles.highlightLine}>
            <span className={styles.bullet}>-</span> {highlight}
          </li>
        ))}
      </ul>

      {/* Badges */}
      <div className={styles.badgeContainer}>
        {project.tech.map((t, idx) => (
          <span key={idx} className={styles.techBadge}>{t}</span>
        ))}
      </div>

      {/* CTA Trigger */}
      <button 
        className={styles.askButton}
        onClick={onAskClick}
      >
        Ask RepoLens AI about my work
      </button>
    </div>
  )
}
