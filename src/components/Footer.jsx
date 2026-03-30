import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/Vanpparel_App_Icon.jpg';

const A = {
  solid:      '#8B0000',
  bright:     '#b30000',
  glow:       'rgba(139,0,0,0.4)',
  border:     'rgba(180,0,0,0.4)',
  borderSoft: 'rgba(139,0,0,0.2)',
  tagText:    '#ff6b6b',
};

// ─── SOCIAL ICONS ─────────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
  </svg>
);

const SOCIALS = [
  { label: 'Instagram', icon: <InstagramIcon />, href: 'https://instagram.com' },
  { label: 'TikTok',    icon: <TikTokIcon />,    href: 'https://tiktok.com' },
  { label: 'YouTube',   icon: <YouTubeIcon />,   href: 'https://youtube.com' },
];

const SHOP_LINKS = [
  { label: 'Dropped',     path: '/collections?category=Dropped' },
  { label: 'Kicks',       path: '/collections?category=Kicks' },
  { label: 'Apparel',     path: '/collections?category=Apparel' },
  { label: 'Accessories', path: '/collections?category=Accessories' },
  { label: 'Gift Card',   path: '/gift-card' },
];

const HELP_LINKS = [
  { label: 'FAQ',             path: '/faq' },
  { label: 'Shipping Policy', path: '/shipping' },
  { label: 'Returns',         path: '/returns' },
  { label: 'Size Guide',      path: '/size-guide' },
  { label: 'Contact Us',      path: '/contact' },
];

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]   = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    // TODO: wire up to Supabase newsletter table or email provider
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer style={{
      background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      color: '#fff',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

        .ft-link {
          color: rgba(255,255,255,0.35); text-decoration: none;
          font-size: 13px; font-weight: 300; letter-spacing: 0.04em;
          transition: color 0.2s; display: block; padding: 4px 0;
        }
        .ft-link:hover { color: rgba(255,255,255,0.85); }

        .ft-social-btn {
          width: 40px; height: 40px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
          background: none; cursor: pointer; color: rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.25s, color 0.25s, box-shadow 0.25s;
          text-decoration: none;
        }
        .ft-social-btn:hover {
          border-color: ${A.border};
          color: #fff;
          box-shadow: 0 0 12px ${A.glow};
        }

        .ft-newsletter-input {
          flex: 1; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-right: none; color: #fff;
          padding: 12px 16px; font-size: 13px;
          font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em;
          outline: none; transition: border-color 0.2s;
          min-width: 0;
        }
        .ft-newsletter-input::placeholder { color: rgba(255,255,255,0.2); }

        .ft-newsletter-btn {
          padding: 12px 20px; background: ${A.solid}; color: #fff;
          border: none; cursor: pointer;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px; letter-spacing: 0.18em;
          white-space: nowrap; transition: background 0.3s;
          flex-shrink: 0;
        }
        .ft-newsletter-btn:hover { background: ${A.bright}; }
      `}</style>

      {/* Main footer grid */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '64px 40px 40px',
        display: 'grid',
        gridTemplateColumns: '1.8fr 1fr 1fr 1.6fr',
        gap: '48px',
      }}>

        {/* Col 1 — Brand + socials + contact */}
        <div>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '20px' }}>
            <img src={logoImg} alt="District XXV" style={{
              height: '42px', width: '42px', objectFit: 'cover',
              borderRadius: '10px', border: '1px solid rgba(180,0,0,0.4)',
              boxShadow: '0 0 12px rgba(139,0,0,0.5)',
            }} />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '20px', letterSpacing: '0.2em', color: '#fff',
            }}>District XXV</span>
          </Link>

          <p style={{
            fontSize: '13px', fontWeight: 300, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.35)', maxWidth: '260px', marginBottom: '28px',
          }}>
            Precision-cut streetwear for those who move at the edge of culture.
            Limited drops. No restocks.
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="ft-social-btn" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.22em', textTransform: 'uppercase', color: A.tagText, marginBottom: '4px' }}>Contact</div>
            <a href="mailto:hello@districtxxv.com" className="ft-link">hello@districtxxv.com</a>
            <span style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>Mon–Fri, 9am–6pm EAT</span>
          </div>
        </div>

        {/* Col 2 — Shop */}
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px',
            letterSpacing: '0.2em', color: '#fff', marginBottom: '20px',
          }}>Shop</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SHOP_LINKS.map(l => (
              <Link key={l.path} to={l.path} className="ft-link">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Col 3 — Help */}
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px',
            letterSpacing: '0.2em', color: '#fff', marginBottom: '20px',
          }}>Help</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {HELP_LINKS.map(l => (
              <Link key={l.path} to={l.path} className="ft-link">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Col 4 — Newsletter */}
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px',
            letterSpacing: '0.2em', color: '#fff', marginBottom: '8px',
          }}>Stay in the loop</div>
          <p style={{
            fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.6, marginBottom: '20px',
          }}>
            Be first to know about new drops, restocks and exclusive offers.
          </p>

          {submitted ? (
            <div style={{
              padding: '14px 16px',
              border: `1px solid ${A.borderSoft}`,
              background: 'rgba(139,0,0,0.08)',
              color: A.tagText,
              fontSize: '13px', fontWeight: 300, letterSpacing: '0.06em',
            }}>
              ✓ You're on the list.
            </div>
          ) : (
            <form onSubmit={handleNewsletter} style={{ display: 'flex' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="your@email.com"
                className="ft-newsletter-input"
                style={{ borderColor: focused ? A.border : 'rgba(255,255,255,0.1)' }}
                required
              />
              <button type="submit" className="ft-newsletter-btn">Join</button>
            </form>
          )}

          <p style={{
            fontSize: '10px', fontWeight: 300, color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.08em', marginTop: '12px', lineHeight: 1.6,
          }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '20px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <span style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
          © 2025 District XXV. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']].map(([label, path]) => (
            <Link key={path} to={path} style={{
              fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >{label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;