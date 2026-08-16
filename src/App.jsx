import React, { useState, useEffect } from 'react'
import LandingBackground from './components/landing/LandingBackground'
import { useLenis } from './hooks/useLenis'
import { useMousePosition } from './hooks/useMousePosition'
import { useTerminalState } from './hooks/useTerminalState'
import { useGitHubData } from './hooks/useGitHubData'

// Main Portfolio Components
import Navigation from './components/nav/Navigation'
import Mascot from './components/mascot/Mascot'
import Hero from './components/hero/Hero'
import AchievementStrip from './components/achievements/AchievementStrip'
import About from './components/about/About'
import Work from './components/work/Work'
import Contact from './components/contact/Contact'
import TerminalWindow from './components/terminal/TerminalWindow'
import TerminalMinimized from './components/terminal/TerminalMinimized'
import SocialIcons from './components/social/SocialIcons'
import SceneContainer from './components/three/SceneContainer'

function App() {
  useLenis()
  const mousePos = useMousePosition()
  const terminal = useTerminalState()
  const { repos, loading: reposLoading } = useGitHubData()

  // Routing / View State: Default is Landing Page with Indian Dome & Cloth
  const [inPortfolio, setInPortfolio] = useState(() => {
    return window.location.hash === '#portfolio'
  })

  useEffect(() => {
    const handleHashChange = () => {
      setInPortfolio(window.location.hash === '#portfolio')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavigateToPortfolio = () => {
    window.location.hash = 'portfolio'
    setInPortfolio(true)
  }

  const handleBackToLanding = () => {
    window.location.hash = ''
    setInPortfolio(false)
  }

  if (!inPortfolio) {
    return <LandingBackground onNavigate={handleNavigateToPortfolio} />
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', position: 'relative' }}>
      {/* Mascot with capability to return to Landing */}
      <Mascot resetExperience={handleBackToLanding} />

      {/* Navigation Stack */}
      <Navigation />

      {/* Persistent Left Sidebar */}
      <SocialIcons />

      {/* 3D Scene Wrapper */}
      <SceneContainer />

      <main className="container">
        {/* Hero Section */}
        <Hero openTerminal={terminal.openTerminal} mousePos={mousePos} />

        {/* Achievement Strip */}
        <AchievementStrip />

        {/* About Section */}
        <About />

        {/* Work Section with Draggable Cards */}
        <Work repos={repos} reposLoading={reposLoading} openTerminal={terminal.openTerminal} />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Terminal Console Manager */}
      {terminal.isOpen && !terminal.isMinimized && (
        <TerminalWindow terminal={terminal} repos={repos} />
      )}

      {/* Minimized Terminal Indicator */}
      {terminal.isMinimized && (
        <TerminalMinimized restore={terminal.restoreTerminal} />
      )}
    </div>
  )
}

export default App
