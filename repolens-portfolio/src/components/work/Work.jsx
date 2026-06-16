import React, { useState } from 'react'
import styles from './Work.module.css'
import ProjectInfo from './ProjectInfo'
import StackCards from './StackCards'
import { portfolioData } from '../../data/portfolioData'

export default function Work({ repos, reposLoading, openTerminal }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const projects = portfolioData.projects

  const handleCardSelect = (index) => {
    setActiveIndex(index)
  }

  const handleAskClick = () => {
    // Open terminal and pre-fill input with prompt
    openTerminal()
    // Find matching project
    const activeProject = projects[activeIndex]
    // Small delay to let terminal mount, then dispatch event or update terminal state
    setTimeout(() => {
      const event = new CustomEvent('terminal-query', { 
        detail: `ask How does ${activeProject.name} work?` 
      })
      window.dispatchEvent(event)
    }, 200)
  }

  return (
    <section id="work" className={styles.workSection}>
      <div className={styles.sectionHeader}>
        <div className="uppercase-spaced">F E A T U R E D   W O R K</div>
      </div>

      <div className={styles.workGrid}>
        {/* Left Side: Dynamic Project Info details */}
        <div className={styles.infoColumn}>
          <ProjectInfo 
            project={projects[activeIndex]} 
            onAskClick={handleAskClick} 
          />
        </div>

        {/* Right Side: Draggable/Selectable Cards Stack */}
        <div className={styles.cardsColumn}>
          <StackCards 
            projects={projects} 
            activeIndex={activeIndex} 
            onSelectCard={handleCardSelect} 
          />
        </div>
      </div>
    </section>
  )
}
