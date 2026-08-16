import React from 'react'
import { useLenis } from './hooks/useLenis'
import { useMousePosition } from './hooks/useMousePosition'
import { useTerminalState } from './hooks/useTerminalState'
import { useGitHubData } from './hooks/useGitHubData'

// Component imports
import CustomCursor from './components/cursor/CustomCursor'
import Navigation from './components/nav/Navigation'
import Mascot from './components/mascot/Mascot'
import Hero from './components/hero/Hero'
import AchievementStrip from './components/achievements/AchievementStrip'
import About from './components/about/About'
import Work from './components/work/Work'
import Contact from './components/contact/Contact'
import TerminalWindow from './components/terminal/TerminalWindow'
import TerminalMinimized from './components/terminal/TerminalMinimized'
import SceneContainer from './components/three/SceneContainer'
import SocialIcons from './components/social/SocialIcons'

function App() {
  // 1. Initialize core design hooks
  useLenis()
  const mousePos = useMousePosition()
  const terminal = useTerminalState()
  const { repos, loading: reposLoading } = useGitHubData()

  return (
    <>
      {/* Premium Cursor Orb */}
      <CustomCursor mousePos={mousePos} />

      {/* Main Experience Layout */}
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', position: 'relative' }}>
        {/* Draggable/Animated Mascot - Persistent in top-left */}
        <Mascot />

        {/* Navigation stack */}
        <Navigation />

        {/* Persistent left-side social icons sidebar */}
        <SocialIcons />

        {/* 3D Scene Wrapper - coffee cup + mouse device lazy Canvas */}
        <SceneContainer />

        <main className="container">
          {/* Hero Entry Section with Spline 3D Robot */}
          <Hero openTerminal={terminal.openTerminal} />

          {/* Achievement Strip */}
          <AchievementStrip />

          {/* About Section */}
          <About />

          {/* Work Section with Draggable Cards */}
          <Work repos={repos} reposLoading={reposLoading} openTerminal={terminal.openTerminal} />

          {/* Contact details */}
          <Contact />
        </main>

        {/* Terminal Console Manager */}
        {terminal.isOpen && !terminal.isMinimized && (
          <TerminalWindow terminal={terminal} repos={repos} />
        )}

        {/* Minimized Terminal state indicator */}
        {terminal.isMinimized && (
          <TerminalMinimized restore={terminal.restoreTerminal} />
        )}
      </div>
    </>
  )
}

export default App
