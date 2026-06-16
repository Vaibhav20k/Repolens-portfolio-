import React from 'react'
import styles from './Terminal.module.css'

export default function TerminalMinimized({ restore }) {
  return (
    <button 
      className={`${styles.minimizedTab} clickable`}
      onClick={restore}
      title="Restore Portfolio Copilot Terminal"
    >
      <span className={styles.pulseDot}></span>
      <span className={styles.tabText}>COPILOT ON</span>
    </button>
  )
}
