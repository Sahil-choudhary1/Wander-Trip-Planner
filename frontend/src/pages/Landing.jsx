import { useNavigate } from 'react-router-dom'
import DarkModeButton from './DarkModeButton'

const destinations = [
  { city: 'Jaipur', country: 'India', emoji: '🇮🇳', color: '#2d6b6b' },
  { city: 'Paris', country: 'France', emoji: '🇫🇷', color: '#c4622d' },
  { city: 'Tokyo', country: 'Japan', emoji: '🇯🇵', color: '#c9973a' },
  { city: 'Bali', country: 'Indonesia', emoji: '🇮🇩', color: '#2d6b6b' },
]

const features = [
  {
    icon: '✦',
    title: 'AI-Crafted Itineraries',
    desc: "Tell us your dream destination and we'll build the perfect day-by-day plan instantly.",
  },
  {
    icon: '◈',
    title: 'Curated Hotel Picks',
    desc: 'Handpicked accommodations matched to your budget and travel style.',
  },
  {
    icon: '◎',
    title: 'All Your Trips, One Place',
    desc: 'Save, revisit, and share every adventure from your personal travel library.',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand)', overflowX: 'hidden' }}>

      {/* ── Nav ── */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 48px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--divider)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>✈</span>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '22px',
            fontWeight: '700',
            color: 'var(--ink)',
            letterSpacing: '-0.5px',
          }}>Wander</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <DarkModeButton />
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent',
              border: '1.5px solid var(--input-border)',
              color: 'var(--ink)',
              padding: '10px 24px',
              borderRadius: '100px',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'var(--sand-dark)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            Log in
          </button>
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: 'var(--terracotta)',
              border: 'none',
              color: 'var(--btn-primary-text)',
              padding: '10px 24px',
              borderRadius: '100px',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'var(--terracotta-light)'}
            onMouseLeave={e => e.target.style.background = 'var(--terracotta)'}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '96px 24px 72px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--terracotta-pale) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '80px',
          right: '8%',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--teal-pale) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(48px, 8vw, 88px)',
          fontWeight: '700',
          lineHeight: '1.05',
          color: 'var(--ink)',
          marginBottom: '24px',
          maxWidth: '800px',
          letterSpacing: '-2px',
        }}>
          Your next trip,<br />
          <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>perfectly planned.</em>
        </h1>

        <p style={{
          fontSize: '18px',
          color: 'var(--ink-soft)',
          maxWidth: '480px',
          lineHeight: '1.7',
          marginBottom: '48px',
          fontWeight: '300',
        }}>
          Describe your dream destination. Our AI builds a complete itinerary — hotels, activities, timing — in seconds.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: 'var(--ink)',
              color: 'var(--sand)',
              border: 'none',
              padding: '16px 40px',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: 'var(--shadow-sm)',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = 'var(--shadow-md)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'var(--shadow-sm)' }}
          >
            Plan a Trip for Free →
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent',
              color: 'var(--ink-soft)',
              border: '1.5px solid var(--input-border)',
              padding: '16px 40px',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'var(--sand-dark)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            Sign in
          </button>
        </div>
      </section>

      {/* ── Destination Strip ── */}
      <section style={{ padding: '0 24px 80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          maxWidth: '960px',
          width: '100%',
        }}>
          {destinations.map((d) => (
            <div key={d.city} style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--card-border)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{d.emoji}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: '700', color: 'var(--ink)', marginBottom: '4px' }}>{d.city}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-muted)', fontWeight: '400' }}>{d.country}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{
        background: 'var(--ink)',
        borderRadius: '32px',
        margin: '0 24px 80px',
        padding: '72px 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '48px',
      }}>
        {features.map((f) => (
          <div key={f.title}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'var(--divider)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: 'var(--gold)',
              marginBottom: '20px',
            }}>
              {f.icon}
            </div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
              color: 'var(--sand)',
              marginBottom: '12px',
              fontWeight: '700',
            }}>{f.title}</h3>
            <p style={{ fontSize: '15px', color: 'var(--sand)', lineHeight: '1.7', fontWeight: '300' }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section style={{
        textAlign: 'center',
        padding: '48px 24px 96px',
      }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(32px, 5vw, 52px)',
          color: 'var(--ink)',
          marginBottom: '24px',
          letterSpacing: '-1px',
        }}>
          Ready to wander?
        </h2>
        <button
          onClick={() => navigate('/signup')}
          style={{
            background: 'var(--terracotta)',
            color: 'var(--btn-primary-text)',
            border: 'none',
            padding: '18px 48px',
            borderRadius: '100px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            boxShadow: 'var(--shadow-sm)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = 'var(--shadow-md)' }}
          onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'var(--shadow-sm)' }}
        >
          Start Planning — It's Free
        </button>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid var(--divider)',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: 'var(--ink)' }}>✈ Wander</span>
        <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>AI-powered travel planning</span>
      </footer>
    </div>
  )
}