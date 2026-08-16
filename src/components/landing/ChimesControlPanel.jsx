import React, { useState } from 'react'
import styles from './ChimesControlPanel.module.css'

export default function ChimesControlPanel({
  config,
  isPlaying,
  onTogglePlay,
  onConfigChange,
  onRebuildCloth,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('cloth') // 'cloth' | 'motion' | 'sound'

  return (
    <div className={styles.panelContainer}>
      {/* Floating Toggle Button */}
      <button
        type="button"
        className={`${styles.toggleBtn} ${isOpen ? styles.activeToggle : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle Cloth Interaction Controls"
      >
        <span className={styles.gearIcon}>✦</span>
        <span className={styles.toggleLabel}>{isOpen ? 'Close' : 'Controls'}</span>
      </button>

      {/* Floating Control Card */}
      {isOpen && (
        <aside className={styles.controlCard} role="region" aria-label="Cloth Controls">
          {/* Header */}
          <div className={styles.cardHeader}>
            <div className={styles.headerTitle}>
              <span className={styles.headerDot} />
              <span>Cloth Simulation</span>
            </div>
            {/* Play/Pause Button */}
            <button
              type="button"
              className={`${styles.playBtn} ${isPlaying ? styles.isPlaying : styles.isPaused}`}
              onClick={onTogglePlay}
              title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
          </div>

          {/* Tabs Navigation */}
          <nav className={styles.tabNav} aria-label="Control Tabs">
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'cloth' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('cloth')}
            >
              Cloth
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'motion' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('motion')}
            >
              Motion
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'sound' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('sound')}
            >
              Sound
            </button>
          </nav>

          {/* Tab 1: Cloth Structure */}
          {activeTab === 'cloth' && (
            <div className={styles.tabContent}>
              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="cloth-width">Width</label>
                  <span className={styles.valueDisplay}>{config.width}px</span>
                </div>
                <input
                  id="cloth-width"
                  type="range"
                  min="240"
                  max="680"
                  step="2"
                  value={config.width}
                  onChange={(e) => onConfigChange('width', parseInt(e.target.value, 10))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="cloth-height">Height</label>
                  <span className={styles.valueDisplay}>{config.height}px</span>
                </div>
                <input
                  id="cloth-height"
                  type="range"
                  min="200"
                  max="620"
                  step="2"
                  value={config.height}
                  onChange={(e) => onConfigChange('height', parseInt(e.target.value, 10))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="cloth-columns">Columns</label>
                  <span className={styles.valueDisplay}>{config.gridW}</span>
                </div>
                <input
                  id="cloth-columns"
                  type="range"
                  min="16"
                  max="60"
                  step="1"
                  value={config.gridW}
                  onChange={(e) => onConfigChange('gridW', parseInt(e.target.value, 10))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="cloth-rows">Rows</label>
                  <span className={styles.valueDisplay}>{config.gridH}</span>
                </div>
                <input
                  id="cloth-rows"
                  type="range"
                  min="16"
                  max="60"
                  step="1"
                  value={config.gridH}
                  onChange={(e) => onConfigChange('gridH', parseInt(e.target.value, 10))}
                  className={styles.rangeSlider}
                />
              </div>

              <button
                type="button"
                className={styles.rebuildBtn}
                onClick={onRebuildCloth}
              >
                ↻ Rebuild Cloth
              </button>
            </div>
          )}

          {/* Tab 2: Motion & Physics */}
          {activeTab === 'motion' && (
            <div className={styles.tabContent}>
              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="motion-gravity">Gravity</label>
                  <span className={styles.valueDisplay}>{config.gravity.toFixed(2)}</span>
                </div>
                <input
                  id="motion-gravity"
                  type="range"
                  min="0.0"
                  max="1.5"
                  step="0.02"
                  value={config.gravity}
                  onChange={(e) => onConfigChange('gravity', parseFloat(e.target.value))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="motion-damping">Damping</label>
                  <span className={styles.valueDisplay}>{config.damping.toFixed(3)}</span>
                </div>
                <input
                  id="motion-damping"
                  type="range"
                  min="0.85"
                  max="1.01"
                  step="0.002"
                  value={config.damping}
                  onChange={(e) => onConfigChange('damping', parseFloat(e.target.value))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="motion-precision">Precision (Solver)</label>
                  <span className={styles.valueDisplay}>{config.iterationsPerFrame}</span>
                </div>
                <input
                  id="motion-precision"
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={config.iterationsPerFrame}
                  onChange={(e) => onConfigChange('iterationsPerFrame', parseInt(e.target.value, 10))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="motion-stretch">Stretch</label>
                  <span className={styles.valueDisplay}>{config.stretchFactor.toFixed(2)}</span>
                </div>
                <input
                  id="motion-stretch"
                  type="range"
                  min="1.0"
                  max="1.8"
                  step="0.02"
                  value={config.stretchFactor}
                  onChange={(e) => onConfigChange('stretchFactor', parseFloat(e.target.value))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="motion-compress">Compress</label>
                  <span className={styles.valueDisplay}>{config.compressFactor.toFixed(2)}</span>
                </div>
                <input
                  id="motion-compress"
                  type="range"
                  min="0.01"
                  max="0.8"
                  step="0.02"
                  value={config.compressFactor}
                  onChange={(e) => onConfigChange('compressFactor', parseFloat(e.target.value))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="motion-touch-radius">Touch Radius</label>
                  <span className={styles.valueDisplay}>{config.mouseSize}</span>
                </div>
                <input
                  id="motion-touch-radius"
                  type="range"
                  min="1000"
                  max="10000"
                  step="200"
                  value={config.mouseSize}
                  onChange={(e) => onConfigChange('mouseSize', parseInt(e.target.value, 10))}
                  className={styles.rangeSlider}
                />
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="motion-touch-force">Touch Force</label>
                  <span className={styles.valueDisplay}>{config.mouseStrength.toFixed(1)}</span>
                </div>
                <input
                  id="motion-touch-force"
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={config.mouseStrength}
                  onChange={(e) => onConfigChange('mouseStrength', parseFloat(e.target.value))}
                  className={styles.rangeSlider}
                />
              </div>
            </div>
          )}

          {/* Tab 3: Sound Controls */}
          {activeTab === 'sound' && (
            <div className={styles.tabContent}>
              <div className={styles.checkboxRow}>
                <input
                  id="sound-chimes-enable"
                  type="checkbox"
                  checked={config.chimes}
                  onChange={(e) => onConfigChange('chimes', e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="sound-chimes-enable" className={styles.checkboxLabel}>
                  Temple Chimes (Web Audio)
                </label>
              </div>

              <div className={styles.controlRow}>
                <div className={styles.labelRow}>
                  <label htmlFor="sound-volume">Chime Volume</label>
                  <span className={styles.valueDisplay}>{Math.round(config.chimeVolume * 100)}%</span>
                </div>
                <input
                  id="sound-volume"
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.02"
                  value={config.chimeVolume}
                  onChange={(e) => onConfigChange('chimeVolume', parseFloat(e.target.value))}
                  className={styles.rangeSlider}
                />
              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  )
}
