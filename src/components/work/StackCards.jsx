import React from 'react'
import { motion } from 'framer-motion'
import styles from './StackCards.module.css'

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
            {/* Holographic grid overlay mock */}
            <div className={styles.gridOverlay}></div>

            <div className={styles.cardHeader}>
              <span className={styles.cardNo}>0{idx + 1}</span>
              <span className={styles.cardType}>[ {project.type} ]</span>
            </div>

            <h3 className={styles.cardTitle} data-text={project.name}>{project.name}</h3>

            <div className={styles.cardFooter}>
              <span className={styles.techText}>
                {project.tech.slice(0, 3).join(' / ')}
              </span>
              <span className={styles.dragHint}>
                {isTop ? 'SWIPE OR CLICK' : 'CLICK TO SELECT'}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
