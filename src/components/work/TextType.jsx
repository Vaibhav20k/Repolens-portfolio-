import React, { useState, useEffect } from 'react'

export default function TextType({ text, speed = 15 }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)
    
    let index = 0
    let intervalId

    const type = () => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index))
        index++
        
        // Randomize typing speed slightly for realism
        const nextSpeed = speed + Math.random() * 15
        intervalId = setTimeout(type, nextSpeed)
      } else {
        setIsTyping(false)
      }
    }

    // Start typing
    intervalId = setTimeout(type, speed)

    return () => {
      clearTimeout(intervalId)
    }
  }, [text, speed])

  return (
    <span style={{ fontFamily: 'var(--font-body)', position: 'relative' }}>
      {displayedText}
      {isTyping && (
        <span 
          style={{
            display: 'inline-block',
            width: '6px',
            height: '14px',
            backgroundColor: 'var(--color-accent)',
            marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'typeBlink 0.6s infinite alternate'
          }}
        />
      )}
      <style>{`
        @keyframes typeBlink {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </span>
  )
}
