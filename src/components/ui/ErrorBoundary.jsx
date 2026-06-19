import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an exception:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          color: '#F5F0E8',
          fontFamily: "'Space Grotesk', sans-serif",
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(232, 71, 42, 0.05)',
            border: '1px solid #E8472A',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 20px rgba(232, 71, 42, 0.1)'
          }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '20px' }}>⚠️</span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Safety Override Initiated
            </h1>
            <p style={{ color: '#8A8474', lineHeight: '1.6', fontSize: '1rem', marginBottom: '24px' }}>
              An unexpected runtime exception was intercepted within the UI component tree. The application root has been preserved.
            </p>
            
            <div style={{
              backgroundColor: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'left',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.85rem',
              color: '#00FF41',
              overflowX: 'auto',
              marginBottom: '32px',
              maxHeight: '150px'
            }}>
              <span style={{ color: '#E8472A' }}>[EXC_TRACE]:</span> {this.state.error?.toString() || 'Unknown Exception'}
            </div>

            <button
              onClick={this.handleReset}
              style={{
                background: '#E8472A',
                border: 'none',
                borderRadius: '6px',
                color: '#ffffff',
                padding: '12px 28px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                boxShadow: '0 4px 14px rgba(232, 71, 42, 0.3)'
              }}
              onMouseEnter={(e) => e.target.style.background = '#FF5733'}
              onMouseLeave={(e) => e.target.style.background = '#E8472A'}
            >
              REBOOT EXPERIENCE
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
