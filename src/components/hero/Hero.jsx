import React from 'react'
import { motion } from 'framer-motion'
import ScrollHighlightText from './ScrollHighlightText'
import HeroRobot from './HeroRobot'
import styles from './Hero.module.css'

export default function Hero({ openTerminal }) {
  // Container that staggers its children on mount
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  }

  // Children animate from below and fade in
  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  // Cinematic title reveal
  const titleWordVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  return (
    <section className={styles.heroSection}>
      <motion.div
        className={styles.titleContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.label} variants={itemVariants}>
          PORTFOLIO
        </motion.div>

        {/* Cinematic Name Reveal Layout */}
        <h1 className={styles.mainTitle}>
          <div className={styles.maskContainer}>
            <motion.span
              className={styles.wordBlock}
              variants={titleWordVariants}
            >
              VAIBHAV
            </motion.span>
          </div>
          <div className={styles.maskContainer}>
            <motion.span
              className={`${styles.wordBlock} ${styles.accentWord}`}
              variants={titleWordVariants}
            >
              DEV
            </motion.span>
          </div>
        </h1>

        <motion.p className={styles.tagline} variants={itemVariants}>
          <ScrollHighlightText
            text="Building intelligent systems at the intersection of AI & Full Stack."
            enableProximity={false}
          />
        </motion.p>

        {/* Green Blinking Monospace terminal trigger */}
        <motion.div
          className={styles.terminalTrigger}
          onClick={openTerminal}
          variants={itemVariants}
        >
          <span className={styles.promptSign}>&gt;_</span>
          <span className={styles.promptText}>ask me anything</span>
          <span className={styles.blinker}></span>
        </motion.div>
      </motion.div>

      {/* Interactive 3D Spline Robot */}
      <HeroRobot />
    </section>
  )
}
