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

const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  // Success state — ask user to confirm email
  if (success) return (
    <div style={{
      minHeight: '100vh', background: '#000', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
    }}>
      <style>{`@keyframes auth-fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={{ textAlign: 'center', maxWidth: '400px', animation: 'auth-fadeUp 0.5s ease both' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'rgba(139,0,0,0.15)', border: '1px solid rgba(180,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', fontSize: '28px',
        }}>✓</div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '0.1em', marginBottom: '12px' }}>
          Check your email
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '28px' }}>
          We sent a confirmation link to{' '}
          <strong style={{ color: '#fff' }}>{email}</strong>.
          Click it to activate your account then sign in.
        </p>
        <Link to="/login" style={{
          display: 'inline-block', padding: '13px 36px',
          background: '#8B0000', color: '#fff', textDecoration: 'none',
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.2em',
          clippath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
        }}>Go to Login</Link>
      </div>
    </div>
  );

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

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '0.2em', color: '#fff' }}>
              District XXV
            </span>
          </Link>
        </div>

        <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '40px 36px', background: 'rgba(255,255,255,0.02)' }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '0.1em', color: '#fff', margin: '0 0 6px' }}>
            Create Account
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', margin: '0 0 28px' }}>
            Join the District
          </p>

          {error && (
            <div style={{ padding: '12px 14px', marginBottom: '20px', background: 'rgba(139,0,0,0.12)', border: `1px solid ${A.border}`, color: A.tagText, fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Full Name',        type: 'text',     value: fullName,  set: setFullName,  placeholder: 'Your name',    required: true },
              { label: 'Email',            type: 'email',    value: email,     set: setEmail,     placeholder: 'your@email.com', required: true },
              { label: 'Password',         type: 'password', value: password,  set: setPassword,  placeholder: '••••••••',     required: true },
              { label: 'Confirm Password', type: 'password', value: confirm,   set: setConfirm,   placeholder: '••••••••',     required: true },
            ].map(({ label, type, value, set, placeholder }) => (
              <div key={label}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>
                  {label}
                </label>
                <input type={type} value={value} onChange={e => set(e.target.value)}
                  placeholder={placeholder} className="auth-input" required />
              </div>
            ))}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.3)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: A.tagText, textDecoration: 'none', fontWeight: 400 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;