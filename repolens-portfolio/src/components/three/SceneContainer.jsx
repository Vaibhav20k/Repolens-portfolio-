import React, { useEffect, useState } from 'react'
import styles from './Scene.module.css'

export default function SceneContainer() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate translation factor based on scroll coordinates
  const leftTranslateY = scrollY * 0.12
  const rightTranslateY = scrollY * -0.08

  return (
    <div className={styles.ambientScene}>
      {/* Procedural Coffee Cup on left edge */}
      <div 
        className={`${styles.ambientItem} ${styles.coffeeCup}`}
        style={{
          transform: `translate3d(-20px, calc(30vh + ${leftTranslateY}px), 0) rotate(${scrollY * 0.05}deg)`
        }}
      >
        <div className={styles.cupBody}>
          <div className={styles.cupStripe}></div>
          <div className={styles.steamLines}>
            <span className={styles.steam}></span>
            <span className={styles.steam}></span>
          </div>
        </div>
        <div className={styles.cupHandle}></div>
      </div>

      {/* Procedural Mouse Device on right edge */}
      <div 
        className={`${styles.ambientItem} ${styles.mouseDevice}`}
        style={{
          transform: `translate3d(20px, calc(60vh + ${rightTranslateY}px), 0) rotate(${scrollY * -0.03}deg)`
        }}
      >
        <div className={styles.mouseBody}>
          <div className={styles.mouseWheel}></div>
          <div className={styles.mouseLine}></div>
        </div>
      </div>
    </div>
  )
}
