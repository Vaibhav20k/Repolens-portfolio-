import React from 'react'
import styles from './Hero.module.css'

export default function Hero({ openTerminal }) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.titleContainer}>
        <div className={styles.label}>PORTFOLIO EXPERIMENT v1.0</div>
        
        {/* Cinematic Name Reveal Layout */}
        <h1 className={styles.mainTitle}>
          <span className={styles.wordBlock}>VAIBHAV</span>
          <span className={`${styles.wordBlock} ${styles.accentWord}`}>DEV</span>
        </h1>

        <p className={styles.tagline}>
          Building intelligent systems at the intersection of AI & Full Stack.
        </p>

        {/* Floating Social Sidebar Indicator Mock */}
        <div className={styles.socialStrip}>
          <a href="https://github.com/Vaibhav20k" target="_blank" rel="noopener noreferrer">GH</a>
          <a href="#" className={styles.disabledLink}>IN</a>
          <a href="#" className={styles.disabledLink}>LI</a>
        </div>

        {/* Green Blinking Monospace terminal trigger */}
        <div 
          className={styles.terminalTrigger}
          onClick={openTerminal}
        >
          <span className={styles.promptSign}>&gt;_</span>
          <span className={styles.promptText}>ask me anything</span>
          <span className={styles.blinker}></span>
        </div>
      </div>
    </section>
  )
}
