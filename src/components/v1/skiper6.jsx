import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './skiper6.module.css'

/**
 * Skiper UI - 06 Hover Members (skiper6)
 * Interactive showcase component inspired by opos.buzzworthystudio.com/directors
 * Features kinetic staggered text morphing, cursor tracking, and card hover reveals.
 */
export function HoverMember({
  teamMembers = [],
  defaultName = "PROJECTS",
  className = "",
  backgroundColor = "transparent",
  textColor = "var(--color-text-secondary, #888888)",
  hoverTextColor = "var(--color-accent, #e8472a)",
  cursorColor = "var(--color-accent, #e8472a)",
  onSelectMember,
}) {
  const [hoveredMember, setHoveredMember] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isInside, setIsInside] = useState(false)
  const containerRef = useRef(null)

  const activeName = hoveredMember ? hoveredMember.name : defaultName

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => setIsInside(true)
  const handleMouseLeave = () => {
    setIsInside(false)
    setHoveredMember(null)
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.hoverMemberContainer} ${className}`}
      style={{ backgroundColor }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Kinetic Title (Staggered Morphing Headline) */}
      <div className={styles.titleWrapper} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeName}
            className={styles.kineticTitle}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.025,
                  delayChildren: 0.02,
                },
              },
              exit: {
                opacity: 0,
                y: -20,
                transition: {
                  staggerChildren: 0.015,
                  staggerDirection: -1,
                  duration: 0.2,
                },
              },
            }}
            style={{
              color: hoveredMember ? hoverTextColor : textColor,
            }}
          >
            {activeName.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                className={styles.kineticChar}
                variants={{
                  initial: { opacity: 0, y: 30, rotateX: -60 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: {
                      type: "spring",
                      damping: 14,
                      stiffness: 120,
                    },
                  },
                  exit: {
                    opacity: 0,
                    y: -25,
                    rotateX: 45,
                    transition: { duration: 0.18 },
                  },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Member / Project Cards Row */}
      <div className={styles.membersRow}>
        {teamMembers.map((member, idx) => {
          const isCurrent = hoveredMember?.name === member.name

          return (
            <motion.div
              key={member.id || member.name || idx}
              className={`${styles.memberCard} ${isCurrent ? styles.activeCard : ""}`}
              onMouseEnter={() => setHoveredMember(member)}
              onMouseLeave={() => setHoveredMember(null)}
              onClick={() => onSelectMember && onSelectMember(member, idx)}
              whileHover={{ y: -8, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              tabIndex={0}
              role="button"
              aria-label={`View ${member.name}`}
            >
              <div className={styles.imageWrapper}>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.memberImage}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span className={styles.placeholderInitial}>
                      {member.name ? member.name.charAt(0).toUpperCase() : "P"}
                    </span>
                  </div>
                )}
                <div className={styles.imageOverlay} />
              </div>

              {/* Card Meta Info */}
              <div className={styles.cardFooter}>
                <span className={styles.memberIndex}>0{idx + 1}</span>
                <span className={styles.cardTitle}>{member.name}</span>
                {member.role && (
                  <span className={styles.memberRole}>{member.role}</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Floating Cursor Follower Glow */}
      {isInside && (
        <motion.div
          className={styles.cursorGlow}
          animate={{
            x: mousePos.x,
            y: mousePos.y,
            opacity: 1,
            scale: hoveredMember ? 1.4 : 1,
          }}
          transition={{
            type: "spring",
            damping: 28,
            stiffness: 280,
            mass: 0.3,
          }}
          style={{
            borderColor: cursorColor,
            boxShadow: `0 0 24px ${cursorColor}40`,
          }}
        />
      )}
    </div>
  )
}

export default HoverMember
