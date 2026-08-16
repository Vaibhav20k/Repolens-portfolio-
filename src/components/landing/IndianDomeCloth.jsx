import React, { useEffect, useRef } from 'react'
import styles from './IndianDomeCloth.module.css'

// 2D Vector Class
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
  get angle() {
    return Math.atan2(this.y, this.x)
  }
}

// Particle Class matching Chimes Verlet physics
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

// Distance Constraint Class
class Constraint {
  constructor({ p1, p2, length, isSpacer = false, compressFactor = 0.02, stretchFactor = 1.1 }) {
    this.p1 = p1
    this.p2 = p2
    this.length = length
    this.isSpacer = isSpacer
    this.minLength = length * (isSpacer ? 0.6 : compressFactor)
    this.maxLength = length * (isSpacer ? 4.0 : stretchFactor)
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
function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

// Synthesized Indian Temple Bronze Chimes (Web Audio API)
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
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (AudioContextClass) this.ctx = new AudioContextClass()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  strike(colRatio = 0.5, intensity = 0.5) {
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

      const peakGain = part.gain * Math.min(1, intensity) * 0.16
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

// Authentic Indian Devanagari Wisdom Text
const DEVANAGARI_TEXTS = [
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

function getGraphemes(text) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), (s) => s.segment).filter((g) => g.trim() !== '')
  }
  return Array.from(text).filter((g) => g.trim() !== '')
}

export default function IndianDomeCloth() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const synthRef = useRef(new IndianChimesSynth())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Area & Strings Grid configuration matching Chimes
    const AREA_W = 492
    const AREA_H = 468
    const STRINGS_PAD = 420
    const canvasW = AREA_W + STRINGS_PAD * 2
    const canvasH = AREA_H + STRINGS_PAD * 2

    canvas.width = Math.round(canvasW * dpr)
    canvas.height = Math.round(canvasH * dpr)
    canvas.style.width = `${canvasW}px`
    canvas.style.height = `${canvasH}px`

    const gridW = 40
    const gridH = 40
    const cellWidth = AREA_W / (gridW - 1)
    const cellHeight = AREA_H / (gridH - 1)
    const fontSize = Math.max(9, Math.min(14, cellHeight * 0.95))
    const roofClearance = Math.ceil(fontSize * 0.7)
    const originX = STRINGS_PAD
    const originY = STRINGS_PAD + roofClearance

    const graphemes = getGraphemes(DEVANAGARI_TEXTS)

    // Pre-rendered offscreen character canvases for ultra-smooth 60fps
    const charCanvases = {}
    const uniqueChars = new Set(graphemes)
    uniqueChars.forEach((ch) => {
      const size = Math.ceil(fontSize * 1.45)
      const off = document.createElement('canvas')
      off.width = Math.ceil(size * dpr)
      off.height = Math.ceil(size * dpr)
      off._size = size
      const octx = off.getContext('2d')
      octx.setTransform(dpr, 0, 0, dpr, 0, 0)
      octx.font = `600 ${fontSize}px "Noto Sans Devanagari", "JetBrains Mono", serif`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#3a2d2a'
      octx.fillText(ch, size / 2, size / 2)
      charCanvases[ch] = off
    })

    // Particle Grid Initialization with Cascading Initial Drop
    const particles = []
    const constraints = []

    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const x = i * cellWidth
        // Initial cascade wave drop: particles start gathered near top and fall under gravity
        const y = j === 0 ? 0 : Math.min(j * cellHeight * 0.12, 24) + (j * 1.5) + Math.sin(i * 0.45) * 8
        const id = j * gridW + i
        const pinned = j === 0
        const charIdx = (j * gridW + i) % graphemes.length
        const char = graphemes[charIdx] || ' '
        particles.push(new Particle({ x, y, pinned, id, char }))
      }
    }

    // Constraints Setup (Vertical Chains + Lateral Spacers)
    for (let i = 0; i < gridW; i++) {
      for (let j = 0; j < gridH; j++) {
        const id = j * gridW + i
        const p = particles[id]

        if (j < gridH - 1) {
          const bottomP = particles[(j + 1) * gridW + i]
          const constraint = new Constraint({
            p1: p,
            p2: bottomP,
            length: cellHeight,
            compressFactor: 0.02,
            stretchFactor: 1.1,
          })
          constraints.push(constraint)
          p.downConstraint = constraint
        }

        if (i < gridW - 1) {
          const rightP = particles[j * gridW + (i + 1)]
          constraints.push(
            new Constraint({
              p1: p,
              p2: rightP,
              length: cellWidth,
              isSpacer: true,
              compressFactor: 0.6,
              stretchFactor: 4.0,
            })
          )
        }
      }
    }

    // Pointer Interaction Handling
    const mousePos = new Vec2(-999, -999)
    const mouseSize = 5000
    const mouseStrength = 4

    const getLocalPoint = (e) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: ((e.clientX - rect.left) / rect.width) * canvasW - originX,
        y: ((e.clientY - rect.top) / rect.height) * canvasH - originY,
      }
    }

    const onPointerMove = (e) => {
      const { x, y } = getLocalPoint(e)
      mousePos.reset(x, y)

      let disturbed = false
      let nearestRatio = 0.5

      for (const p of particles) {
        if (p.pinned) continue
        const diff = mousePos.subtractNew(p.pos)
        const ls = diff.lengthSquared
        if (ls < mouseSize && ls > 0) {
          const angle = diff.angle - Math.PI
          const strength = (smoothstep(mouseSize, -2000, ls) * mouseStrength) / 300
          p.applyForce(new Vec2(Math.cos(angle) * strength, Math.sin(angle) * strength))
          disturbed = true
          nearestRatio = p.pos.x / AREA_W
        }
      }

      if (disturbed && synthRef.current) {
        synthRef.current.strike(nearestRatio, 0.65)
      }
    }

    const onPointerLeave = () => {
      mousePos.reset(-999, -999)
    }

    const onUserInteraction = () => {
      if (synthRef.current) synthRef.current.init()
    }

    window.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerdown', onUserInteraction, { once: true })

    // Render & Physics Loop
    let rafId
    let lastTime = performance.now()

    const drawParticles = () => {
      particles.forEach((p) => {
        if (!p.char || p.char === ' ' || p.char === '　') return
        const img = charCanvases[p.char]
        if (!img) return

        let cos = 1
        let sin = 0
        const constraint = p.downConstraint
        if (constraint) {
          const dx = constraint.p2.pos.x - constraint.p1.pos.x
          const dy = constraint.p2.pos.y - constraint.p1.pos.y
          const angle = Math.atan2(dy, dx) - Math.PI / 2
          cos = Math.cos(angle)
          sin = Math.sin(angle)
        }

        const size = img._size
        const half = size / 2
        const x = p.pos.x + originX
        const y = p.pos.y + originY

        ctx.setTransform(
          cos * dpr,
          sin * dpr,
          -sin * dpr,
          cos * dpr,
          x * dpr,
          y * dpr
        )
        ctx.drawImage(img, -half, -half, size, size)
      })
    }

    const runLoop = (now) => {
      rafId = requestAnimationFrame(runLoop)
      const dt = Math.min(32, Math.max(1, now - lastTime))
      lastTime = now

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvasW, canvasH)

      particles.forEach((p) => p.update(dt, 0.99, 0.2))

      for (let k = 0; k < 5; k++) {
        for (let i = 0; i < constraints.length; i++) {
          constraints[i].solve()
        }
      }

      drawParticles()
    }

    rafId = requestAnimationFrame(runLoop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onUserInteraction)
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.stage} data-country="india">
      {/* Indian Architectural Dome (Pinned directly above the cloth chains) */}
      <div className={styles.roof}>
        <img
          src="/roof-india.png"
          alt="Indian Architectural Dome"
          className={styles.roofImg}
          draggable="false"
        />
      </div>

      {/* Physics Canvas for Hanging Devanagari Strings Curtain */}
      <div className={styles.clothWrapper}>
        <canvas ref={canvasRef} className={styles.clothCanvas} />
      </div>
    </div>
  )
}
