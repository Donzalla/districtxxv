import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const A = {
  solid:   '#8B0000',
  bright:  '#b30000',
  glow:    'rgba(139,0,0,0.4)',
  border:  'rgba(180,0,0,0.4)',
  tagText: '#ff6b6b',
};

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error } = await signIn(email, password);
    if (error) {
      setError('Incorrect email or password. Please try again.');
      setLoading(false);
    } else {
      navigate('/profile');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#000', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        @keyframes auth-fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .auth-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); color: #fff;
          padding: 13px 16px; font-size: 14px; font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.04em; outline: none; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .auth-input:focus { border-color: ${A.border}; }
        .auth-input::placeholder { color: rgba(255,255,255,0.2); }
        .auth-submit-btn {
          width: 100%; padding: 14px;
          background: ${A.solid}; color: #fff; border: none; cursor: pointer;
          font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 0.2em;
          clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          transition: background 0.3s, box-shadow 0.3s;
        }
        .auth-submit-btn:hover:not(:disabled) { background: ${A.bright}; box-shadow: 0 0 24px ${A.glow}; }
        .auth-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div style={{ width: '100%', maxWidth: '420px', animation: 'auth-fadeUp 0.5s ease both' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '0.2em', color: '#fff' }}>
              District XXV
            </span>
          </Link>
        </div>

        {/* Card */}
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '40px 36px', background: 'rgba(255,255,255,0.02)' }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '0.1em', color: '#fff', margin: '0 0 6px' }}>
            Welcome Back
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', margin: '0 0 28px' }}>
            Sign in to your account
          </p>

          {error && (
            <div style={{ padding: '12px 14px', marginBottom: '20px', background: 'rgba(139,0,0,0.12)', border: `1px solid ${A.border}`, color: A.tagText, fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>
                Email
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" className="auth-input" required />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                  Password
                </label>
                <Link to="/forgot-password" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  Forgot?
                </Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" className="auth-input" required />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.3)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: A.tagText, textDecoration: 'none', fontWeight: 400 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;