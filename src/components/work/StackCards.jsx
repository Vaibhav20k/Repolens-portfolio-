import React from 'react'
import { motion } from 'framer-motion'
import styles from './StackCards.module.css'
import PixelTransition from '../ui/PixelTransition/PixelTransition'

const getCoverPath = (id) => {
  if (id === 'repolens-ai') return '/project-assets/repolens/cover.svg'
  if (id === 'orbitair') return '/project-assets/orbitair/cover.svg'
  if (id === 'orbit-ops') return '/project-assets/orbit-ops/cover.svg'
  return '/project-assets/placeholders/cover.svg'
}

function ProjectFront({ project, idx, isTop }) {
  const coverPath = getCoverPath(project.id)
  return (
    <div className={styles.cardFrontInner}>
      {/* Holographic grid overlay mock */}
      <div className={styles.gridOverlay}></div>

      <div className={styles.cardHeader}>
        <span className={styles.cardNo}>0{idx + 1}</span>
        <span className={styles.cardType}>[ {project.type} ]</span>
      </div>

      <div className={styles.coverWrapper}>
        <img 
          src={coverPath} 
          alt={`${project.name} Cover`} 
          className={styles.coverImage} 
          draggable="false"
        />
      </div>

      <h3 className={styles.cardTitle} data-text={project.name}>{project.name}</h3>

      <div className={styles.cardFooter}>
        <span className={styles.techText}>
          {project.tech.slice(0, 3).join(' / ')}
        </span>
        <span className={styles.dragHint}>
          {isTop ? 'HOVER TO REVEAL' : 'CLICK TO SELECT'}
        </span>
      </div>
    </div>
  )
}

function ProjectBack({ project }) {
  return (
    <div className={styles.cardBackInner}>
      <div className={styles.gridOverlay}></div>
      
      <div className={styles.backHeader}>
        <span className={styles.backTitle}>[ SPECS ]</span>
        <span className={styles.backOwnership}>{project.id === 'repolens-ai' ? 'SOLE AUTHOR' : 'CORE DEV'}</span>
      </div>

      <div className={styles.backDescription}>
        {project.description}
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <div className={styles.backHighlights}>
          <div className={styles.highlightsHeader}>HIGHLIGHTS:</div>
          <ul className={styles.highlightsList}>
            {project.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className={styles.highlightItem}>
                <span className={styles.bullet}>//</span> {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.ownership && (
        <div className={styles.ownershipText}>
          <strong>ROLE:</strong> {project.ownership}
        </div>
      )}

      <div className={styles.backFooter}>
        <div className={styles.techPills}>
          {project.tech.slice(0, 4).map((t, idx) => (
            <span key={idx} className={styles.techPill}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function StackCards({ projects, activeIndex, onSelectCard }) {
  
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 80
    if (info.offset.x > swipeThreshold) {
      // Swipe Right -> previous project
      const prevIndex = (activeIndex - 1 + projects.length) % projects.length
      onSelectCard(prevIndex)
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left -> next project
      const nextIndex = (activeIndex + 1) % projects.length
      onSelectCard(nextIndex)
    }
  }

  // Arrange projects list so the active card is visually on top of the stack
  const getCardStyles = (index) => {
    const total = projects.length
    // Calculate distance from activeIndex wrapping around list size
    let offset = index - activeIndex
    
    // Stack cards in circular order
    if (offset < 0) offset += total
    
    const isTop = offset === 0
    
    return {
      zIndex: total - offset,
      x: isTop ? 0 : offset * 25,
      y: isTop ? 0 : offset * -15,
      scale: isTop ? 1 : 1 - offset * 0.05,
      rotate: isTop ? 0 : offset * 2,
      opacity: isTop ? 1 : 0.8 - offset * 0.2,
      pointerEvents: 'auto'
    }
  }

  return (
    <div className={styles.deckWrapper}>
      {projects.map((project, idx) => {
        const cardStyle = getCardStyles(idx)
        const isTop = idx === activeIndex

        return (
          <motion.div
            key={project.id}
            className={`${styles.projectCard} ${isTop ? styles.topCard : ''} clickable`}
            animate={cardStyle}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            onClick={() => !isTop && onSelectCard(idx)}
            drag={isTop ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={isTop ? handleDragEnd : undefined}
            whileHover={isTop ? { scale: 1.03, rotate: -1 } : {}}
            style={{ touchAction: 'none' }}
          >
            <PixelTransition
              gridSize={12}
              pixelColor="var(--color-accent)"
              animationStepDuration={0.35}
              disabled={!isTop}
              expandedContent={<ProjectBack project={project} />}
            >
              <ProjectFront project={project} idx={idx} isTop={isTop} />
            </PixelTransition>
          </motion.div>
        )
      })}
    </div>
  )
}

