import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import { AuthLayout, FormInput, PrimaryButton } from './AuthComponents'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/register', form)
      login(res.data.user, res.data.token)
      navigate('/my-trips')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start planning your dream trips with AI"
    >
      {error && (
        <div style={{
          background: 'var(--error-bg)',
          border: '1px solid var(--error-border)',
          color: 'var(--error-text)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14px',
          marginBottom: '20px',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink-soft)', display: 'block', marginBottom: '6px', letterSpacing: '0.3px' }}>
            FULL NAME
          </label>
          <FormInput
            type="text"
            placeholder="Jane Doe"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink-soft)', display: 'block', marginBottom: '6px', letterSpacing: '0.3px' }}>
            EMAIL ADDRESS
          </label>
          <FormInput
            type="email"
            placeholder="you@example.com"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink-soft)', display: 'block', marginBottom: '6px', letterSpacing: '0.3px' }}>
            PASSWORD
          </label>
          <FormInput
            type="password"
            placeholder="Choose a strong password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div style={{ paddingTop: '8px' }}>
          <PrimaryButton type="submit" disabled={loading} loading={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </PrimaryButton>
        </div>
      </form>

      <p style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '16px', lineHeight: '1.5' }}>
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>

      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        paddingTop: '20px',
        borderTop: '1px solid var(--divider)',
        fontSize: '14px',
        color: 'var(--ink-muted)',
      }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--terracotta)', fontWeight: '600', textDecoration: 'none' }}>
          Sign in
        </Link>
      </div>
    </AuthLayout>
  )
}
