import React, { useEffect, useState } from 'react'
import styles from './Navigation.module.css'

export default function Navigation() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL || '#'
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'work', 'contact']
      let currentSection = 'hero'

      const scrollPosition = window.scrollY + window.innerHeight * 0.45

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop) {
            currentSection = sectionId
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={styles.verticalNav}>
      <button
        onClick={() => handleNavClick('about')}
        className={`${styles.navItem} ${activeSection === 'about' ? styles.active : ''} clickable`}
      >
        <span className={styles.dot}></span>
        <span className={styles.text}>ABOUT</span>
      </button>
      <button
        onClick={() => handleNavClick('work')}
        className={`${styles.navItem} ${activeSection === 'work' ? styles.active : ''} clickable`}
      >
        <span className={styles.dot}></span>
        <span className={styles.text}>WORK</span>
      </button>
      <a
        href="https://drive.google.com/file/d/1AcspKX_Xe14130mJODU9jd5R04xHHkDY/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.navItem} clickable`}
      >
        <span className={styles.dot}></span>
        <span className={styles.text}>RESUME</span>
      </a>
      <button
        onClick={() => handleNavClick('contact')}
        className={`${styles.navItem} ${activeSection === 'contact' ? styles.active : ''} clickable`}
      >
        <span className={styles.dot}></span>
        <span className={styles.text}>CONTACT</span>
      </button>

      <a
        href="https://drive.google.com/file/d/1AcspKX_Xe14130mJODU9jd5R04xHHkDY/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.navItem} clickable`}
      >
        <span className={styles.dot}></span>
        <span className={styles.text}>BLOG</span>
      </a>
    </nav>
  )
}
