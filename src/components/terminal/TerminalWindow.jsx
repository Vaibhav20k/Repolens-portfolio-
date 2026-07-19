import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import styles from './Terminal.module.css'
import { queryCopilot } from '../../services/copilotClient'
import { portfolioData } from '../../data/portfolioData'
import CopilotPanel from './CopilotPanel'
import { fetchRepoReadme } from '../../services/githubClient'

export default function TerminalWindow({ terminal, repos }) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [lastIntent, setLastIntent] = useState('')
  const [isPanelOpen, setIsPanelOpen] = useState(window.innerWidth > 768)
  const [commandHistory, setCommandHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('terminal_command_history')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })
  const [historyIndex, setHistoryIndex] = useState(-1)
  const historyEndRef = useRef(null)
  const inputRef = useRef(null)

  // Use motion values for smooth dragging without coordinate jumps
  const dragX = useMotionValue(terminal.position.x)
  const dragY = useMotionValue(terminal.position.y)

  // Sync motion values if position changes from parent (e.g. initial or minimized)
  useEffect(() => {
    dragX.set(terminal.position.x)
    dragY.set(terminal.position.y)
  }, [terminal.position.x, terminal.position.y, dragX, dragY])

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('terminal_command_history', JSON.stringify(commandHistory))
  }, [commandHistory])

  // Focus terminal input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Auto scroll to bottom of history
  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [terminal.history, isTyping])

  // Support custom event triggers (e.g. from Project Cards click)
  useEffect(() => {
    const handleQueryEvent = async (e) => {
      const queryStr = e.detail
      if (queryStr) {
        terminal.addHistory({ type: 'input', text: queryStr })
        
        // Add to history
        setCommandHistory(prev => {
          if (prev.length > 0 && prev[prev.length - 1] === queryStr) return prev
          return [...prev, queryStr]
        })
        setHistoryIndex(-1)

        await executeCommand(queryStr)
      }
    }
    window.addEventListener('terminal-query', handleQueryEvent)
    return () => window.removeEventListener('terminal-query', handleQueryEvent)
  }, [terminal, repos, commandHistory])

  // Handle command execution logic
  const executeCommand = async (commandStr) => {
    const trimmed = commandStr.trim()
    if (!trimmed) return

    const parts = trimmed.split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')

    // 1. Clear command
    if (cmd === 'clear') {
      terminal.clearHistory()
      setLastIntent('SYSTEM')
      return
    }

    // 2. Help command
    if (cmd === 'help') {
      terminal.addHistory({
        type: 'output',
        text: `Portfolio Copilot — Command Reference

  about          Who is Vaibhav
  projects       View all projects
  skills         Tech stack and skills
  experience     Work and experience history
  achievements   Competitions and certifications
  repos          Live GitHub repositories
  tech-stack     Detailed technology breakdown
  ai-projects    AI and ML specific work
  readme [repo]  Display README of a repository (e.g., readme OrbitAir)
  history        Show your terminal command history
  ask [query]    Ask me anything about Vaibhav or his work
  clear          Clear the terminal

  Example:
  ask How does OrbitAir work?
  ask What is your strongest project?
  readme OrbitAir`
      })
      setLastIntent('SYSTEM')
      return
    }

    // 3. About command
    if (cmd === 'about') {
      terminal.addHistory({
        type: 'output',
        text: `${portfolioData.name}\n${portfolioData.title}\n\n${portfolioData.about.paragraph}`
      })
      setLastIntent('PORTFOLIO')
      return
    }

    // 4. Projects command
    if (cmd === 'projects') {
      const projText = portfolioData.projects.map(p => 
        `- ${p.name} (${p.type}): ${p.description.slice(0, 100)}...`
      ).join('\n')
      terminal.addHistory({
        type: 'output',
        text: `Featured Projects:\n\n${projText}`
      })
      setLastIntent('PORTFOLIO')
      return
    }

    // 5. Skills command
    if (cmd === 'skills') {
      const skillsText = `Technical Skills:
- Languages: ${portfolioData.skills.languages.join(', ')}
- Frameworks: ${portfolioData.skills.frameworks.join(', ')}
- AI/ML: ${portfolioData.skills.ai.join(', ')}
- Databases: ${portfolioData.skills.databases.join(', ')}
- DevOps: ${portfolioData.skills.devops.join(', ')}`
      terminal.addHistory({
        type: 'output',
        text: skillsText
      })
      setLastIntent('PORTFOLIO')
      return
    }

    // 6. Experience command
    if (cmd === 'experience') {
      const expText = portfolioData.experience.map(e => 
        `- ${e.role} at ${e.org} (${e.duration})\n  ${e.description}`
      ).join('\n\n')
      terminal.addHistory({
        type: 'output',
        text: `Experience:\n\n${expText}`
      })
      setLastIntent('PORTFOLIO')
      return
    }

    // 7. Tech Stack command
    if (cmd === 'tech-stack') {
      terminal.addHistory({
        type: 'output',
        text: `Full technology architecture stack:
- Frontend: React 18, Vite, Framer Motion, GSAP, Lenis
- Backend: FastAPI, Node.js
- Databases: PostgreSQL, SQLite, MongoDB
- AI: OpenRouter API, ChromaDB, Llama 3 models`
      })
      setLastIntent('PORTFOLIO')
      return
    }

    // 8. AI Projects command
    if (cmd === 'ai-projects') {
      const aiProjects = portfolioData.projects.filter(p => p.tech.some(t => ['openrouter', 'llm', 'rag', 'embeddings', 'chromadb', 'openrouter api'].includes(t.toLowerCase())))
      const aiText = aiProjects.length > 0
        ? aiProjects.map(p => `- ${p.name}: ${p.description}`).join('\n')
        : `- RepoLens AI Portfolio: AI-powered developer portfolio with terminal copilot.`
      terminal.addHistory({
        type: 'output',
        text: `AI/ML Specific Projects:\n\n${aiText}`
      })
      setLastIntent('PORTFOLIO')
      return
    }

    // 9. Achievements command
    if (cmd === 'achievements') {
      const achText = portfolioData.achievements.map(a => `- ${a}`).join('\n')
      terminal.addHistory({
        type: 'output',
        text: `Achievements:\n\n${achText}`
      })
      setLastIntent('PORTFOLIO')
      return
    }

    // 10. Repos command
    if (cmd === 'repos') {
      if (repos && repos.length > 0) {
        const repoText = repos.map(r => 
          `- ${r.name} (${r.language}) ★${r.stars}\n  ${r.description.slice(0, 80)}...`
        ).join('\n\n')
        terminal.addHistory({
          type: 'output',
          text: `Live GitHub Repositories (Fetched from Vaibhav20k):\n\n${repoText}`
        })
      } else {
        terminal.addHistory({
          type: 'output',
          text: `Fetching repos failed or returned empty. Make sure username is configured.`
        })
      }
      setLastIntent('REPOSITORY')
      return
    }

    // 10b. Readme command
    if (cmd === 'readme') {
      if (!args) {
        terminal.addHistory({
          type: 'output',
          text: 'Usage: readme [repo-name]. Example: readme OrbitAir'
        })
        setLastIntent('REPOSITORY')
        return
      }

      setIsTyping(true)
      setLastIntent('REPOSITORY')
      try {
        const username = import.meta.env.VITE_GITHUB_USERNAME || 'Vaibhav20k'
        const readmeContent = await fetchRepoReadme(args, username)
        
        terminal.addHistory({
          type: 'output',
          text: `README content for ${args}:\n\n${readmeContent}`
        })
      } catch (err) {
        terminal.addHistory({
          type: 'output',
          text: `Failed to load README for ${args}.`
        })
      } finally {
        setIsTyping(false)
      }
      return
    }

    // 10c. History command
    if (cmd === 'history') {
      if (commandHistory.length === 0) {
        terminal.addHistory({
          type: 'output',
          text: 'Command history is empty.'
        })
      } else {
        const histText = commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n')
        terminal.addHistory({
          type: 'output',
          text: `Command History:\n\n${histText}`
        })
      }
      setLastIntent('SYSTEM')
      return
    }

    // 11. Ask query command
    if (cmd === 'ask') {
      if (!args) {
        terminal.addHistory({
          type: 'output',
          text: 'Usage: ask [your question]. Example: ask How does OrbitAir work?'
        })
        setLastIntent('SYSTEM')
        return
      }

      setIsTyping(true)
      
      // Compile chat history from logs with both user and assistant roles (multi-turn memory)
      const historyMessages = []
      for (let i = 0; i < terminal.history.length; i++) {
        const entry = terminal.history[i]
        if (!entry) continue
        if (entry.type === 'input' && entry.text && entry.text.startsWith('ask ')) {
          historyMessages.push({
            role: 'user',
            content: entry.text.replace(/^ask\s+/i, '')
          })
        } else if (entry.type === 'output' && historyMessages.length > 0) {
          const prevEntry = terminal.history[i - 1]
          if (prevEntry && prevEntry.type === 'input' && prevEntry.text && prevEntry.text.startsWith('ask ')) {
            historyMessages.push({
              role: 'assistant',
              content: entry.text
            })
          }
        }
      }

      // Append an empty output log which we will stream into
      terminal.addHistory({
        type: 'output',
        text: ''
      })

      let hasReceivedFirstToken = false
      const onChunk = (text) => {
        if (!hasReceivedFirstToken) {
          hasReceivedFirstToken = true
          setIsTyping(false)
        }
        terminal.updateLastHistoryEntry(text)
      }

      try {
        const response = await queryCopilot(args, historyMessages, repos, onChunk)
        if (response && response.intent) {
          setLastIntent(response.intent)
        }
      } catch (err) {
        console.error('Streaming query failed:', err)
        setLastIntent('ERROR')
      } finally {
        setIsTyping(false)
      }
      return
    }

   // ---------------------------------------------------------------------------
// 12. Fallback
// Any unknown command is treated as a natural language AI query.
// ---------------------------------------------------------------------------

setIsTyping(true)

// Build multi-turn conversation history
const historyMessages = []

for (let i = 0; i < terminal.history.length; i++) {
  const entry = terminal.history[i]

  if (!entry) continue

  if (entry.type === 'input') {
    historyMessages.push({
      role: 'user',
      content: entry.text.replace(/^ask\s+/i, '')
    })
  }

  else if (
    entry.type === 'output' &&
    historyMessages.length > 0
  ) {
    historyMessages.push({
      role: 'assistant',
      content: entry.text
    })
  }
}

// Empty output entry for streaming
terminal.addHistory({
  type: 'output',
  text: ''
})

let hasReceivedFirstToken = false

const onChunk = (text) => {
  if (!hasReceivedFirstToken) {
    hasReceivedFirstToken = true
    setIsTyping(false)
  }

  terminal.updateLastHistoryEntry(text)
}

try {
  const response = await queryCopilot(
    trimmed,
    historyMessages,
    repos,
    onChunk
  )

  if (response?.intent) {
    setLastIntent(response.intent)
  }
}
catch (err) {
  console.error(err)
  setLastIntent('ERROR')
}
finally {
  setIsTyping(false)
}
  
return
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const command = input.trim()
    if (!command) return

    setCommandHistory(prev => {
      if (prev.length > 0 && prev[prev.length - 1] === command) return prev
      return [...prev, command]
    })
    setHistoryIndex(-1)

    terminal.addHistory({ type: 'input', text: command })
    setInput('')
    await executeCommand(command)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      
      if (historyIndex === commandHistory.length - 1) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        const nextIndex = historyIndex + 1
        setHistoryIndex(nextIndex)
        setInput(commandHistory[nextIndex])
      }
    }
  }

  const handleResizeStart = (e, direction) => {
    e.preventDefault()
    e.stopPropagation()

    const startWidth = terminal.size.width
    const startHeight = terminal.size.height
    const startX = e.clientX
    const startY = e.clientY

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      let newWidth = startWidth
      let newHeight = startHeight

      if (direction === 'e' || direction === 'se') {
        newWidth = Math.max(500, startWidth + deltaX)
      }
      if (direction === 's' || direction === 'se') {
        newHeight = Math.max(350, startHeight + deltaY)
      }

      terminal.updateSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleSuggestionClick = async (suggestionCmd) => {
    if (isTyping) return
    terminal.addHistory({ type: 'input', text: suggestionCmd })
    
    // Add to persistent logs list
    setCommandHistory(prev => {
      if (prev.length > 0 && prev[prev.length - 1] === suggestionCmd) return prev
      return [...prev, suggestionCmd]
    })
    setHistoryIndex(-1)

    await executeCommand(suggestionCmd)
  }

  return (
    <motion.div
      className={styles.terminalWindow}
      drag
      dragHandleClassName={styles.titleBar}
      dragElastic={0.05}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onDragEnd={(e, info) => {
        let finalX = dragX.get()
        let finalY = dragY.get()

        // Edge snap behavior (20px snap threshold)
        const snapThreshold = 20
        // Left
        if (finalX < snapThreshold) finalX = 0
        // Top
        if (finalY < snapThreshold) finalY = 0
        // Right
        if (window.innerWidth - (finalX + terminal.size.width) < snapThreshold) {
          finalX = window.innerWidth - terminal.size.width
        }
        // Bottom
        if (window.innerHeight - (finalY + terminal.size.height) < snapThreshold) {
          finalY = window.innerHeight - terminal.size.height
        }

        // Snap window back into viewport boundaries
        finalX = Math.max(0, Math.min(window.innerWidth - terminal.size.width, finalX))
        finalY = Math.max(0, Math.min(window.innerHeight - terminal.size.height, finalY))

        dragX.set(finalX)
        dragY.set(finalY)
        terminal.updatePosition({ x: finalX, y: finalY })
      }}
      style={{
        width: terminal.size.width,
        height: terminal.size.height,
        x: dragX,
        y: dragY,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000
      }}
    >
      {/* Resize handles */}
      <div 
        className={`${styles.resizeHandle} ${styles.resizeE}`} 
        onMouseDown={(e) => handleResizeStart(e, 'e')}
      />
      <div 
        className={`${styles.resizeHandle} ${styles.resizeS}`} 
        onMouseDown={(e) => handleResizeStart(e, 's')}
      />
      <div 
        className={`${styles.resizeHandle} ${styles.resizeSE}`} 
        onMouseDown={(e) => handleResizeStart(e, 'se')}
      />

      {/* Title Bar (drag trigger) */}
      <div className={styles.titleBar}>
        <div className={styles.windowControls}>
          <button 
            className={`${styles.controlBtn} ${styles.closeBtn}`}
            onClick={terminal.closeTerminal}
            title="Close"
          />
          <button 
            className={`${styles.controlBtn} ${styles.minimizeBtn}`}
            onClick={terminal.minimizeTerminal}
            title="Minimize"
          />
          <span className={styles.terminalTitle}>Portfolio Copilot Terminal</span>
          <button 
            className={`${styles.panelToggleBtn} clickable`}
            onClick={() => setIsPanelOpen(prev => !prev)}
            title="Toggle suggestions panel"
          >
            {isPanelOpen ? '[ HIDE COPILOT ]' : '[ SHOW COPILOT ]'}
          </button>
        </div>
      </div>

      <div className={styles.windowContent}>
        {/* Terminal Screen Console */}
        <div className={styles.terminalScreen} onClick={() => inputRef.current?.focus()}>
          <div className={styles.welcomeBanner}>
            <pre className={styles.asciiArt}>
{`  ____                  _                   
 |  _ \\ ___ _ __   ___ | |    ___ _ __  ___ 
 | |_) / _ \\ '_ \\ / _ \\| |   / _ \\ '_ \\/ __|
 |  _ <  __/ |_) | (_) | |__|  __/ | | \\__ \\
 |_| \\_\\___| .__/ \\___/|_____\\___|_| |_|___/
           |_|                              `}
            </pre>
            <p>RepoLens Portfolio Copilot v1.1.0 (Node/React Client)</p>
            <p>Grounded in portfolioData.js & GitHub live API.</p>
            <p>Type 'help' to display command list reference.</p>
            <p>--------------------------------------------------</p>
          </div>

          {/* History Logs */}
          <div className={styles.historyLogs}>
            {terminal.history.filter(Boolean).map((log, index) => {
              if (!log || !log.type) return null
              return (
                <div key={index} className={styles.historyLine}>
                  {log.type === 'input' ? (
                    <div className={styles.inputLog}>
                      <span className={styles.prompt}>vaibhav@repolens:~$</span>
                      <span className={styles.commandText}>{log.text}</span>
                    </div>
                  ) : (
                    <div className={styles.outputLog}>{log.text}</div>
                  )}
                </div>
              )
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={styles.typingIndicator}>
                <span className={styles.prompt}>vaibhav@repolens:~$</span>
                <span className={styles.dots}>Thinking...</span>
              </div>
            )}
            
            <div ref={historyEndRef} />
          </div>

          {/* Terminal Input Form */}
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <span className={styles.prompt}>vaibhav@repolens:~$</span>
            <input
              ref={inputRef}
              type="text"
              className={styles.inputField}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </form>
        </div>

        {/* Dynamic Copilot suggestions side panel */}
        {isPanelOpen && (
          <CopilotPanel 
            isTyping={isTyping} 
            lastIntent={lastIntent} 
            onSuggestionClick={handleSuggestionClick} 
          />
        )}
      </div>
    </motion.div>
  )
}
