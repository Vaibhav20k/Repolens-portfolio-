import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './StackCards.module.css'

export default function StackCards({ projects, activeIndex, onSelectCard }) {
  
  // Arrange projects list so the active card is visually on top of the stack
  // We can calculate card offset transform dynamically based on its index relative to activeIndex
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
      pointerEvents: isTop ? 'auto' : 'none'
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
            className={`${styles.projectCard} ${isTop ? styles.topCard : ''} card-hover-trigger`}
            animate={cardStyle}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            onClick={() => onSelectCard(idx)}
            whileHover={isTop ? { scale: 1.03, rotate: -1 } : {}}
          >
            {/* Holographic grid overlay mock */}
            <div className={styles.gridOverlay}></div>

            <div className={styles.cardHeader}>
              <span className={styles.cardNo}>0{idx + 1}</span>
              <span className={styles.cardType}>[ {project.type} ]</span>
            </div>

            <h3 className={styles.cardTitle}>{project.name}</h3>

            <div className={styles.cardFooter}>
              <span className={styles.techText}>
                {project.tech.slice(0, 3).join(' / ')}
              </span>
              <span className={styles.dragHint}>CLICK TO SELECT</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
