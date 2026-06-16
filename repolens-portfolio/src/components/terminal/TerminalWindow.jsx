import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Terminal.module.css'
import { queryCopilot } from '../../services/copilotClient'
import { portfolioData } from '../../data/portfolioData'

export default function TerminalWindow({ terminal, repos }) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const historyEndRef = useRef(null)
  const inputRef = useRef(null)

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
        await executeCommand(queryStr)
      }
    }
    window.addEventListener('terminal-query', handleQueryEvent)
    return () => window.removeEventListener('terminal-query', handleQueryEvent)
  }, [terminal, repos])

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
  ask [query]    Ask me anything about Vaibhav or his work
  clear          Clear the terminal

  Example:
  ask How does OrbitAir work?
  ask What is your strongest project?`
      })
      return
    }

    // 3. About command
    if (cmd === 'about') {
      terminal.addHistory({
        type: 'output',
        text: `${portfolioData.name}\n${portfolioData.title}\n\n${portfolioData.about.paragraph}`
      })
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
      return
    }

    // 7. Tech Stack command
    if (cmd === 'tech-stack') {
      terminal.addHistory({
        type: 'output',
        text: `Full technology architecture stack:\n- Frontend: React 18, Vite, Framer Motion, GSAP, Lenis\n- Backend: FastAPI, Node.js\n- Databases: PostgreSQL, SQLite, MongoDB\n- AI: OpenRouter API, ChromaDB, Llama 3 models`
      })
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
      return
    }

    // 9. Achievements command
    if (cmd === 'achievements') {
      const achText = portfolioData.achievements.map(a => `- ${a}`).join('\n')
      terminal.addHistory({
        type: 'output',
        text: `Achievements:\n\n${achText}`
      })
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
      return
    }

    // 11. Ask query command
    if (cmd === 'ask') {
      if (!args) {
        terminal.addHistory({
          type: 'output',
          text: 'Usage: ask [your question]. Example: ask How does OrbitAir work?'
        })
        return
      }

      setIsTyping(true)
      // Compile chat history from logs
      const historyMessages = terminal.history
        .filter(h => h.type === 'input' && h.text.startsWith('ask '))
        .map(h => ({
          role: 'user',
          content: h.text.replace(/^ask\s+/i, '')
        }))

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
        await queryCopilot(args, historyMessages, repos, onChunk)
      } catch (err) {
        console.error('Streaming query failed:', err)
      } finally {
        setIsTyping(false)
      }
      return
    }

    // 12. Fallback
    terminal.addHistory({
      type: 'output',
      text: `Command not found: ${cmd}. Type 'help' to see available commands.`
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const command = input.trim()
    if (!command) return

    terminal.addHistory({ type: 'input', text: command })
    setInput('')
    await executeCommand(command)
  }

  return (
    <motion.div
      className={styles.terminalWindow}
      drag
      dragHandleClassName={styles.titleBar}
      dragElastic={0.05}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, x: terminal.position.x, y: terminal.position.y }}
      animate={{ scale: 1, opacity: 1, x: terminal.position.x, y: terminal.position.y }}
      exit={{ scale: 0.9, opacity: 0 }}
      onDragEnd={(e, info) => {
        // Save terminal coordinates in state
        terminal.updatePosition({ x: info.point.x - 300, y: info.point.y - 200 })
      }}
      style={{
        width: terminal.size.width,
        height: terminal.size.height,
        position: 'fixed',
        zIndex: 1000
      }}
    >
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
        </div>
      </div>

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
          <p>RepoLens Portfolio Copilot v1.0.0 (Node/React Client)</p>
          <p>Grounded in portfolioData.js & GitHub live API.</p>
          <p>Type 'help' to display command list reference.</p>
          <p>--------------------------------------------------</p>
        </div>

        {/* History Logs */}
        <div className={styles.historyLogs}>
          {terminal.history.map((log, index) => (
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
          ))}

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
            disabled={isTyping}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </div>
    </motion.div>
  )
}
