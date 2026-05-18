import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, ChevronRight } from 'lucide-react';
import logoImg from '../assets/Vanpparel_App_Icon.jpg';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const A = {
  solid:   '#8B0000',
  bright:  '#b30000',
  glow:    'rgba(139,0,0,0.4)',
  border:  'rgba(180,0,0,0.4)',
  tagText: '#ff6b6b',
};

const CATEGORY_LINKS = [
  { label: 'Dropped',     category: 'Dropped' },
  { label: 'Kicks',       category: 'Kicks' },
  { label: 'Apparel',     category: 'All' },
  { label: 'Accessories', category: 'Accessories' },
  { label: 'Gift Card',   category: 'Gift Card' },
  { label: 'News',        category: 'News' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setDrawerOpen } = useCart();
  const { isLoggedIn, user }          = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();
  const inputRef  = useRef(null);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Clear search when leaving collections
  useEffect(() => {
    if (!location.pathname.includes('collections')) setSearchQuery('');
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Auto-focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/collections?search=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery('');
    navigate(`/collections?category=${encodeURIComponent(category)}`);
  };

  const isActive = (category) => {
    const params = new URLSearchParams(location.search);
    return location.pathname === '/collections' && params.get('category') === category;
  };

  const initials = isLoggedIn
    ? (user?.user_metadata?.full_name || user?.email || 'U')
        .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

        @keyframes nm-fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes nm-slideDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes nm-linkIn  { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }

        .nm-icon-btn {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.5); display: flex; align-items: center;
          justify-content: center; padding: 8px; transition: color 0.2s;
        }
        .nm-icon-btn:hover { color: #fff; }

        .nm-cat-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0; border: none; border-bottom: 1px solid rgba(255,255,255,0.06);
          background: none; cursor: pointer; color: rgba(255,255,255,0.75);
          font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 0.08em;
          text-align: left; transition: color 0.2s, padding-left 0.25s;
          animation: nm-linkIn 0.4s ease both;
        }
        .nm-cat-btn:hover { color: #fff; padding-left: 6px; }
        .nm-cat-btn.active { color: ${A.tagText}; }

        .nm-search-form {
          display: flex; align-items: center; width: 100%;
          border-top: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: #000;
          animation: nm-slideDown 0.2s ease;
        }
        .nm-search-icon-wrap {
          padding: 0 16px 0 24px; display: flex; align-items: center;
          color: rgba(255,255,255,0.25); flex-shrink: 0;
        }
        .nm-search-input {
          flex: 1; background: transparent; border: none;
          color: #fff; padding: 15px 8px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.04em; outline: none; min-width: 0;
        }
        .nm-search-input::placeholder { color: rgba(255,255,255,0.2); }
        .nm-search-clear {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.25); padding: 15px 12px;
          display: flex; align-items: center; transition: color 0.2s; flex-shrink: 0;
        }
        .nm-search-clear:hover { color: rgba(255,255,255,0.6); }
        .nm-search-submit {
          background: ${A.solid}; border: none; cursor: pointer;
          color: #fff; padding: 15px 28px;
          font-family: 'Bebas Neue', sans-serif; font-size: 15px;
          letter-spacing: 0.2em; transition: background 0.2s;
          white-space: nowrap; flex-shrink: 0;
        }
        .nm-search-submit:hover { background: ${A.bright}; }
      `}</style>

      {/* ── NAVBAR BAR ── */}
      <nav style={{
        backgroundColor: '#000',
        borderBottom: searchOpen ? 'none' : '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, zIndex: 50, width: '100%',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', height: '64px',
        }}>

          {/* Left — hamburger + search toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
            <button className="nm-icon-btn" style={{ marginLeft: '-8px' }}
              onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <button
              className="nm-icon-btn"
              onClick={() => setSearchOpen(v => !v)}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {searchOpen ? <X size={18} /> : <Search size={17} />}
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px', letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.5)',
              }}>
                {searchOpen ? 'Close' : 'Search'}
              </span>
            </button>
          </div>

          {/* Center — logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={logoImg} alt="District XXV" style={{
                height: '40px', width: '40px', objectFit: 'cover',
                borderRadius: '10px', border: '1px solid rgba(180,0,0,0.4)',
                boxShadow: '0 0 12px rgba(139,0,0,0.6)',
              }} />
            </Link>
          </div>

          {/* Right — user + cart */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
            <Link
              to={isLoggedIn ? '/profile' : '/login'}
              className="nm-icon-btn"
              style={{ textDecoration: 'none', padding: 0 }}
              aria-label="Account"
            >
              {isLoggedIn ? (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${A.solid}, ${A.bright})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px',
                  letterSpacing: '0.05em', color: '#fff',
                  boxShadow: `0 0 8px ${A.glow}`,
                }}>{initials}</div>
              ) : (
                <User size={19} />
              )}
            </Link>

            <button
              className="nm-icon-btn"
              style={{ position: 'relative', padding: 0 }}
              onClick={() => setDrawerOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag size={19} />
              <span style={{
                position: 'absolute', top: '-7px', right: '-9px',
                backgroundColor: A.solid, color: '#fff',
                fontSize: '9px', fontWeight: 'bold',
                height: '15px', width: '15px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: totalItems > 0 ? 1 : 0, transition: 'opacity 0.2s',
              }}>{totalItems}</span>
            </button>
          </div>
        </div>

        {/* ── SEARCH FORM ── */}
        {searchOpen && (
          <form
            className="nm-search-form"
            onSubmit={handleSearch}
            autoComplete="off"
          >
            <div className="nm-search-icon-wrap">
              <Search size={16} />
            </div>

            <input
              ref={inputRef}
              id="site-search"
              name="site-search"
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by product name or category..."
              className="nm-search-input"
              autoComplete="off"
            />

            {searchQuery.length > 0 && (
              <button
                type="button"
                className="nm-search-clear"
                onClick={() => { setSearchQuery(''); inputRef.current?.focus(); }}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}

            <button type="submit" className="nm-search-submit">
              Search
            </button>
          </form>
        )}
      </nav>

      {/* ── BACKDROP ── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            zIndex: 200,
            animation: 'nm-fadeIn 0.3s ease',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* ── SLIDE-IN MENU PANEL ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: '320px', maxWidth: '90vw',
        background: '#0a0a0a',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        zIndex: 201, display: 'flex', flexDirection: 'column',
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: menuOpen ? '20px 0 60px rgba(0,0,0,0.8)' : 'none',
      }}>

        {/* Panel header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexShrink: 0,
        }}>
          <img src={logoImg} alt="District XXV" style={{
            height: '36px', width: '36px', objectFit: 'cover',
            borderRadius: '8px', border: '1px solid rgba(180,0,0,0.4)',
            boxShadow: '0 0 10px rgba(139,0,0,0.5)',
          }} />
          <button className="nm-icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Panel links */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 24px' }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '9px',
            fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase',
            color: A.tagText, padding: '20px 0 12px',
          }}>SS 2025</div>

          {CATEGORY_LINKS.map((link, i) => (
            <button
              key={link.category}
              className={`nm-cat-btn${isActive(link.category) ? ' active' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => handleCategoryClick(link.category)}
            >
              {link.label}
              <ChevronRight size={16} style={{ opacity: 0.3, flexShrink: 0 }} />
            </button>
          ))}

          <div style={{ margin: '28px 0 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

          {/* Auth section */}
          {isLoggedIn ? (
            <Link to="/profile" style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              textDecoration: 'none', color: 'rgba(255,255,255,0.5)',
              fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
              fontWeight: 300, letterSpacing: '0.1em', transition: 'color 0.2s',
              animation: `nm-linkIn 0.4s ease ${CATEGORY_LINKS.length * 0.05 + 0.1}s both`,
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${A.solid}, ${A.bright})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px',
                color: '#fff', flexShrink: 0,
              }}>{initials}</div>
              {user?.user_metadata?.full_name || user?.email}
            </Link>
          ) : (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '10px',
              animation: `nm-linkIn 0.4s ease ${CATEGORY_LINKS.length * 0.05 + 0.1}s both`,
            }}>
              <Link to="/login" style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                textDecoration: 'none', color: 'rgba(255,255,255,0.5)',
                fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                fontWeight: 300, letterSpacing: '0.1em',
              }}>
                <User size={15} /> Sign In
              </Link>
              <Link to="/signup" style={{
                textDecoration: 'none', color: A.tagText,
                fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                fontWeight: 300, letterSpacing: '0.1em',
              }}>Create Account →</Link>
            </div>
          )}
        </div>

        {/* Panel footer */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px',
            letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)',
          }}>District XXV © 2025</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;