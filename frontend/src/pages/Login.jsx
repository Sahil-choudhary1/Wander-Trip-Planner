// Login.jsx (Apply exact same error box styling to Signup.jsx)
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import { AuthLayout, FormInput, PrimaryButton } from './AuthComponents'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', form)
      login(res.data.user, res.data.token)
      navigate('/my-trips')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    }
    setLoading(false)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Wandr account"
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
            placeholder="Your password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div style={{ paddingTop: '8px' }}>
          <PrimaryButton type="submit" disabled={loading} loading={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </PrimaryButton>
        </div>
      </form>

      <div style={{
        textAlign: 'center',
        marginTop: '28px',
        paddingTop: '24px',
        borderTop: '1px solid var(--divider)',
        fontSize: '14px',
        color: 'var(--ink-muted)',
      }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--terracotta)', fontWeight: '600', textDecoration: 'none' }}>
          Sign up free
        </Link>
      </div>
    </AuthLayout>
  )
}