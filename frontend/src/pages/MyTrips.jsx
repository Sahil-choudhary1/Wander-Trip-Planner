import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import DarkModeButton from './DarkModeButton'

const budgetColors = {
  Cheap:  { bg: 'var(--teal-pale)', text: 'var(--teal)' },
  Budget: { bg: 'var(--teal-pale)', text: 'var(--teal)' },
  Medium: { bg: 'var(--gold-pale)', text: 'var(--gold)' },
  Luxury: { bg: 'var(--terracotta-pale)', text: 'var(--terracotta)' },
}

const travelersIcons = {
  Solo: '🧍',
  Couple: '👫',
  Family: '👨‍👩‍👧',
  Friends: '👯',
}

export default function MyTrips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/trips')
      .then(res => setTrips(res.data))
      .finally(() => setLoading(false))
  }, [])

  const deleteTrip = async (id) => {
    setDeleting(id)
    await api.delete(`/trips/${id}`)
    setTrips(trips.filter(t => t._id !== id))
    setDeleting(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand)' }}>

      <header style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--divider)',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>✈</span>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--ink)',
          }}>Wander</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DarkModeButton />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 16px',
            background: 'var(--sand)',
            borderRadius: '100px',
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--terracotta)',
              color: 'var(--btn-primary-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '700',
            }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <span style={{ fontSize: '14px', color: 'var(--ink-soft)', fontWeight: '500' }}>
              {user?.name}
            </span>
          </div>

          <button
            onClick={() => { logout(); navigate('/') }}
            style={{
              background: 'transparent',
              border: '1.5px solid var(--input-border)',
              color: 'var(--ink-soft)',
              padding: '8px 20px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'var(--sand)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            Log out
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '36px',
              fontWeight: '700',
              color: 'var(--ink)',
              marginBottom: '6px',
              letterSpacing: '-0.5px',
            }}>My Trips</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '15px' }}>
              {trips.length} {trips.length === 1 ? 'adventure' : 'adventures'} planned
            </p>
          </div>
          <button
            onClick={() => navigate('/create-trip')}
            style={{
              background: 'var(--terracotta)',
              color: 'var(--btn-primary-text)',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span> New Trip
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-muted)', fontSize: '15px' }}>
            Loading your trips…
          </div>
        )}

        {!loading && trips.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            border: '2px dashed var(--input-border)',
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🗺</div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '24px',
              color: 'var(--ink)',
              marginBottom: '10px',
            }}>No trips yet</h3>
            <p style={{ color: 'var(--ink-muted)', marginBottom: '28px', fontSize: '15px' }}>
              Let AI plan your perfect getaway — it only takes a few seconds.
            </p>
            <button
              onClick={() => navigate('/create-trip')}
              style={{
                background: 'var(--ink)',
                color: 'var(--sand)',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '100px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Plan Your First Trip
            </button>
          </div>
        )}

        {!loading && trips.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '20px',
          }}>
            {trips.map(trip => {
              const budgetStyle = budgetColors[trip.budget] || budgetColors['Medium']
              const travelerIcon = travelersIcons[trip.travelers] || '✈'
              return (
                <div
                  key={trip._id}
                  style={{
                    background: 'var(--white)',
                    borderRadius: 'var(--radius)',
                    padding: '28px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--card-border)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h3 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '20px',
                        fontWeight: '700',
                        color: 'var(--ink)',
                        lineHeight: '1.2',
                      }}>{trip.destination}</h3>
                      <span style={{ fontSize: '22px' }}>{travelerIcon}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--ink-muted)',
                        background: 'var(--sand)',
                        padding: '4px 10px',
                        borderRadius: '100px',
                      }}>
                        {trip.days} {trip.days === 1 ? 'day' : 'days'}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: budgetStyle.text,
                        background: budgetStyle.bg,
                        padding: '4px 10px',
                        borderRadius: '100px',
                      }}>
                        {trip.budget}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--ink-muted)',
                        background: 'var(--sand)',
                        padding: '4px 10px',
                        borderRadius: '100px',
                      }}>
                        {trip.travelers}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <button
                      onClick={() => navigate(`/view-trip/${trip._id}`)}
                      style={{
                        flex: 1,
                        background: 'var(--ink)',
                        color: 'var(--sand)',
                        border: 'none',
                        padding: '11px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.background = 'var(--ink-soft)'}
                      onMouseLeave={e => e.target.style.background = 'var(--ink)'}
                    >
                      View Trip →
                    </button>
                    <button
                      onClick={() => deleteTrip(trip._id)}
                      disabled={deleting === trip._id}
                      style={{
                        background: 'var(--danger-bg)',
                        border: '1.5px solid var(--danger-border)',
                        color: 'var(--danger-text)',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        cursor: deleting === trip._id ? 'not-allowed' : 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'background 0.2s',
                        opacity: deleting === trip._id ? 0.5 : 1,
                      }}
                      onMouseEnter={e => { if (deleting !== trip._id) e.target.style.background = 'var(--danger-hover)' }}
                      onMouseLeave={e => e.target.style.background = 'var(--danger-bg)'}
                    >
                      {deleting === trip._id ? '…' : '🗑'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}