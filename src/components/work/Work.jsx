import React, { useState } from 'react'
import styles from './Work.module.css'
import HoverProjects from './HoverProjects'
import ProjectDetailsModal from './ProjectDetailsModal'
import { portfolioData } from '../../data/portfolioData'

export default function Work({ openTerminal }) {
  const projects = portfolioData.projects
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectProject = (project) => {
    // Open the emerging physical card overlay (NO terminal, NO scroll, NO navigation)
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleKnowMore = (project) => {
    // The ONLY place where the terminal is triggered
    setIsModalOpen(false)
    if (openTerminal) {
      openTerminal()
      setTimeout(() => {
        const event = new CustomEvent('terminal-query', { 
          detail: `ask How does ${project.name} work?` 
        })
        window.dispatchEvent(event)
      }, 200)
    }
  }

  return (
    <section id="work" className={styles.workSection}>
      {/* Centered HoverProjects Hero Showcase */}
      <HoverProjects 
        projects={projects}
        defaultName="PROJECTS"
        onSelectProject={handleSelectProject}
      />

      {/* Large Project Information Emerging Card Overlay */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onKnowMoreClick={handleKnowMore}
      />
    </section>
  )
}
