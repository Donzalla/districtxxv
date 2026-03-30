import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const A = {
  solid:    '#8B0000',
  bright:   '#b30000',
  glow:     'rgba(139,0,0,0.4)',
  border:   'rgba(180,0,0,0.4)',
  borderSoft: 'rgba(139,0,0,0.2)',
  tagText:  '#ff6b6b',
};

// ─── CART ITEM ────────────────────────────────────────────────────────────────
const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div style={{
      display: 'flex', gap: '14px', padding: '16px 0',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Image */}
      <div style={{
        width: '72px', height: '90px', flexShrink: 0,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '2px', overflow: 'hidden',
      }}>
        {item.image
          ? <img src={item.image} alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
                stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
            color: 'rgba(255,255,255,0.85)', lineHeight: 1.3, maxWidth: '160px',
          }}>{item.name}</span>
          {/* Remove */}
          <button
            onClick={() => removeItem(item.id, item.size)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.25)', padding: '2px',
              display: 'flex', alignItems: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = A.tagText}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Size */}
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
          fontWeight: 300, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>Size: {item.size}</span>

        {/* Quantity + Price row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
          {/* Qty controls */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
              disabled={item.quantity <= 1}
              style={{
                width: '28px', height: '28px', background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: item.quantity <= 1 ? 0.3 : 1, transition: 'opacity 0.2s',
              }}
            >−</button>
            <span style={{
              width: '32px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)', borderLeft: 'none', borderRight: 'none',
            }}>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
              disabled={item.quantity >= 10}
              style={{
                width: '28px', height: '28px', background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)', cursor: item.quantity >= 10 ? 'not-allowed' : 'pointer',
                fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: item.quantity >= 10 ? 0.3 : 1, transition: 'opacity 0.2s',
              }}
            >+</button>
          </div>

          {/* Line total */}
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px',
            color: '#fff', letterSpacing: '0.06em',
          }}>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// ─── CART DRAWER ──────────────────────────────────────────────────────────────
const CartDrawer = () => {
  const { items, drawerOpen, setDrawerOpen, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setDrawerOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        @keyframes cd-slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes cd-fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        .cd-checkout-btn {
          width: 100%; padding: 16px;
          background: ${A.solid}; color: #fff; border: none; cursor: pointer;
          font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 0.2em;
          clip-path: polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          transition: background 0.3s, box-shadow 0.3s;
        }
        .cd-checkout-btn:hover { background: ${A.bright}; box-shadow: 0 0 24px ${A.glow}; }
        .cd-continue-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          fontWeight: 300; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); text-decoration: underline;
          text-underline-offset: 3px; transition: color 0.2s;
        }
        .cd-continue-btn:hover { color: rgba(255,255,255,0.7); }
      `}</style>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            zIndex: 100, animation: 'cd-fadeIn 0.3s ease',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '420px', maxWidth: '95vw',
        background: '#0a0a0a',
        borderLeft: '1px solid rgba(255,255,255,0.07)',
        zIndex: 101,
        display: 'flex', flexDirection: 'column',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: drawerOpen ? '-20px 0 60px rgba(0,0,0,0.8)' : 'none',
      }}>

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px',
              letterSpacing: '0.15em', color: '#fff',
            }}>Your Cart</span>
            {totalItems > 0 && (
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                fontWeight: 300, color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.1em',
              }}>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
            )}
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', padding: '4px',
              display: 'flex', alignItems: 'center', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {items.length === 0 ? (
            <div style={{
              height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '16px',
            }}>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"
                stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: '13px', color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.1em',
              }}>Your cart is empty</span>
              <button
                className="cd-continue-btn"
                onClick={() => { setDrawerOpen(false); navigate('/collections'); }}
              >Browse Collections</button>
            </div>
          ) : (
            items.map((item, i) => <CartItem key={`${item.id}-${item.size}`} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px',
          }}>
            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}>Subtotal</span>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px',
                color: '#fff', letterSpacing: '0.06em',
              }}>${subtotal.toFixed(2)}</span>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
              fontWeight: 300, color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.1em', margin: 0, textAlign: 'center',
            }}>Shipping calculated at checkout</p>

            {/* Checkout button */}
            <button
              className="cd-checkout-btn"
              onClick={() => {
                // TODO: wire up to Stripe / checkout flow
                alert('Checkout coming soon!');
              }}
            >
              Checkout · ${subtotal.toFixed(2)}
            </button>

            {/* Continue shopping */}
            <div style={{ textAlign: 'center' }}>
              <button
                className="cd-continue-btn"
                onClick={() => { setDrawerOpen(false); navigate('/collections'); }}
              >Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;