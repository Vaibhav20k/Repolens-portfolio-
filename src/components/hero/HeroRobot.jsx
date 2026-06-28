import React, { Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './HeroRobot.module.css'

const Spline = React.lazy(() => import('@splinetool/react-spline'))

function LoadingPlaceholder() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.pulseRing}></div>
      <span className={styles.loaderText}>CONNECTING MASCOT...</span>
    </div>
  )
}

export default function HeroRobot() {
  const splineAppRef = useRef(null)

  // Dynamically set zoom and camera position on the Spline runtime Application instance
  const adjustCamera = (splineApp) => {
    if (!splineApp || !splineApp.camera) return

    const width = window.innerWidth
    // We scale the camera position vector outward to move the camera back.
    // Setting larger distance factors scales down the model so that the entire robot fits comfortably.
    let distanceFactor = 1.9 // Default for large desktops
    let zoomFactor = 1.0

    if (width < 480) {
      distanceFactor = 2.4 // Small mobile
      zoomFactor = 0.9
    } else if (width < 768) {
      distanceFactor = 2.25 // Standard mobile
      zoomFactor = 0.95
    } else if (width < 1024) {
      distanceFactor = 2.05 // Tablet
      zoomFactor = 1.0
    } else if (width < 1400) {
      distanceFactor = 20 // Small desktop
      zoomFactor = 10
    }

    try {
      const camera = splineApp.camera

      // Save the original camera position coordinates on first load
      if (camera.userData) {
        if (camera.userData.originalX === undefined) {
          camera.userData.originalX = camera.position.x
          camera.userData.originalY = camera.position.y
          camera.userData.originalZ = camera.position.z
        }
        if (camera.userData.originalZoom === undefined) {
          camera.userData.originalZoom = camera.zoom || 1
        }
      }

      // Move the camera back by multiplying its original coordinates
      if (camera.position) {
        camera.position.x = camera.userData.originalX * distanceFactor
        // Keep the camera slightly lower/centered by removing the positive vertical offset
        camera.position.y = camera.userData.originalY * distanceFactor
        camera.position.z = camera.userData.originalZ * distanceFactor
      }

      // Apply zoom adjustments
      camera.zoom = camera.userData.originalZoom * zoomFactor

      // Force camera projection updates
      camera.updateProjectionMatrix()
    } catch (err) {
      console.warn('Failed to adjust camera framing:', err)
    }
  }

  const handleLoad = (splineApp) => {
    splineAppRef.current = splineApp

    try {
      // 1. Force background transparency on scene and WebGLRenderer
      if (typeof splineApp.setBackgroundColor === 'function') {
        splineApp.setBackgroundColor('transparent')
      }
      if (splineApp.scene) {
        splineApp.scene.background = null

        // 2. Traverse the scene to search and hide any solid background planes or environment backdrops
        splineApp.scene.traverse((child) => {
          if (child.isMesh || child.type === 'Mesh') {
            const nameLower = (child.name || '').toLowerCase().trim()
            if (
              nameLower === 'plane' ||
              nameLower.startsWith('plane ') ||
              nameLower === 'rectangle' ||
              nameLower.startsWith('rectangle ') ||
              nameLower.includes('bg') ||
              nameLower.includes('background') ||
              nameLower.includes('backdrop') ||
              nameLower.includes('wall') ||
              nameLower.includes('floor') ||
              nameLower.includes('grid') ||
              nameLower.includes('environment')
            ) {
              child.visible = false
            }
          }
        })
      }
      if (splineApp.renderer) {
        splineApp.renderer.setClearAlpha(0)
        splineApp.renderer.setClearColor(0x000000, 0)
      }
    } catch (err) {
      console.warn('Failed to programmatically clear background color:', err)
    }

    // 3. Set camera framing distance and zoom level
    adjustCamera(splineApp)
  }

  // Adjust zoom dynamically on resize
  useEffect(() => {
    const handleResize = () => {
      if (splineAppRef.current) {
        adjustCamera(splineAppRef.current)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.div
      className={styles.robotWrapper}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 1.5,
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Subtle radial glow backing the robot */}
      <div className={styles.glow}></div>

      {/* Floating animation wrapper */}
      <div className={styles.floatingContainer}>
        <div className={styles.splineContainer}>
          <Suspense fallback={<LoadingPlaceholder />}>
            <Spline
              scene="/scene.splinecode"
              className={styles.splineCanvas}
              style={{ background: 'transparent' }}
              onLoad={handleLoad}
            />
          </Suspense>
        </div>
      </div>
    </motion.div>
  )
}
