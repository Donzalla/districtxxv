import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav style={{
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      backgroundColor: '#000',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flex: 1 }}>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', padding: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            <Menu size={20} />
          </button>
          <button
            onClick={() => setSearchOpen(v => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'row',
              alignItems: 'center', gap: '6px', fontSize: '13px', letterSpacing: '0.06em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            <Search size={17} />
            <span>Search</span>
          </button>
        </div>

        {/* Center — logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src={logoImg}
              alt="District XXV"
              style={{
                height: '40px',
                width: '40px',
                objectFit: 'cover',
                borderRadius: '10px',
                boxShadow: '0 0 12px rgba(139,0,0,0.6)',
                border: '1px solid rgba(180,0,0,0.4)',
              }}
            />
          </Link>
        </div>

        {/* Right */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
          <Link to="/profile" style={{
            color: 'rgba(255,255,255,0.5)', display: 'flex',
            alignItems: 'center', textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            <User size={19} />
          </Link>
          <Link to="/cart" style={{
            color: 'rgba(255,255,255,0.5)', display: 'flex',
            alignItems: 'center', textDecoration: 'none', position: 'relative', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            <ShoppingBag size={19} />
            <span style={{
              position: 'absolute', top: '-7px', right: '-9px',
              backgroundColor: '#8B0000', color: '#fff',
              fontSize: '9px', fontWeight: 'bold',
              height: '15px', width: '15px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}>0</span>
          </Link>
        </div>
      </div>

      {/* Search bar drop-down */}
      {searchOpen && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '12px 24px',
          background: '#000',
        }}>
          <input
            autoFocus
            placeholder="Search products..."
            style={{
              width: '100%', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(139,0,0,0.4)', borderRadius: '4px',
              color: '#fff', padding: '10px 16px', fontSize: '14px',
              outline: 'none', fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.04em',
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;