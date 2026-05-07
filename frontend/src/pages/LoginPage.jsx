import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigation, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { loginUser, requestRegistrationOtp, verifyRegistrationOtp } from '../services/AuthService'
import { useAuth } from '../context/AuthContext'

const ROLES = ['USER', 'DELIVERY_AGENT', 'ADMIN']

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ username: '', password: '', email: '', role: 'USER' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setError('')
    setSuccessMsg('')
  }

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      setError('Username and password are required.')
      return
    }
    setLoading(true)
    setError('')
    setSuccessMsg('')
    try {
      if (mode === 'login') {
        const data = await loginUser(form.username, form.password)
        login(data) // store token + update context
        navigate('/') // redirect to dashboard
      } else {
        if (!form.email) { setError('Email is required for registration.'); setLoading(false); return }
        const res = await requestRegistrationOtp(form.username, form.password, form.email, form.role)
        setSuccessMsg(res.message || 'OTP sent to your email!')
        setOtpSent(true)
      }
    } catch (err) {
      const msg = err.response?.data?.error
        || err.response?.data?.message
        || 'Something went wrong. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otpCode) {
      setError('Please enter the OTP.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await verifyRegistrationOtp(form.username, otpCode)
      login(data)
      navigate('/')
    } catch (err) {
      const msg = err.response?.data?.error
        || err.response?.data?.message
        || 'Invalid OTP. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (otpSent) handleVerifyOtp()
      else handleSubmit()
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url(/back.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '24px',
    }}>
      {/* Same font imports as App.jsx */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Exo+2:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(10, 14, 26, 0.90)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '36px 32px',
        boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
        display: 'grid',
        gap: '28px',
        fontFamily: "'Exo 2', 'Segoe UI', sans-serif",
        color: '#F1F5F9',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Navigation size={24} color="#3B82F6" />
          </div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '22px', fontWeight: 900, color: '#fff' }}>
            Trace360
          </div>
          <div style={{ fontSize: '12px', color: '#64748B', letterSpacing: '0.08em' }}>
            Track Smarter. Deliver Faster.
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '12px', padding: '4px', gap: '4px',
        }}>
          {['login', 'register'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { 
                setMode(m); 
                setError(''); 
                setSuccessMsg(''); 
                setOtpSent(false); 
                setOtpCode('');
              }}
              style={{
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: mode === m ? 'rgba(59,130,246,0.22)' : 'transparent',
                color: mode === m ? '#fff' : '#94A3B8',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 160ms ease',
                textTransform: 'capitalize',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'grid', gap: '14px' }}>
          
          {otpSent ? (
            /* OTP Verification Screen */
            <div style={{ display: 'grid', gap: '14px' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <label style={{ fontSize: '13px', color: '#94A3B8' }}>Enter OTP</label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => { setOtpCode(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter 6-digit OTP"
                  style={inputStyle}
                  maxLength={6}
                />
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5', fontSize: '13px' }}>
                  {error}
                </div>
              )}
              {successMsg && !error && (
                <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#86EFAC', fontSize: '13px' }}>
                  {successMsg}
                </div>
              )}

              {/* Verify OTP Submit */}
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                style={{
                  width: '100%', padding: '14px', background: loading ? 'rgba(34,197,94,0.5)' : '#22C55E', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background 160ms ease',
                }}
              >
                {loading ? 'Verifying...' : 'Verify OTP & Register'}
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'none', border: 'none', color: '#94A3B8', fontSize: '14px', cursor: 'pointer', padding: '8px', fontFamily: 'inherit',
                }}
              >
                <ArrowLeft size={16} /> Go Back
              </button>
            </div>
          ) : (
            /* Regular Login/Register Form */
            <>
              {/* Username */}
              <div style={{ display: 'grid', gap: '8px' }}>
                <label style={{ fontSize: '13px', color: '#94A3B8' }}>Username</label>
                <input
                  value={form.username}
                  onChange={handleChange('username')}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. alex_carter"
                  style={inputStyle}
                />
              </div>

              {/* Email - register only */}
              {mode === 'register' && (
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: '#94A3B8' }}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    onKeyDown={handleKeyDown}
                    placeholder="you@example.com"
                    style={inputStyle}
                  />
                </div>
              )}

              {/* Password */}
              <div style={{ display: 'grid', gap: '8px' }}>
                <label style={{ fontSize: '13px', color: '#94A3B8' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange('password')}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    style={{ ...inputStyle, paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%',
                      transform: 'translateY(-50%)', background: 'none',
                      border: 'none', cursor: 'pointer', color: '#64748B',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Role - register only */}
              {mode === 'register' && (
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontSize: '13px', color: '#94A3B8' }}>Role</label>
                  <select
                    value={form.role}
                    onChange={handleChange('role')}
                    style={inputStyle}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Error */}
              {error && (
                <div style={{
                  padding: '12px 14px', borderRadius: '12px',
                  background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
                  color: '#FCA5A5', fontSize: '13px',
                }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  background: loading ? 'rgba(59,130,246,0.5)' : '#3B82F6',
                  color: '#fff', borderRadius: '12px', border: 'none',
                  fontSize: '15px', fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 160ms ease',
                }}
              >
                {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Continue to Verify'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.07)',
  background: 'rgba(255,255,255,0.05)',
  color: '#F1F5F9',
  fontSize: '14px',
  fontFamily: "'Exo 2', 'Segoe UI', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
}