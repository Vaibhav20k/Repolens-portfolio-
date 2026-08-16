import React, { Suspense, useEffect, useRef, useState, useCallback, memo } from 'react'
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

function HeroRobotComponent() {
  const splineAppRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  // 1. Defer Spline import until element is in viewport and browser is idle
  useEffect(() => {
    let idleHandle = null
    let rafHandle = null
    let observer = null

    const initiateLoad = () => {
      if ('requestIdleCallback' in window) {
        idleHandle = window.requestIdleCallback(
          () => {
            setShouldLoad(true)
          },
          { timeout: 2000 }
        )
      } else {
        rafHandle = window.requestAnimationFrame(() => {
          setShouldLoad(true)
        })
      }
    }

    if (containerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            initiateLoad()
            if (observer) {
              observer.disconnect()
              observer = null
            }
          }
        },
        { rootMargin: '150px' }
      )
      observer.observe(containerRef.current)
    } else {
      initiateLoad()
    }

    return () => {
      if (observer) observer.disconnect()
      if (idleHandle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleHandle)
      if (rafHandle) window.cancelAnimationFrame(rafHandle)
    }
  }, [])

  // Dynamically set zoom and camera position on the Spline runtime Application instance
  const adjustCamera = useCallback((splineApp) => {
    if (!splineApp || !splineApp.camera) return

    const width = window.innerWidth
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
  }, [])

  const handleLoad = useCallback((splineApp) => {
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
  }, [adjustCamera])

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
  }, [adjustCamera])

  // Explicit cleanup on unmount
  useEffect(() => {
    return () => {
      if (splineAppRef.current) {
        try {
          if (typeof splineAppRef.current.dispose === 'function') {
            splineAppRef.current.dispose()
          }
        } catch {
          // Ignore disposal errors on unmount
        }
        splineAppRef.current = null
      }
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className={styles.robotWrapper}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Subtle radial glow backing the robot */}
      <div className={styles.glow}></div>

      {/* Floating animation wrapper */}
      <div className={styles.floatingContainer}>
        <div className={styles.splineContainer}>
          {shouldLoad ? (
            <Suspense fallback={<LoadingPlaceholder />}>
              <Spline
                scene="/scene.splinecode"
                className={styles.splineCanvas}
                style={{ background: 'transparent' }}
                onLoad={handleLoad}
              />
            </Suspense>
          ) : (
            <LoadingPlaceholder />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(HeroRobotComponent)
