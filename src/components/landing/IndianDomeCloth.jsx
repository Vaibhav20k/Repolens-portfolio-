import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from './IndianDomeCloth.module.css'
import ChimesControlPanel from './ChimesControlPanel'

// 2D Vector Helper from Chimes source
class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  reset(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  clone() {
    return new Vec2(this.x, this.y)
  }
  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }
  subtract(v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }
  subtractNew(v) {
    return new Vec2(this.x - v.x, this.y - v.y)
  }
  get lengthSquared() {
    return this.x ** 2 + this.y ** 2
  }
  get length() {
    return Math.hypot(this.x, this.y)
  }
  get angle() {
    return Math.atan2(this.y, this.x)
  }
}

// Particle Class from Chimes source
class Particle {
  constructor({ x, y, pinned, id, char }) {
    this.pos = new Vec2(x, y)
    this.oldPos = new Vec2(x, y)
    this.velocity = new Vec2()
    this.acceleration = new Vec2()
    this.pinned = pinned
    this.id = id
    this.char = char
    this.gravityVec = new Vec2()
  }

  update(delta, damping, gravity) {
    if (this.pinned) {
      this.acceleration.reset(0, 0)
      return
    }
    this.velocity.reset(
      (this.pos.x - this.oldPos.x) * damping,
      (this.pos.y - this.oldPos.y) * damping
    )
    this.oldPos.reset(this.pos.x, this.pos.y)
    const dd = delta ** 2
    this.gravityVec.reset(0, gravity / dd)
    this.applyForce(this.gravityVec)
    this.pos.x += this.velocity.x + this.acceleration.x * dd
    this.pos.y += this.velocity.y + this.acceleration.y * dd
    this.acceleration.reset(0, 0)
  }

  applyForce(v) {
    this.acceleration.add(v)
  }
}

// Distance Constraint Class from Chimes source
class Constraint {
  constructor({ p1, p2, length, id, compressFactor = 0.02, stretchFactor = 1.1, isSpacer = false }) {
    this.p1 = p1
    this.p2 = p2
    this.length = length
    this.id = id
    this.isSpacer = isSpacer
    this.compressFactor = compressFactor
    this.stretchFactor = stretchFactor
    this.minLength = length * (isSpacer ? 0.6 : compressFactor)
    this.maxLength = length * (isSpacer ? 4.0 : stretchFactor)
  }

  updateFactors(compressFactor, stretchFactor) {
    if (!this.isSpacer) {
      this.compressFactor = compressFactor
      this.stretchFactor = stretchFactor
      this.minLength = this.length * compressFactor
      this.maxLength = this.length * stretchFactor
    }
  }

  solve() {
    const dx = this.p2.pos.x - this.p1.pos.x
    const dy = this.p2.pos.y - this.p1.pos.y
    const distance = Math.hypot(dx, dy)
    if (distance === 0) return

    let targetLength = this.length
    if (distance < this.minLength) targetLength = this.minLength
    else if (distance > this.maxLength) targetLength = this.maxLength
    else return

    const percent = (targetLength - distance) / distance / 2
    const offsetX = dx * percent
    const offsetY = dy * percent

    if (!this.p1.pinned) {
      this.p1.pos.x -= offsetX
      this.p1.pos.y -= offsetY
    }
    if (!this.p2.pinned) {
      this.p2.pos.x += offsetX
      this.p2.pos.y += offsetY
    }
  }
}

// Smoothstep helper
function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function getPointID(row, col, gridH) {
  return col * gridH + row
}

// Grapheme extraction & character mapping from Chimes countries.js
const graphemeSeg =
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null

function graphemesOf(text, dense = false) {
  let cells = graphemeSeg
    ? Array.from(graphemeSeg.segment(text), (s) => s.segment)
    : Array.from(text)
  if (dense) cells = cells.filter((g) => g.trim() !== '')
  return cells
}

function charForCell(text, i, j, gridW, gridH, writing = 'horizontal', dense = false) {
  if (!text || !text.length) return ' '
  const cells = graphemesOf(text, dense)
  let index
  if (writing === 'vertical') {
    const colFromRight = gridW - 1 - i
    index = colFromRight * gridH + j
  } else {
    index = j * gridW + i
  }
  return cells[index % cells.length] || ' '
}

// Exact India text from Chimes repository
const INDIA_CLOTH_TEXT = [
  "यात्रा अंत नहीं है — जो केवल मंज़िल देखता है वह राह का ज्ञान खो देता है",
  "अतिथि देवो भव — मेहमान में देवता देखना सिखाता है कि घर दीवार नहीं हृदय है",
  "वसुधैव कुटुम्बकम् — दुनिया एक परिवार है जब दृष्टि भय से बड़ी हो",
  "धर्मो रक्षति रक्षितः — जो सत्य की रक्षा करता है सत्य उसकी रक्षा करता है",
  "कर्मण्येवाधिकारस्ते — फल की चिंता छोड़ो कर्म में पूर्णता ढूँढो",
  "सत्यमेव जयते — झूठ तेज़ दौड़ सकता है पर अंत में सत्य ही ठहरता है",
  "दूर के ढोल सुहावने — पास आकर ही पता चलता है कि संगीत सच है या सिर्फ़ गूँज",
  "जैसा बोओगे वैसा काटोगे — यात्रा भी एक बीज है जो भीतर उगता है",
  "मन के हारे हार है — रास्ता वही आसान होता है जिसे हृदय ने स्वीकार किया",
  "नदी कभी पीछे नहीं मुड़ती — प्रवाह सिखाता है कि वापसी दिशा नहीं साहस है",
  "एकता में बल है — अकेला दीया हवा में बुझता है दीपमाला नहीं",
  "ज्ञान से बड़ा कोई धन नहीं — पर बिना यात्रा का ज्ञान अधूरा रहता है",
  "समय सबका इलाज है — धैर्य वह औषधि है जो जल्दी नहीं दिखती",
  "आह्वान सुनो मंदिर की घंटी का — हर यात्रा एक प्रार्थना है अगर ध्यान हो",
  "पर्वत ऊँचा दिखे तो भी चढ़ो — ऊँचाई आँख का भ्रम कदम सच्चा माप है",
  "अंधेरे में भी दीया जलाओ — भय को रोशनी से जवाब दो शब्दों से नहीं",
  "घर वही जहाँ स्वागत हो — पत्थर कहीं भी लगा सकते हो प्रतीक्षा अर्थ बनाती है",
  "यात्रा दृष्टि बदलती है — और बदली दृष्टि से ही घर लौटना योग्य होता है"
].join("　")

// Default configuration constants
const DEFAULT_CONFIG = {
  width: 492,
  height: 520,
  gridW: 40,
  gridH: 44,
  gravity: 0.2,
  damping: 0.99,
  iterationsPerFrame: 5,
  compressFactor: 0.02,
  stretchFactor: 1.1,
  mouseSize: 5000,
  mouseStrength: 4.0,
  chimes: true,
  chimeVolume: 0.28,
}

// India Synthesized Chime profile from Chimes chimes.js
class IndianChimesSynth {
  constructor() {
    this.ctx = null
    this.lastStrikeTime = 0
    this.minInterval = 62
    this.profile = {
      freqs: [220.0, 261.63, 311.13, 349.23, 392.0, 466.16, 523.25, 622.25],
      partials: [
        { ratio: 1.0, gain: 0.6 },
        { ratio: 1.5, gain: 0.18 },
        { ratio: 2.0, gain: 0.2 },
        { ratio: 2.85, gain: 0.14 },
        { ratio: 4.1, gain: 0.06 },
      ],
      duration: 1.35,
      attack: 0.014,
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  strike(colRatio = 0.5, intensity = 0.5, volume = 0.28, enabled = true) {
    if (!enabled || volume <= 0) return
    const now = performance.now()
    if (now - this.lastStrikeTime < this.minInterval) return
    this.lastStrikeTime = now

    if (!this.ctx) this.init()
    if (!this.ctx) return

    const freqs = this.profile.freqs
    const idx = Math.min(freqs.length - 1, Math.max(0, Math.floor(colRatio * freqs.length)))
    const baseFreq = freqs[idx]
    const startTime = this.ctx.currentTime

    this.profile.partials.forEach((part) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(baseFreq * part.ratio, startTime)

      const peakGain = part.gain * Math.min(1, intensity) * volume * 0.5
      gain.gain.setValueAtTime(0.0001, startTime)
      gain.gain.exponentialRampToValueAtTime(peakGain, startTime + this.profile.attack)
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + this.profile.duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + this.profile.duration)
    })
  }
}

export default function IndianDomeCloth() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const synthRef = useRef(new IndianChimesSynth())

  // Config State
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [isPlaying, setIsPlaying] = useState(true)

  // Simulation references
  const configRef = useRef(config)
  configRef.current = config
  const isPlayingRef = useRef(isPlaying)
  isPlayingRef.current = isPlaying

  const simRef = useRef({
    particles: [],
    constraints: [],
    charCanvases: {},
    canvasW: 1332,
    canvasH: 1308,
    originX: 420,
    originY: 420,
    dpr: 1,
    rafId: null,
  })

  // Initialize or Rebuild Simulation
  const initSimulation = useCallback((overrideConfig = null) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const curConfig = overrideConfig || configRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const STRINGS_PAD = 420
    const width = curConfig.width
    const height = curConfig.height
    const gridW = curConfig.gridW
    const gridH = curConfig.gridH

    const canvasW = width + STRINGS_PAD * 2
    const canvasH = height + STRINGS_PAD * 2

    canvas.width = Math.round(canvasW * dpr)
    canvas.height = Math.round(canvasH * dpr)
    canvas.style.width = `${canvasW}px`
    canvas.style.height = `${canvasH}px`

    const cellWidth = width / (gridW - 1)
    const cellHeight = height / (gridH - 1)
    const fontSize = Math.max(9, Math.min(14, cellHeight * 0.95))
    const roofClearance = Math.ceil(fontSize * 0.7)
    const originX = STRINGS_PAD
    const originY = STRINGS_PAD + roofClearance

    const fullCode = INDIA_CLOTH_TEXT
    const writing = 'horizontal'
    const dense = true

    // Pre-rendered offscreen character canvases
    const charCanvases = {}
    for (const ch of new Set(graphemesOf(fullCode, dense))) {
      if (ch === ' ' || ch === '　') continue
      const size = Math.ceil(fontSize * 1.35)
      const off = document.createElement('canvas')
      off.width = Math.ceil(size * dpr)
      off.height = Math.ceil(size * dpr)
      off._size = size
      const octx = off.getContext('2d')
      octx.setTransform(dpr, 0, 0, dpr, 0, 0)
      octx.font = `600 ${fontSize}px "Noto Sans Devanagari", "Kohinoor Devanagari", "Noto Serif Devanagari", "JetBrains Mono", serif`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#3a2d2a'
      octx.fillText(ch, size / 2, size / 2)
      charCanvases[ch] = off
    }

    // Initialize Particles Grid
    const particles = []
    const constraints = []

    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const x = i * cellWidth
        const y = j * cellHeight
        const id = getPointID(j, i, gridH)
        const pinned = j === 0
        const char = charForCell(fullCode, i, j, gridW, gridH, writing, dense)
        particles.push(new Particle({ x, y, pinned, id, char }))
      }
    }

    // Initialize Constraints
    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const id = getPointID(j, i, gridH)
        const p = particles[id]

        if (j < gridH - 1) {
          const bottomP = particles[getPointID(j + 1, i, gridH)]
          const constraint = new Constraint({
            p1: p,
            p2: bottomP,
            length: cellHeight,
            id: id + gridW * gridH,
            compressFactor: curConfig.compressFactor,
            stretchFactor: curConfig.stretchFactor,
          })
          constraints.push(constraint)
          p.downConstraint = constraint
        }

        if (i < gridW - 1) {
          const rightP = particles[getPointID(j, i + 1, gridH)]
          constraints.push(
            new Constraint({
              p1: p,
              p2: rightP,
              length: cellWidth,
              id: id + gridW * gridH * 2,
              compressFactor: 0.6,
              stretchFactor: 4.0,
              isSpacer: true,
            })
          )
        }
      }
    }

    simRef.current = {
      particles,
      constraints,
      charCanvases,
      canvasW,
      canvasH,
      originX,
      originY,
      dpr,
      rafId: simRef.current.rafId,
    }
  }, [])

  // Control handlers
  const handleConfigChange = (key, value) => {
    setConfig((prev) => {
      const next = { ...prev, [key]: value }
      configRef.current = next

      // Live constraint updates
      if (key === 'compressFactor' || key === 'stretchFactor') {
        simRef.current.constraints.forEach((c) => {
          c.updateFactors(next.compressFactor, next.stretchFactor)
        })
      }
      return next
    })
  }

  const handleTogglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev
      isPlayingRef.current = next
      return next
    })
  }

  const handleRebuildCloth = () => {
    initSimulation()
  }

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG)
    configRef.current = DEFAULT_CONFIG
    initSimulation(DEFAULT_CONFIG)
  }

  useEffect(() => {
    initSimulation()
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const mousePos = new Vec2()
    const grabRadius = 24
    let grabbedParticle = null

    const localPoint = (e) => {
      const sim = simRef.current
      const rect = canvas.getBoundingClientRect()
      return {
        x: ((e.clientX - rect.left) / rect.width) * sim.canvasW - sim.originX,
        y: ((e.clientY - rect.top) / rect.height) * sim.canvasH - sim.originY,
      }
    }

    const onPointerDown = (e) => {
      if (synthRef.current) synthRef.current.init()
      const { x, y } = localPoint(e)
      mousePos.reset(x, y)
      const sim = simRef.current
      for (const p of sim.particles) {
        if (mousePos.subtractNew(p.pos).length < grabRadius) {
          grabbedParticle = p
          grabbedParticle.originalPinnedState = grabbedParticle.pinned
          grabbedParticle.pinned = true
          if (synthRef.current) {
            synthRef.current.strike(
              p.pos.x / configRef.current.width,
              0.8,
              configRef.current.chimeVolume,
              configRef.current.chimes
            )
          }
          break
        }
      }
    }

    const onPointerUp = () => {
      if (grabbedParticle) {
        grabbedParticle.pinned = grabbedParticle.originalPinnedState
        grabbedParticle = null
      }
    }

    const onPointerMove = (e) => {
      const { x, y } = localPoint(e)
      mousePos.reset(x, y)

      if (grabbedParticle) {
        grabbedParticle.pos.reset(x, y)
        grabbedParticle.oldPos.reset(x, y)
      }

      const sim = simRef.current
      const curConfig = configRef.current
      let disturbed = false
      let colHit = 0.5

      for (const p of sim.particles) {
        const diff = mousePos.subtractNew(p.pos)
        const ls = diff.lengthSquared
        if (ls < curConfig.mouseSize) {
          const a = diff.angle - Math.PI
          const strength = (smoothstep(curConfig.mouseSize, -2000, ls) * curConfig.mouseStrength) / 300
          p.applyForce(new Vec2(Math.cos(a) * strength, Math.sin(a) * strength))
          disturbed = true
          colHit = p.pos.x / curConfig.width
        }
      }

      if (disturbed && synthRef.current) {
        synthRef.current.strike(colHit, 0.45, curConfig.chimeVolume, curConfig.chimes)
      }
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)

    const drawCode = () => {
      const sim = simRef.current
      const dpr = sim.dpr
      sim.particles.forEach((p) => {
        if (!p.char || p.char === ' ' || p.char === '　') return
        const img = sim.charCanvases[p.char]
        if (!img) return

        const size = img._size
        const half = size / 2
        const x = p.pos.x + sim.originX
        const y = p.pos.y + sim.originY

        ctx.setTransform(dpr, 0, 0, dpr, x * dpr, y * dpr)
        ctx.drawImage(img, -half, -half, size, size)
      })
    }

    let lastDelta = performance.now()
    const runloop = (delta) => {
      simRef.current.rafId = requestAnimationFrame(runloop)
      const dt = Math.min(32, Math.max(1, delta - lastDelta))
      lastDelta = delta

      const sim = simRef.current
      const curConfig = configRef.current

      ctx.setTransform(sim.dpr, 0, 0, sim.dpr, 0, 0)
      ctx.clearRect(0, 0, sim.canvasW, sim.canvasH)

      if (isPlayingRef.current) {
        sim.particles.forEach((p) => p.update(dt, curConfig.damping, curConfig.gravity))
        for (let i = 0; i < curConfig.iterationsPerFrame; i++) {
          for (let j = 0; j < sim.constraints.length; j++) {
            sim.constraints[j].solve()
          }
        }
      }

      drawCode()
    }

    simRef.current.rafId = requestAnimationFrame(runloop)

    return () => {
      cancelAnimationFrame(simRef.current.rafId)
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [initSimulation])

  return (
    <>
      {/* Floating Interactive Control Panel */}
      <ChimesControlPanel
        config={config}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onConfigChange={handleConfigChange}
        onRebuildCloth={handleRebuildCloth}
        onReset={handleReset}
      />

      {/* Main Indian Architectural Dome Stage & Dynamic Cloth Area */}
      <div ref={containerRef} className={styles.stage} data-country="india">
        {/* Fixed Center Indian Architectural Dome (Anchored to screen center independently of cloth width) */}
        <div className={styles.roof}>
          <img
            src="/roof-india.png"
            alt="Indian Architectural Dome"
            className={styles.roofImg}
            draggable="false"
          />
        </div>

        {/* Dynamic Cloth Area & Physics Canvas (Expands symmetrically under the fixed dome) */}
        <div
          className={styles.area}
          style={{
            '--area-w': `${config.width}px`,
            '--area-h': `${config.height}px`,
          }}
        >
          <div className={styles.strings}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
        </div>
      </div>
    </>
  )
}
