import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const A = {
  solid:   '#8B0000',
  bright:  '#b30000',
  glow:    'rgba(139,0,0,0.4)',
  border:  'rgba(180,0,0,0.4)',
  tagText: '#ff6b6b',
};

const Profile = () => {
  const { user, signOut, updateProfile, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing]   = useState(false);
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState(null);

  if (!isLoggedIn) return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <style>{`@keyframes auth-fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.4)', animation: 'auth-fadeUp 0.5s ease both' }}>
        You need to be signed in to view this page.
      </p>
      <Link to="/login" style={{
        padding: '12px 32px', background: A.solid, color: '#fff', textDecoration: 'none',
        fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.2em',
      }}>Sign In</Link>
    </div>
  );

  const handleSave = async () => {
    setSaving(true); setError(null);
    const { error } = await updateProfile({ full_name: fullName });
    setSaving(false);
    if (error) { setError(error.message); }
    else { setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 3000); }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const initials = (user?.user_metadata?.full_name || user?.email || 'U')
    .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        @keyframes auth-fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .prof-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); color: #fff;
          padding: 13px 16px; font-size: 14px; font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.04em; outline: none; box-sizing: border-box; transition: border-color 0.2s;
        }
        .prof-input:focus { border-color: ${A.border}; }
        .prof-save-btn {
          padding: 11px 28px; background: ${A.solid}; color: #fff; border: none; cursor: pointer;
          font-family: 'Bebas Neue', sans-serif; font-size: 15px; letter-spacing: 0.18em;
          clip-path: polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
          transition: background 0.3s;
        }
        .prof-save-btn:hover:not(:disabled) { background: ${A.bright}; }
        .prof-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .prof-ghost-btn {
          padding: 11px 28px; background: none; color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.12); cursor: pointer;
          font-family: 'Bebas Neue', sans-serif; font-size: 15px; letter-spacing: 0.18em;
          transition: border-color 0.25s, color 0.25s;
        }
        .prof-ghost-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '48px 40px 32px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase', color: A.tagText, marginBottom: '10px' }}>Account</div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,5vw,60px)', lineHeight: 0.9, color: '#fff', margin: 0 }}>My Profile</h1>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* Avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', animation: 'auth-fadeUp 0.5s ease both' }}>
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${A.solid}, ${A.bright})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px',
            letterSpacing: '0.1em', color: '#fff', flexShrink: 0,
            boxShadow: `0 0 20px ${A.glow}`,
          }}>{initials}</div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.06em', color: '#fff' }}>
              {user?.user_metadata?.full_name || 'District Member'}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>
              {user?.email}
            </div>
          </div>
        </div>

        {/* Personal info card */}
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '28px', background: 'rgba(255,255,255,0.02)', marginBottom: '20px', animation: 'auth-fadeUp 0.5s ease 0.1s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.15em', color: '#fff' }}>Personal Info</span>
            {!editing && (
              <button onClick={() => setEditing(true)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300,
                color: A.tagText, letterSpacing: '0.1em',
                textDecoration: 'underline', textUnderlineOffset: '3px',
              }}>Edit</button>
            )}
          </div>

          {error && (
            <div style={{ padding: '10px 14px', marginBottom: '16px', background: 'rgba(139,0,0,0.12)', border: `1px solid ${A.border}`, color: A.tagText, fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>{error}</div>
          )}
          {saved && (
            <div style={{ padding: '10px 14px', marginBottom: '16px', background: 'rgba(0,100,0,0.12)', border: '1px solid rgba(0,180,0,0.3)', color: '#86efac', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>✓ Profile updated successfully.</div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Full name */}
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px' }}>Full Name</label>
              {editing ? (
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  className="prof-input" placeholder="Your full name" />
              ) : (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.75)', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {user?.user_metadata?.full_name || '—'}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px' }}>Email</label>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.45)', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {user?.email}
                <span style={{ marginLeft: '10px', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>(cannot change)</span>
              </div>
            </div>

            {/* Member since */}
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '8px' }}>Member Since</label>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.45)', padding: '13px 0' }}>
                {new Date(user?.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>

          {editing && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button className="prof-save-btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button className="prof-ghost-btn" onClick={() => { setEditing(false); setFullName(user?.user_metadata?.full_name || ''); }}>
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '28px', background: 'rgba(255,255,255,0.02)', marginBottom: '32px', animation: 'auth-fadeUp 0.5s ease 0.2s both' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.15em', color: '#fff', marginBottom: '20px' }}>Quick Links</div>
          {[
            { label: 'Browse Collections', path: '/collections' },
            { label: 'View Orders',        path: '/orders' },
            { label: 'Size Guide',         path: '/size-guide' },
            { label: 'Contact Support',    path: '/contact' },
          ].map(({ label, path }) => (
            <Link key={path} to={path} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
              textDecoration: 'none', color: 'rgba(255,255,255,0.5)',
              fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              {label}
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <div style={{ animation: 'auth-fadeUp 0.5s ease 0.3s both' }}>
          <button onClick={handleSignOut} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '12px 24px',
            fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
            letterSpacing: '0.08em', transition: 'all 0.25s', width: '100%',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = A.border; e.currentTarget.style.color = A.tagText; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;