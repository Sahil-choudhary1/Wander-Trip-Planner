export function AuthLayout({ children, title, subtitle }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--sand)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-80px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--terracotta-pale) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-60px',
        left: '-60px',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--teal-pale) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--card-border)',
        position: 'relative',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>✈</div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '26px',
            fontWeight: '700',
            color: 'var(--ink)',
            marginBottom: '6px',
          }}>{title}</h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-muted)', fontWeight: '300' }}>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export function FormInput({ type = 'text', placeholder, onChange, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={{
        width: '100%',
        border: '1.5px solid var(--input-border)',
        background: 'var(--sand)',
        padding: '14px 18px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '15px',
        fontFamily: 'DM Sans, sans-serif',
        color: 'var(--ink)',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
      }}
    />
  )
}

export function PrimaryButton({ children, onClick, type = 'button', disabled = false, loading = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        background: disabled ? 'var(--divider)' : 'var(--terracotta)',
        color: disabled ? 'var(--ink-muted)' : 'var(--btn-primary-text)',
        border: 'none',
        padding: '14px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '15px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'DM Sans, sans-serif',
        transition: 'background 0.2s, transform 0.15s',
        letterSpacing: '0.2px',
      }}
      onMouseEnter={e => { if (!disabled) e.target.style.background = 'var(--terracotta-light)' }}
      onMouseLeave={e => { if (!disabled) e.target.style.background = 'var(--terracotta)' }}
    >
      {loading ? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>◌</span>
          {children}
        </span>
      ) : children}
    </button>
  )
}