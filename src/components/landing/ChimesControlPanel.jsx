import React, { useState } from 'react'
import styles from './ChimesControlPanel.module.css'

export default function ChimesControlPanel({
  config,
  isPlaying,
  onTogglePlay,
  onConfigChange,
  onRebuildCloth,
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={styles.wrapper}>
      {/* Play Button - Centered Directly Above Panel */}
      <button
        type="button"
        className={`${styles.playButton} ${isPlaying ? styles.playActive : ''}`}
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Main Technical Parchment Control Panel */}
      <div className={styles.panel}>
        {/* Toggle / Minimize Header Tab */}
        <div className={styles.panelHeader} onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
          <span className={styles.panelTitle}>CONTROL PANE</span>
          <span className={styles.collapseIndicator}>{isOpen ? '–' : '+'}</span>
        </div>

        {isOpen && (
          <div className={styles.panelBody}>
            {/* SECTION 1: DESTINATION */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>DESTINATION</div>
              <div className={styles.controlRow}>
                <span className={styles.rowLabel}>Country</span>
                <div className={styles.staticValueBox}>India</div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* SECTION 2: CLOTH */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>CLOTH</div>

              {/* Width */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-width" className={styles.rowLabel}>Width</label>
                <input
                  id="ctrl-width"
                  type="range"
                  min="240"
                  max="680"
                  step="2"
                  value={config.width}
                  onChange={(e) => onConfigChange('width', parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.width}</span>
              </div>

              {/* Height */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-height" className={styles.rowLabel}>Height</label>
                <input
                  id="ctrl-height"
                  type="range"
                  min="200"
                  max="620"
                  step="2"
                  value={config.height}
                  onChange={(e) => onConfigChange('height', parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.height}</span>
              </div>

              {/* Columns */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-columns" className={styles.rowLabel}>Columns</label>
                <input
                  id="ctrl-columns"
                  type="range"
                  min="16"
                  max="60"
                  step="1"
                  value={config.gridW}
                  onChange={(e) => onConfigChange('gridW', parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.gridW}</span>
              </div>

              {/* Rows */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-rows" className={styles.rowLabel}>Rows</label>
                <input
                  id="ctrl-rows"
                  type="range"
                  min="16"
                  max="60"
                  step="1"
                  value={config.gridH}
                  onChange={(e) => onConfigChange('gridH', parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.gridH}</span>
              </div>

              {/* Rebuild Cloth Button */}
              <button
                type="button"
                className={styles.rebuildButton}
                onClick={onRebuildCloth}
              >
                Rebuild cloth
              </button>
            </div>

            <div className={styles.divider} />

            {/* SECTION 3: MOTION & SOUND */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>MOTION & SOUND</div>

              {/* Gravity */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-gravity" className={styles.rowLabel}>Gravity</label>
                <input
                  id="ctrl-gravity"
                  type="range"
                  min="0.0"
                  max="1.5"
                  step="0.02"
                  value={config.gravity}
                  onChange={(e) => onConfigChange('gravity', parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.gravity.toFixed(2)}</span>
              </div>

              {/* Damping */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-damping" className={styles.rowLabel}>Damping</label>
                <input
                  id="ctrl-damping"
                  type="range"
                  min="0.85"
                  max="1.01"
                  step="0.002"
                  value={config.damping}
                  onChange={(e) => onConfigChange('damping', parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.damping.toFixed(3)}</span>
              </div>

              {/* Precision */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-precision" className={styles.rowLabel}>Precision</label>
                <input
                  id="ctrl-precision"
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={config.iterationsPerFrame}
                  onChange={(e) => onConfigChange('iterationsPerFrame', parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.iterationsPerFrame}</span>
              </div>

              {/* Stretch */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-stretch" className={styles.rowLabel}>Stretch</label>
                <input
                  id="ctrl-stretch"
                  type="range"
                  min="1.0"
                  max="1.8"
                  step="0.02"
                  value={config.stretchFactor}
                  onChange={(e) => onConfigChange('stretchFactor', parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.stretchFactor.toFixed(2)}</span>
              </div>

              {/* Compress */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-compress" className={styles.rowLabel}>Compress</label>
                <input
                  id="ctrl-compress"
                  type="range"
                  min="0.01"
                  max="0.8"
                  step="0.02"
                  value={config.compressFactor}
                  onChange={(e) => onConfigChange('compressFactor', parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.compressFactor.toFixed(2)}</span>
              </div>

              {/* Touch radius */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-radius" className={styles.rowLabel}>Touch radius</label>
                <input
                  id="ctrl-radius"
                  type="range"
                  min="1000"
                  max="10000"
                  step="200"
                  value={config.mouseSize}
                  onChange={(e) => onConfigChange('mouseSize', parseInt(e.target.value, 10))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.mouseSize}</span>
              </div>

              {/* Touch force */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-force" className={styles.rowLabel}>Touch force</label>
                <input
                  id="ctrl-force"
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={config.mouseStrength}
                  onChange={(e) => onConfigChange('mouseStrength', parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.mouseStrength.toFixed(1)}</span>
              </div>

              {/* Door chimes checkbox */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-chimes" className={styles.rowLabel}>Door chimes</label>
                <div className={styles.checkboxContainer}>
                  <input
                    id="ctrl-chimes"
                    type="checkbox"
                    checked={config.chimes}
                    onChange={(e) => onConfigChange('chimes', e.target.checked)}
                    className={styles.squareCheckbox}
                  />
                </div>
              </div>

              {/* Chime volume */}
              <div className={styles.controlRow}>
                <label htmlFor="ctrl-volume" className={styles.rowLabel}>Chime volume</label>
                <input
                  id="ctrl-volume"
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.02"
                  value={config.chimeVolume}
                  onChange={(e) => onConfigChange('chimeVolume', parseFloat(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.valueBox}>{config.chimeVolume.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
