import { useTheme } from '../context/ThemeContext'

export default function DarkModeButton() {
  const { dark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: dark ? 'var(--terracotta)' : 'var(--terracotta-pale)',
        border: '1.5px solid var(--input-border)',
        borderRadius: '100px',
        padding: '7px 14px 7px 10px',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'var(--terracotta-light)' : 'var(--divider)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'var(--terracotta)' : 'var(--terracotta-pale)'}
    >
      {/* Toggle track */}
      <div style={{
        width: '36px',
        height: '20px',
        borderRadius: '100px',
        background: dark ? 'var(--terracotta-pale)' : 'var(--white)',
        position: 'relative',
        transition: 'background 0.3s',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '3px',
          left: dark ? '17px' : '3px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: dark ? 'var(--white)' : 'var(--sand)',
          transition: 'left 0.3s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }} />
      </div>

      {/* Icon + label */}
      <span style={{
        fontSize: '13px',
        fontWeight: '600',
        color: dark ? 'var(--btn-primary-text)' : 'var(--ink)',
        fontFamily: 'DM Sans, sans-serif',
        letterSpacing: '0.2px',
        lineHeight: 1,
      }}>
        {dark ? '☀ Light' : '☾ Dark'}
      </span>
    </button>
  )
}