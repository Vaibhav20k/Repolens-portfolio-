import React from 'react'
import styles from './Navigation.module.css'

export default function Navigation() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL || '#'

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Lenis respects standard window scroll calls
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={styles.verticalNav}>
      <button onClick={() => handleNavClick('about')} className={styles.navItem}>
        <span className={styles.dot}></span>
        <span className={styles.text}>ABOUT</span>
      </button>
      <button onClick={() => handleNavClick('work')} className={styles.navItem}>
        <span className={styles.dot}></span>
        <span className={styles.text}>WORK</span>
      </button>
      <a 
        href={resumeUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.navItem}
      >
        <span className={styles.dot}></span>
        <span className={styles.text}>RESUME</span>
      </a>
      <button onClick={() => handleNavClick('contact')} className={styles.navItem}>
        <span className={styles.dot}></span>
        <span className={styles.text}>CONTACT</span>
      </button>
    </nav>
  )
}
