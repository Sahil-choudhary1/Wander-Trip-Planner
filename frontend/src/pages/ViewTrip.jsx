import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import DarkModeButton from './DarkModeButton'

function HotelCard({ hotel }) {
  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      border: '1px solid var(--card-border)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h4 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '17px',
          fontWeight: '700',
          color: 'var(--ink)',
        }}>{hotel.name}</h4>
        <div style={{
          background: 'var(--gold-pale)',
          color: 'var(--gold)',
          padding: '4px 10px',
          borderRadius: '100px',
          fontSize: '12px',
          fontWeight: '700',
          flexShrink: 0,
          marginLeft: '12px',
        }}>
          ⭐ {hotel.rating}
        </div>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>📍</span> {hotel.address}
      </p>
      <p style={{ fontSize: '14px', color: 'var(--terracotta)', fontWeight: '600', marginBottom: '10px' }}>
        {hotel.price} / night
      </p>
      <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{hotel.description}</p>
    </div>
  )
}

function PlaceCard({ place, index }) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
      paddingBottom: '20px',
      borderBottom: '1px solid var(--divider)',
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'var(--terracotta-pale)',
        color: 'var(--terracotta)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '700',
        flexShrink: 0,
        fontFamily: 'Playfair Display, serif',
      }}>
        {index + 1}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
          <h5 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '16px',
            fontWeight: '700',
            color: 'var(--ink)',
          }}>{place.name}</h5>
          {place.ticketPrice && (
            <span style={{
              fontSize: '12px',
              color: 'var(--teal)',
              background: 'var(--teal-pale)',
              padding: '3px 10px',
              borderRadius: '100px',
              fontWeight: '600',
              flexShrink: 0,
            }}>
              🎟 {place.ticketPrice}
            </span>
          )}
        </div>
        {place.timing && (
          <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.3px' }}>
            🕐 {place.timing}
          </p>
        )}
        <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{place.details}</p>
      </div>
    </div>
  )
}

export default function ViewTrip() {
  const { id } = useParams()
  const [trip, setTrip] = useState(null)
  const [activeDay, setActiveDay] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/trips/${id}`).then(res => setTrip(res.data))
  }, [id])

  if (!trip) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--sand)',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{ fontSize: '40px', animation: 'pulse 1.5s ease infinite' }}>✈</div>
      <p style={{ color: 'var(--ink-muted)', fontSize: '15px' }}>Loading your trip…</p>
    </div>
  )

  const data = trip.tripData

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand)' }}>

      <div style={{
        background: 'var(--hero-bg)',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--terracotta) 0%, transparent 65%)',
          opacity: 0.15,
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/my-trips')}
            style={{
              background: 'transparent',
              border: '1px solid var(--hero-border)',
              color: 'var(--hero-text)',
              padding: '8px 18px',
              borderRadius: '100px',
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'var(--glass-hover)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            ← My Trips
          </button>
          <DarkModeButton />
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: '700',
            color: 'var(--hero-text)',
            marginBottom: '12px',
            letterSpacing: '-1px',
          }}>
            {data.destination}
          </h1>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: 'var(--hero-text-muted)', fontSize: '15px' }}>📅 {data.duration}</span>
            <span style={{ color: 'var(--hero-border)', fontSize: '12px' }}>•</span>
            <span style={{ color: 'var(--hero-text-muted)', fontSize: '15px' }}>💳 {data.budget} budget</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--ink)',
              color: 'var(--sand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>🏨</div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '26px',
              fontWeight: '700',
              color: 'var(--ink)',
            }}>Hotel Options</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {data.hotels?.map((hotel, i) => (
              <HotelCard key={i} hotel={hotel} />
            ))}
          </div>
        </section>

        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--ink)',
              color: 'var(--sand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>🗓</div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '26px',
              fontWeight: '700',
              color: 'var(--ink)',
            }}>Day-by-Day Itinerary</h2>
          </div>

          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}>
            {data.itinerary?.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '100px',
                  border: activeDay === i ? '2px solid var(--terracotta)' : '1.5px solid var(--input-border)',
                  background: activeDay === i ? 'var(--terracotta)' : 'var(--white)',
                  color: activeDay === i ? 'var(--btn-primary-text)' : 'var(--ink-soft)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          {data.itinerary?.[activeDay] && (
            <div style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--card-border)',
            }}>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--terracotta)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Day {data.itinerary[activeDay].day}
                </div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '22px',
                  fontWeight: '700',
                  color: 'var(--ink)',
                }}>
                  {data.itinerary[activeDay].theme}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.itinerary[activeDay].places?.map((place, j) => (
                  <PlaceCard key={j} place={place} index={j} />
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button
              onClick={() => setActiveDay(d => Math.max(0, d - 1))}
              disabled={activeDay === 0}
              style={{
                background: 'var(--white)',
                border: '1.5px solid var(--input-border)',
                color: activeDay === 0 ? 'var(--ink-muted)' : 'var(--ink)',
                padding: '12px 24px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: activeDay === 0 ? 'not-allowed' : 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                opacity: activeDay === 0 ? 0.4 : 1,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (activeDay !== 0) e.target.style.background = 'var(--sand)' }}
              onMouseLeave={e => e.target.style.background = 'var(--white)'}
            >
              ← Previous Day
            </button>
            <button
              onClick={() => setActiveDay(d => Math.min((data.itinerary?.length || 1) - 1, d + 1))}
              disabled={activeDay === (data.itinerary?.length || 1) - 1}
              style={{
                background: 'var(--ink)',
                border: 'none',
                color: 'var(--sand)',
                padding: '12px 24px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: activeDay === (data.itinerary?.length || 1) - 1 ? 'not-allowed' : 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                opacity: activeDay === (data.itinerary?.length || 1) - 1 ? 0.4 : 1,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (activeDay !== (data.itinerary?.length || 1) - 1) e.target.style.background = 'var(--ink-soft)' }}
              onMouseLeave={e => e.target.style.background = 'var(--ink)'}
            >
              Next Day →
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}