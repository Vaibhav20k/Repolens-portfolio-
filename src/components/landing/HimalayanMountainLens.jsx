import React, { useRef, useState, useEffect, useCallback } from 'react'
import styles from './HimalayanMountainLens.module.css'

// Configurable lens radius
const LENS_RADIUS = 150

export default function HimalayanMountainLens() {
  const containerRef = useRef(null)
  const [lensState, setLensState] = useState({ x: -999, y: -999, active: false })
  const [isTouch, setIsTouch] = useState(false)
  const targetPosRef = useRef({ x: -999, y: -999 })
  const currentPosRef = useRef({ x: -999, y: -999 })
  const isHoveredRef = useRef(false)
  const rafRef = useRef(null)

  // Touch device detection
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(hover: none)').matches || 'ontouchstart' in window)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Smooth lens animation loop
  const updateLoop = useCallback(() => {
    if (!isHoveredRef.current) {
      rafRef.current = null
      return
    }

    const ease = 0.2
    currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * ease
    currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * ease

    setLensState({
      x: Math.round(currentPosRef.current.x),
      y: Math.round(currentPosRef.current.y),
      active: true,
    })

    rafRef.current = requestAnimationFrame(updateLoop)
  }, [])

  const handleMouseEnter = (e) => {
    if (isTouch || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    targetPosRef.current = { x, y }
    currentPosRef.current = { x, y }
    isHoveredRef.current = true
    setLensState({ x, y, active: true })
  }

  const handleMouseMove = (e) => {
    if (isTouch || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    targetPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updateLoop)
    }
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false
    setLensState((prev) => ({ ...prev, active: false }))
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const clipPathStyle =
    lensState.active && !isTouch
      ? `circle(${LENS_RADIUS}px at ${lensState.x}px ${lensState.y}px)`
      : 'circle(0px at -999px -999px)'

  return (
    <div
      ref={containerRef}
      className={`${styles.mountainViewport} ${lensState.active && !isTouch ? styles.hoverActive : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Layer 1: Hand-Drawn Minimalist Himalayan Sketch (Normal Visible State) */}
      <svg
        className={styles.sketchSvg}
        viewBox="0 0 1600 620"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Himalayan Mountain Line Art"
      >
        <g className={styles.sketchGroup}>
          {/* Distant Ridge Background Lines */}
          <path
            d="M-50 420 Q120 360 260 380 T580 340 T920 360 T1260 330 T1650 380"
            className={styles.distantLine}
          />
          <path
            d="M-30 380 Q180 300 340 330 T680 290 T1040 310 T1380 270 T1650 320"
            className={styles.distantLine}
          />

          {/* Far Sub-Peaks */}
          <path
            d="M120 400 L220 280 L320 350"
            className={styles.midLine}
          />
          <path
            d="M520 360 L620 250 L720 330"
            className={styles.midLine}
          />
          <path
            d="M980 340 L1080 240 L1180 320"
            className={styles.midLine}
          />
          <path
            d="M1360 360 L1460 260 L1580 380"
            className={styles.midLine}
          />

          {/* Left Grand Pyramid Peak (Nanda Devi profile) */}
          <path
            d="M80 500 L240 340 L380 160 L500 290 L620 420 L760 520"
            className={styles.mainPeakLine}
          />
          {/* Left Peak Central Ridgeline & Contour Facets */}
          <path
            d="M380 160 Q395 240 430 330 T480 470"
            className={styles.ridgeLine}
          />
          <path d="M380 160 L330 250 L270 330" className={styles.contourLine} />
          <path d="M340 230 L390 280" className={styles.hatchLine} />
          <path d="M300 290 L360 340" className={styles.hatchLine} />
          <path d="M260 350 L330 400" className={styles.hatchLine} />
          <path d="M410 260 L460 320 L530 410" className={styles.contourLine} />
          <path d="M430 330 L480 380" className={styles.hatchLine} />
          <path d="M450 390 L520 450" className={styles.hatchLine} />

          {/* Center Dominant Apex Peak (Everest / Kanchenjunga style apex) */}
          <path
            d="M580 520 L690 330 L820 110 L940 270 L1080 430 L1180 540"
            className={styles.dominantPeakLine}
          />
          {/* Center Dominant Ridgeline and Rocky Cirque */}
          <path
            d="M820 110 Q810 220 835 320 T870 480"
            className={styles.ridgeLine}
          />
          <path d="M820 110 L750 220 L680 320" className={styles.contourLine} />
          <path d="M780 180 L825 240" className={styles.hatchLine} />
          <path d="M740 240 L805 300" className={styles.hatchLine} />
          <path d="M700 300 L770 370" className={styles.hatchLine} />
          <path d="M660 360 L740 440" className={styles.hatchLine} />
          <path d="M820 110 L890 210 L980 340" className={styles.contourLine} />
          <path d="M840 220 L910 280" className={styles.hatchLine} />
          <path d="M860 290 L935 360" className={styles.hatchLine} />
          <path d="M875 370 L970 450" className={styles.hatchLine} />

          {/* Right Majestic Horn Peak (Ama Dablam / Lhotse profile) */}
          <path
            d="M1000 530 L1120 310 L1240 140 L1360 280 L1490 410 L1620 540"
            className={styles.mainPeakLine}
          />
          {/* Right Peak Ridgeline & Contour */}
          <path
            d="M1240 140 Q1225 250 1205 360 T1180 500"
            className={styles.ridgeLine}
          />
          <path d="M1240 140 L1170 230 L1110 320" className={styles.contourLine} />
          <path d="M1210 200 L1235 270" className={styles.hatchLine} />
          <path d="M1170 260 L1215 340" className={styles.hatchLine} />
          <path d="M1130 320 L1185 410" className={styles.hatchLine} />
          <path d="M1240 140 L1310 230 L1390 340" className={styles.contourLine} />
          <path d="M1255 240 L1330 310" className={styles.hatchLine} />
          <path d="M1275 310 L1360 390" className={styles.hatchLine} />
          <path d="M1290 380 L1410 470" className={styles.hatchLine} />

          {/* Foreground Valley Ridges & Foothills */}
          <path
            d="M-20 560 Q260 460 520 490 T1040 480 T1580 520 T1650 560"
            className={styles.foregroundRidge}
          />
          <path
            d="M180 540 Q420 500 720 520 T1320 510 T1620 560"
            className={styles.foregroundRidge}
          />
        </g>
      </svg>

      {/* Layer 2: Realistic / Painterly Atmospheric Himalayan Landscape (Revealed inside Circular Lens) */}
      <svg
        className={styles.realSvg}
        viewBox="0 0 1600 620"
        preserveAspectRatio="xMidYMid meet"
        style={{
          clipPath: clipPathStyle,
          WebkitClipPath: clipPathStyle,
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Atmospheric Sky Gradient */}
          <linearGradient id="himalayaSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8da9bf" />
            <stop offset="35%" stopColor="#b4c7d5" />
            <stop offset="70%" stopColor="#ddcfbe" />
            <stop offset="100%" stopColor="#e8dfd0" />
          </linearGradient>

          {/* Distant Atmospheric Mountain Gradient */}
          <linearGradient id="distantMtnGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9fb0c2" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#c5b7a8" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#e8dfd0" stopOpacity="0.1" />
          </linearGradient>

          {/* Left Peak Rock Shadow Face */}
          <linearGradient id="leftRockShadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3d4956" />
            <stop offset="40%" stopColor="#2c3641" />
            <stop offset="100%" stopColor="#20272f" />
          </linearGradient>

          {/* Left Peak Sunlit Snow Face */}
          <linearGradient id="leftSunlitSnow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f5e8d8" />
            <stop offset="80%" stopColor="#d9c3ab" />
            <stop offset="100%" stopColor="#4f433c" />
          </linearGradient>

          {/* Center Dominant Peak Rock Shadow */}
          <linearGradient id="centerRockShadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#343d48" />
            <stop offset="50%" stopColor="#242b33" />
            <stop offset="100%" stopColor="#181d22" />
          </linearGradient>

          {/* Center Dominant Peak Golden Sunlit Snow */}
          <linearGradient id="centerSunlitSnow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#faecd8" />
            <stop offset="70%" stopColor="#e6ceb5" />
            <stop offset="100%" stopColor="#5c4a40" />
          </linearGradient>

          {/* Right Peak Shadow Face */}
          <linearGradient id="rightRockShadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b444f" />
            <stop offset="50%" stopColor="#272e37" />
            <stop offset="100%" stopColor="#1d2228" />
          </linearGradient>

          {/* Right Peak Sunlit Snow Face */}
          <linearGradient id="rightSunlitSnow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f7ebd9" />
            <stop offset="80%" stopColor="#dcbe9f" />
            <stop offset="100%" stopColor="#53453d" />
          </linearGradient>

          {/* Foreground Valley Mist Gradient */}
          <linearGradient id="valleyMist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8dfd0" stopOpacity="0" />
            <stop offset="50%" stopColor="#e2d5c3" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#e8dfd0" stopOpacity="0.98" />
          </linearGradient>
        </defs>

        {/* Realistic Sky Backdrop */}
        <rect x="0" y="0" width="1600" height="620" fill="url(#himalayaSky)" />

        {/* Distant Mountain Silhouettes */}
        <path
          d="M-50 420 Q120 360 260 380 T580 340 T920 360 T1260 330 T1650 380 L1650 620 L-50 620 Z"
          fill="url(#distantMtnGrad)"
        />
        <path
          d="M-30 380 Q180 300 340 330 T680 290 T1040 310 T1380 270 T1650 320 L1650 620 L-30 620 Z"
          fill="url(#distantMtnGrad)"
        />

        {/* Far Background Peaks */}
        <polygon points="120,400 220,280 320,350 320,620 120,620" fill="#8b9ba9" opacity="0.6" />
        <polygon points="520,360 620,250 720,330 720,620 520,620" fill="#8898a6" opacity="0.6" />
        <polygon points="980,340 1080,240 1180,320 1180,620 980,620" fill="#8696a4" opacity="0.6" />
        <polygon points="1360,360 1460,260 1580,380 1580,620 1360,620" fill="#8494a2" opacity="0.6" />

        {/* Left Grand Pyramid Peak (Nanda Devi profile) */}
        {/* Shadow / North-West Face */}
        <path
          d="M80 500 L240 340 L380 160 Q395 240 430 330 T480 470 L80 500 Z"
          fill="url(#leftRockShadow)"
        />
        {/* Snow Highlights on Shadow Face */}
        <polygon points="380,160 350,210 370,220 340,260 365,270 380,160" fill="#c3d2de" opacity="0.75" />
        <polygon points="330,280 290,340 320,345 280,390 310,400 345,330" fill="#b1c3d1" opacity="0.65" />

        {/* Sunlit / South-East Face */}
        <path
          d="M380 160 Q395 240 430 330 T480 470 L760 520 L620 420 L500 290 L380 160 Z"
          fill="url(#leftSunlitSnow)"
        />
        {/* Golden Sunlit Glaciers & Snow Ridges */}
        <polygon points="380,160 410,230 450,220 430,300 480,290 380,160" fill="#ffffff" opacity="0.95" />
        <polygon points="430,310 470,370 510,360 480,430 530,420 460,340" fill="#fff5ea" opacity="0.9" />

        {/* Center Dominant Apex Peak (Everest / Kanchenjunga profile) */}
        {/* Shadow Face */}
        <path
          d="M580 520 L690 330 L820 110 Q810 220 835 320 T870 480 L580 520 Z"
          fill="url(#centerRockShadow)"
        />
        {/* Snow Veins on Shadow Face */}
        <polygon points="820,110 790,170 810,180 770,240 795,250 820,110" fill="#c6d5e2" opacity="0.8" />
        <polygon points="760,260 720,330 745,340 690,410 730,420 780,310" fill="#b2c4d3" opacity="0.7" />

        {/* Sunlit Face */}
        <path
          d="M820 110 Q810 220 835 320 T870 480 L1180 540 L1080 430 L940 270 L820 110 Z"
          fill="url(#centerSunlitSnow)"
        />
        {/* Pure Glowing Snow Crown and Couloirs */}
        <polygon points="820,110 860,190 900,180 880,260 930,250 820,110" fill="#ffffff" opacity="0.98" />
        <polygon points="870,270 915,350 960,340 930,420 990,410 900,320" fill="#fff7ec" opacity="0.92" />
        <polygon points="940,270 970,320 1020,310 990,380 1050,370 980,300" fill="#fffaee" opacity="0.85" />

        {/* Right Majestic Horn Peak (Ama Dablam / Lhotse profile) */}
        {/* Shadow Face */}
        <path
          d="M1000 530 L1120 310 L1240 140 Q1225 250 1205 360 T1180 500 L1000 530 Z"
          fill="url(#rightRockShadow)"
        />
        {/* Snow Ribs on Shadow */}
        <polygon points="1240,140 1210,195 1225,205 1190,260 1210,270 1240,140" fill="#c7d6e2" opacity="0.8" />
        <polygon points="1180,280 1140,350 1165,360 1120,430 1150,440 1195,330" fill="#b3c5d4" opacity="0.7" />

        {/* Sunlit Face */}
        <path
          d="M1240 140 Q1225 250 1205 360 T1180 500 L1620 540 L1490 410 L1360 280 L1240 140 Z"
          fill="url(#rightSunlitSnow)"
        />
        {/* Right Peak Sunlit Snow Layers */}
        <polygon points="1240,140 1275,210 1315,200 1290,280 1340,270 1240,140" fill="#ffffff" opacity="0.95" />
        <polygon points="1285,290 1330,370 1370,360 1340,430 1395,420 1320,330" fill="#fff6eb" opacity="0.9" />

        {/* Foreground Valley Glades & Warm Mist */}
        <path
          d="M-20 480 Q280 430 560 460 T1100 450 T1650 490 L1650 620 L-20 620 Z"
          fill="#5a4e45"
          opacity="0.8"
        />
        <path
          d="M-20 530 Q320 480 640 510 T1220 500 T1650 540 L1650 620 L-20 620 Z"
          fill="#443932"
        />
        {/* Soft Ambient Valley Mist blending to base */}
        <rect x="0" y="440" width="1600" height="180" fill="url(#valleyMist)" />
      </svg>

      {/* Layer 3: Minimal Circular Lens Border Ring */}
      {lensState.active && !isTouch && lensState.x >= 0 && (
        <div
          className={styles.lensRing}
          style={{
            width: `${LENS_RADIUS * 2}px`,
            height: `${LENS_RADIUS * 2}px`,
            transform: `translate(${lensState.x - LENS_RADIUS}px, ${lensState.y - LENS_RADIUS}px)`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
