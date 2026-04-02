import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import DarkModeButton from './DarkModeButton'

const budgetOptions = [
  { value: 'Cheap', label: 'Cheap', desc: 'Free stays, local transport, minimal spend', icon: '🪙' },
  { value: 'Budget', label: 'Budget', desc: 'Hostels, street food, free sights', icon: '💰' },
  { value: 'Medium', label: 'Mid-range', desc: 'Hotels, restaurants, popular spots', icon: '💳' },
  { value: 'Luxury', label: 'Luxury', desc: 'Premium stays, fine dining, VIP access', icon: '✦' },
]

const travelerOptions = [
  { value: 'Solo', label: 'Solo', icon: '🧍' },
  { value: 'Couple', label: 'Couple', icon: '👫' },
  { value: 'Family', label: 'Family', icon: '👨‍👩‍👧' },
  { value: 'Friends', label: 'Friends', icon: '👯' },
]

export default function CreateTrip() {
  const [form, setForm] = useState({ destination: '', days: '', budget: 'Medium', travelers: 'Solo' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const aiRes = await api.post('/ai/generate', form)
      const saved = await api.post('/trips', { ...form, tripData: aiRes.data })
      navigate(`/view-trip/${saved.data._id}`)
    } catch (err) {
      alert('Something went wrong. Please check your API key.')
    }
    setLoading(false)
  }

  const isValid = form.destination.trim() && form.days

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <div style={{
        width: '100%',
        maxWidth: '560px',
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <button
          onClick={() => navigate('/my-trips')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--ink-muted)',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--ink)'}
          onMouseLeave={e => e.target.style.color = 'var(--ink-muted)'}
        >
          ← My Trips
        </button>
        <DarkModeButton />
        </div>

        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--terracotta)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
            ✦ AI Trip Planner
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '36px',
            fontWeight: '700',
            color: 'var(--ink)',
            letterSpacing: '-0.5px',
            lineHeight: '1.15',
            marginBottom: '10px',
          }}>
            Where do you want to go?
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: '15px', lineHeight: '1.6' }}>
            Tell us your destination and preferences — we'll do the rest.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-soft)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Destination
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai, India"
              required
              value={form.destination}
              onChange={e => setForm({ ...form, destination: e.target.value })}
              style={{
                width: '100%',
                border: '1.5px solid var(--input-border)',
                background: 'var(--white)',
                padding: '16px 20px',
                borderRadius: 'var(--radius)',
                fontSize: '16px',
                fontFamily: 'DM Sans, sans-serif',
                color: 'var(--ink)',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-soft)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Duration (days)
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[1, 3, 5, 7, 10].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setForm({ ...form, days: String(d) })}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: form.days === String(d) ? '2px solid var(--terracotta)' : '1.5px solid var(--input-border)',
                    background: form.days === String(d) ? 'var(--terracotta-pale)' : 'var(--white)',
                    color: form.days === String(d) ? 'var(--terracotta)' : 'var(--ink-soft)',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif',
                    transition: 'all 0.15s',
                  }}
                >
                  {d}d
                </button>
              ))}
              <input
                type="number"
                min="1"
                max="30"
                placeholder="Custom"
                value={![1,3,5,7,10].includes(Number(form.days)) ? form.days : ''}
                onChange={e => setForm({ ...form, days: e.target.value })}
                style={{
                  width: '90px',
                  border: '1.5px solid var(--input-border)',
                  background: 'var(--white)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px',
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'var(--ink)',
                  textAlign: 'center',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-soft)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Budget
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {budgetOptions.map(b => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setForm({ ...form, budget: b.value })}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius)',
                    border: form.budget === b.value ? '2px solid var(--terracotta)' : '1.5px solid var(--card-border)',
                    background: form.budget === b.value ? 'var(--terracotta-pale)' : 'var(--white)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: form.budget === b.value ? 'var(--terracotta)' : 'var(--ink)', fontFamily: 'DM Sans, sans-serif' }}>{b.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-muted)', fontFamily: 'DM Sans, sans-serif', marginTop: '2px' }}>{b.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-soft)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Traveling as
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {travelerOptions.map(t => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setForm({ ...form, travelers: t.value })}
                  style={{
                    padding: '16px 8px',
                    borderRadius: 'var(--radius)',
                    border: form.travelers === t.value ? '2px solid var(--terracotta)' : '1.5px solid var(--card-border)',
                    background: form.travelers === t.value ? 'var(--terracotta-pale)' : 'var(--white)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{t.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: form.travelers === t.value ? 'var(--terracotta)' : 'var(--ink-soft)', fontFamily: 'DM Sans, sans-serif' }}>
                    {t.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isValid}
            style={{
              background: loading || !isValid ? 'var(--divider)' : 'var(--ink)',
              color: loading || !isValid ? 'var(--ink-muted)' : 'var(--sand)',
              border: 'none',
              padding: '18px',
              borderRadius: 'var(--radius)',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading || !isValid ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.3px',
              transition: 'background 0.2s, transform 0.15s',
              boxShadow: loading || !isValid ? 'none' : 'var(--shadow-md)',
            }}
            onMouseEnter={e => { if (!loading && isValid) e.target.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)' }}
          >
            {loading ? '✨ Crafting your itinerary…' : 'Generate Trip with AI →'}
          </button>
        </form>
      </div>
    </div>
  )
}