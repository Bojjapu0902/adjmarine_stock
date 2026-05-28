import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff, MdLock, MdPerson, MdRestaurant } from 'react-icons/md';

// Credentials
const VALID_USER     = 'sdj';
const VALID_PASSWORD = 'sdj123@';

const Login = ({ onLogin }) => {
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [remember, setRemember]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [shake, setShake]         = useState(false);
  const [fieldErr, setFieldErr]   = useState({ username: false, password: false });

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    const errs = { username: !username.trim(), password: !password.trim() };
    setFieldErr(errs);
    if (errs.username || errs.password) {
      setError('Please fill in all fields.');
      triggerShake();
      return;
    }

    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (username.trim() === VALID_USER && password === VALID_PASSWORD) {
        onLogin({ username: username.trim(), role: 'Operations Manager' });
      } else {
        setLoading(false);
        setError('Invalid username or password. Please try again.');
        setFieldErr({ username: true, password: true });
        triggerShake();
      }
    }, 900);
  };

  const features = [
    { icon: '📦', label: 'Real-time stock tracking' },
    { icon: '📊', label: 'Advanced analytics & reports' },
    { icon: '🛒', label: 'Purchase order management' },
    { icon: '🏭', label: 'Supplier directory' },
    { icon: '🗑️', label: 'Wastage monitoring' },
    { icon: '⚠️', label: 'Smart low-stock alerts' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: '#F1F5F9',
    }}>

      {/* ── Left Brand Panel ──────────────────────────── */}
      <div style={{
        width: '45%',
        background: 'linear-gradient(145deg, #1E1B4B 0%, #312E81 55%, #3730A3 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 52px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
          {/* Orbs */}
          <div style={{
            position: 'absolute', top: -100, left: -100,
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129,140,248,0.12), transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: -80, right: -80,
            width: 350, height: 350, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', top: '40%', right: -40,
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(165,180,252,0.08), transparent 70%)',
          }} />
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 60, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, #818CF8, #4F46E5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
            boxShadow: '0 8px 24px rgba(79,70,229,0.4)',
          }}>
            <MdRestaurant style={{ color: 'white' }} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>
              FoodStock Pro
            </div>
            <div style={{ fontSize: 11, color: 'rgba(199,210,254,0.65)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Inventory Suite
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: 36, fontWeight: 800, color: '#fff',
            lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 18,
          }}>
            Smarter Food{' '}
            <span style={{
              background: 'linear-gradient(90deg, #A5B4FC, #818CF8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Inventory
            </span>
            {' '}Management
          </div>
          <p style={{
            fontSize: 14.5, color: 'rgba(199,210,254,0.7)',
            lineHeight: 1.7, marginBottom: 44, maxWidth: 360,
          }}>
            From kitchen to warehouse — track every item, reduce wastage,
            and keep your operations running at peak efficiency.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {features.map((f) => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {f.icon}
                </div>
                <span style={{ fontSize: 13.5, color: 'rgba(199,210,254,0.85)', fontWeight: 500 }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, position: 'relative', zIndex: 1 }}>
          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />
          <div style={{ fontSize: 11.5, color: 'rgba(199,210,254,0.35)' }}>
            © 2026 FoodStock Pro. Trusted by 1,200+ food businesses worldwide.
          </div>
        </div>
      </div>

      {/* ── Right Login Panel ──────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
        background: '#F8FAFC',
      }}>
        <div
          style={{
            width: '100%', maxWidth: 420,
            animation: shake ? 'shake 0.55s ease' : 'slide-in 0.5s cubic-bezier(0.4,0,0.2,1) both',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              fontSize: 26, fontWeight: 800, color: '#0F172A',
              letterSpacing: '-0.5px', marginBottom: 8,
            }}>
              Welcome back 👋
            </div>
            <div style={{ fontSize: 14, color: '#64748B' }}>
              Sign in to your FoodStock Pro account
            </div>
          </div>

          {/* Demo hint */}
          <div style={{
            background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
            border: '1px solid #C7D2FE',
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🔑</span>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#4338CA', marginBottom: 2 }}>
                Demo Credentials
              </div>
              <div style={{ fontSize: 12, color: '#6366F1' }}>
                Username: <strong>sdj</strong>&nbsp;&nbsp;·&nbsp;&nbsp;Password: <strong>sdj123@</strong>
              </div>
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 10,
              padding: '11px 16px',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              animation: 'fade-in 0.2s ease',
              fontSize: 13,
              color: '#DC2626',
              fontWeight: 500,
            }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div style={{ marginBottom: 18 }}>
              <label style={{
                display: 'block', fontSize: 12.5, fontWeight: 600,
                color: '#475569', marginBottom: 6, letterSpacing: '0.2px',
              }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <MdPerson style={{
                  position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
                  color: fieldErr.username ? '#EF4444' : '#94A3B8', fontSize: 18, pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); setFieldErr((f) => ({ ...f, username: false })); }}
                  placeholder="Enter your username"
                  autoComplete="username"
                  style={{
                    width: '100%', height: 46, border: `1.5px solid ${fieldErr.username ? '#EF4444' : '#E2E8F0'}`,
                    borderRadius: 10, padding: '0 14px 0 42px', fontSize: 14,
                    color: '#0F172A', background: '#fff', outline: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: fieldErr.username ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                  }}
                  onFocus={(e) => {
                    if (!fieldErr.username) e.target.style.borderColor = '#4F46E5';
                    if (!fieldErr.username) e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)';
                  }}
                  onBlur={(e) => {
                    if (!fieldErr.username) e.target.style.borderColor = '#E2E8F0';
                    if (!fieldErr.username) e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{
                  fontSize: 12.5, fontWeight: 600,
                  color: '#475569', letterSpacing: '0.2px',
                }}>
                  Password
                </label>
                <button
                  type="button"
                  style={{
                    fontSize: 12, color: '#4F46E5', background: 'none',
                    border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0,
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <MdLock style={{
                  position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
                  color: fieldErr.password ? '#EF4444' : '#94A3B8', fontSize: 18, pointerEvents: 'none',
                }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); setFieldErr((f) => ({ ...f, password: false })); }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    width: '100%', height: 46, border: `1.5px solid ${fieldErr.password ? '#EF4444' : '#E2E8F0'}`,
                    borderRadius: 10, padding: '0 44px 0 42px', fontSize: 14,
                    color: '#0F172A', background: '#fff', outline: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: fieldErr.password ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                  }}
                  onFocus={(e) => {
                    if (!fieldErr.password) e.target.style.borderColor = '#4F46E5';
                    if (!fieldErr.password) e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)';
                  }}
                  onBlur={(e) => {
                    if (!fieldErr.password) e.target.style.borderColor = '#E2E8F0';
                    if (!fieldErr.password) e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#94A3B8', fontSize: 20, display: 'flex', alignItems: 'center',
                    padding: 4,
                  }}
                  title={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 28 }}>
              <div
                onClick={() => setRemember((r) => !r)}
                style={{
                  width: 18, height: 18, borderRadius: 5, cursor: 'pointer',
                  border: `2px solid ${remember ? '#4F46E5' : '#CBD5E1'}`,
                  background: remember ? '#4F46E5' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.18s ease', flexShrink: 0,
                }}
              >
                {remember && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => setRemember((r) => !r)}
                style={{ fontSize: 13, color: '#64748B', cursor: 'pointer', userSelect: 'none' }}
              >
                Keep me signed in for 30 days
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: 48,
                background: loading
                  ? 'linear-gradient(135deg, #6B7280, #6B7280)'
                  : 'linear-gradient(135deg, #4F46E5, #4338CA)',
                border: 'none', borderRadius: 12,
                color: '#fff', fontSize: 15, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'all 0.2s ease',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(79,70,229,0.35)',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.2px',
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(79,70,229,0.45)'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 16px rgba(79,70,229,0.35)'; }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    style={{ animation: 'spin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Bottom note */}
          <div style={{
            marginTop: 32, paddingTop: 24,
            borderTop: '1px solid #E2E8F0',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 12.5, color: '#94A3B8' }}>
              Protected by enterprise-grade encryption.{' '}
              <span style={{ color: '#4F46E5', fontWeight: 600, cursor: 'pointer' }}>
                Need help?
              </span>
            </div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 20 }}>
              {['Privacy Policy', 'Terms of Service', 'Support'].map((link) => (
                <span key={link} style={{ fontSize: 11.5, color: '#CBD5E1', cursor: 'pointer' }}>
                  {link}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(7px); }
          45%       { transform: translateX(-6px); }
          60%       { transform: translateX(5px); }
          75%       { transform: translateX(-4px); }
          90%       { transform: translateX(3px); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .login-brand-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;
