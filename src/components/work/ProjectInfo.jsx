import React from 'react'
import VariableProximity from './VariableProximity'
import TextType from './TextType'
import styles from './Work.module.css'

export default function ProjectInfo({ project, onAskClick }) {
  if (!project) return null

  return (
    <div className={styles.infoWrapper}>
      {/* Type badge */}
      <span className={styles.projectType}>{project.type}</span>
      
      {/* Variable Proximity Heading */}
      <h2 className={styles.projectTitle}>
        <VariableProximity text={project.name} />
      </h2>

      {/* Ownership strip */}
      <div className={styles.ownershipText}>
        <span>Role:</span> {project.ownership}
      </div>

      {/* Text Type Description */}
      <p className={styles.projectDescription}>
        <TextType text={project.description} />
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
