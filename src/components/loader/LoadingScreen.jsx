import React, { useEffect, useState } from 'react'
import Mascot from '../mascot/Mascot'
import styles from './LoadingScreen.module.css'

const BOOT_MESSAGES = [
  "Initializing RepoLens AI...",
  "Loading Portfolio...",
  "Fetching Repository Data...",
  "Building Knowledge Base...",
  "Loading Projects...",
  "Launching Portfolio Copilot...",
  "Ready."
]

export default function LoadingScreen({ onComplete, isLoaded, onStart }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [consoleLogs, setConsoleLogs] = useState([])

  // Progress counter simulation
  useEffect(() => {
    if (progress >= 100) {
      onComplete()
      return
    }

    const duration = 2500 // 2.5 seconds total boot sequence
    const intervalTime = 40
    const steps = duration / intervalTime
    const stepIncrement = 100 / steps

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + stepIncrement + Math.random() * 2, 100)
        return Math.floor(next)
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [progress, onComplete])

  // Log messages sync based on progress thresholds
  useEffect(() => {
    const thresholds = [0, 15, 30, 45, 60, 75, 90]
    
    if (messageIndex < BOOT_MESSAGES.length && progress >= thresholds[messageIndex]) {
      const newMsg = BOOT_MESSAGES[messageIndex]
      setConsoleLogs(prev => [...prev, `> ${newMsg}`])
      setMessageIndex(prev => prev + 1)
    }
  }, [progress, messageIndex])

  return (
    <div className={`${styles.loaderScreen} ${isLoaded ? styles.fadeTransition : ''}`}>
      <div className={styles.centerContainer}>
        {/* Unified Interactive Mascot */}
        <div className={styles.mascotIndicator}>
          <Mascot isLoaderState={true} />
        </div>

        {/* Circular Progress SVG */}
        <div className={styles.circularProgressContainer}>
          <svg className={styles.svgCircle} width="120" height="120">
            <circle className={styles.track} cx="60" cy="60" r="50" />
            <circle 
              className={styles.fill} 
              cx="60" 
              cy="60" 
              r="50" 
              style={{ strokeDashoffset: 314 - (314 * progress) / 100 }}
            />
          </svg>
          <div className={styles.percentageText}>{progress}%</div>
        </div>

        {/* Boot Logs */}
        <div className={styles.terminalLogs}>
          {consoleLogs.map((log, idx) => (
            <div key={idx} className={styles.logLine}>{log}</div>
          ))}
        </div>

        {/* Start Button */}
        {progress >= 100 && (
          <button className={styles.startButton} onClick={onStart}>
            S T A R T
          </button>
        )}
      </div>
    </div>
  )
}
