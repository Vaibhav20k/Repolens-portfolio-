import { useState, useCallback } from 'react'

export function useTerminalState() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [history, setHistory] = useState([])
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: 600, height: 400 })

  const openTerminal = useCallback(() => {
    setIsOpen(true)
    setIsMinimized(false)
  }, [])

  const closeTerminal = useCallback(() => {
    setIsOpen(false)
    setIsMinimized(false)
  }, [])

  const minimizeTerminal = useCallback(() => {
    setIsMinimized(true)
  }, [])

  const restoreTerminal = useCallback(() => {
    setIsMinimized(false)
    setIsOpen(true)
  }, [])

  const addHistory = useCallback((entry) => {
    setHistory(prev => [...prev, entry])
  }, [])

  const updateLastHistoryEntry = useCallback((text) => {
    setHistory(prev => {
      if (prev.length === 0) return prev
      const next = [...prev]
      next[next.length - 1] = {
        ...next[next.length - 1],
        text: text
      }
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const updatePosition = useCallback((newPos) => {
    setPosition(newPos)
  }, [])

  const updateSize = useCallback((newSize) => {
    setSize(newSize)
  }, [])

  return {
    isOpen,
    isMinimized,
    history,
    position,
    size,
    openTerminal,
    closeTerminal,
    minimizeTerminal,
    restoreTerminal,
    addHistory,
    updateLastHistoryEntry,
    clearHistory,
    updatePosition,
    updateSize
  }
}
