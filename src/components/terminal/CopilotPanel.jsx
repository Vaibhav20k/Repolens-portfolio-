import React from 'react'
import styles from './Terminal.module.css'

export default function CopilotPanel({ isTyping, lastIntent, onSuggestionClick }) {
  const suggestions = [
    { label: "About Vaibhav", cmd: "about" },
    { label: "Check technical skills", cmd: "skills" },
    { label: "List live GitHub repos", cmd: "repos" },
    { label: "Strongest project?", cmd: "ask What is Vaibhav's strongest project?" },
    { label: "How does OrbitAir work?", cmd: "ask How does OrbitAir work?" },
    { label: "Explain ORBIT-OPS", cmd: "ask Explain the architecture of ORBIT-OPS." },
    { label: "What is RAG?", cmd: "ask Explain Retrieval-Augmented Generation." }
  ]

  return (
    <div className={styles.copilotPanel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>COPILOT BRAIN</div>
        <div className={styles.statusIndicator}>
          <span className={`${styles.statusDot} ${isTyping ? styles.statusThinking : styles.statusReady}`} />
          <span className={styles.statusText}>{isTyping ? "ANALYZING..." : "READY"}</span>
        </div>
      </div>

      <div className={styles.panelSection}>
        <div className={styles.sectionLabel}>CLASSIFIED INTENT</div>
        <div className={`${styles.intentBadge} ${lastIntent ? styles['intent' + lastIntent] : styles.intentNone}`}>
          {lastIntent || 'AWAITING QUERY'}
        </div>
      </div>

      <div className={styles.panelSection}>
        <div className={styles.sectionLabel}>SUGGESTED COMMANDS</div>
        <div className={styles.suggestionsList}>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              className={`${styles.suggestionBtn} clickable`}
              onClick={() => onSuggestionClick(s.cmd)}
              disabled={isTyping}
            >
              <span className={styles.suggestionCmd}>
                {s.cmd.startsWith('ask ') ? 'ask' : s.cmd}
              </span>
              <span className={styles.suggestionLabel}>
                {s.cmd.startsWith('ask ') ? s.cmd.substring(4) : s.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
