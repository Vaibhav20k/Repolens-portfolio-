import React, { useEffect, useState } from 'react'
import { portfolioData } from '../../data/portfolioData'
import styles from './SocialIcons.module.css'

export default function SocialIcons() {
  const { contact } = portfolioData
  const [isOverlapped, setIsOverlapped] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight
      const scrollY = window.scrollY
      
      // Calculate vertical position of coffee cup (matching SceneContainer.jsx)
      // cupY = 30% of viewport height + scrollY * 0.12 scroll factor
      const cupY = 0.3 * vh + scrollY * 0.12
      
      // Social icons are fixed at 50% of viewport height
      const socialsY = 0.5 * vh

      // Coffee cup is ~100px tall. If cup center is within 120px of social icons center, they overlap.
      if (Math.abs(cupY - socialsY) < 120) {
        setIsOverlapped(true)
      } else {
        setIsOverlapped(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`${styles.socialSidebar} ${isOverlapped ? styles.translucent : ''}`}>
      <a 
        href={contact.github} 
        target="https://github.com/Vaibhav20k"
        rel="noopener noreferrer" 
        className={`${styles.socialIcon} clickable`}
        title="GitHub"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>
      <a 
        href={contact.linkedin} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${styles.socialIcon} clickable`}
        title="LinkedIn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      </a>
      <a 
        href={contact.instagram} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${styles.socialIcon} clickable`}
        title="Instagram"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
    </div>
  )
}
