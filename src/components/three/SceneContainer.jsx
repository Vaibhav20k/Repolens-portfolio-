import React, { useEffect, useState } from 'react'
import styles from './Scene.module.css'

export default function SceneContainer() {
  const [scrollY, setScrollY] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    const handleMouseMove = (e) => {
      // Calculate normalized mouse coordinates (-0.5 to 0.5) relative to viewport width/height
      const nx = (e.clientX / window.innerWidth) - 0.5
      const ny = (e.clientY / window.innerHeight) - 0.5
      setMouseOffset({ x: nx, y: ny })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Calculate translation factor based on scroll coordinates
  const leftTranslateY = scrollY * 0.12
  const rightTranslateY = scrollY * -0.08

  // Calculate 3D rotations based on mouse cursor position
  const cupRotateX = mouseOffset.y * 30  // Tilt up/down up to 15deg
  const cupRotateY = mouseOffset.x * -25 // Tilt left/right up to 12.5deg
  
  const mouseRotateX = mouseOffset.y * -25
  const mouseRotateY = mouseOffset.x * 35

  return (
    <div className={styles.ambientScene}>
      {/* Procedural Coffee Cup on left edge */}
      <div 
        className={`${styles.ambientItem} ${styles.coffeeCup}`}
        style={{
          transform: `translate3d(-20px, calc(30vh + ${leftTranslateY}px), 0) rotate(${scrollY * 0.05}deg) rotateX(${cupRotateX}deg) rotateY(${cupRotateY}deg)`
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
          transform: `translate3d(20px, calc(60vh + ${rightTranslateY}px), 0) rotate(${scrollY * -0.03}deg) rotateX(${mouseRotateX}deg) rotateY(${mouseRotateY}deg)`
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
