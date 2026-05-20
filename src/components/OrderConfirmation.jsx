import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const A = {
  solid:   '#8B0000',
  bright:  '#b30000',
  glow:    'rgba(139,0,0,0.4)',
  border:  'rgba(180,0,0,0.4)',
  tagText: '#ff6b6b',
};

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase
        .from('orders').select('*').eq('id', id).single();
      setOrder(data);
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)' }}>Loading...</div>
    </div>
  );

  if (!order) return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.4)' }}>Order not found.</div>
      <Link to="/" style={{ padding: '12px 32px', background: A.solid, color: '#fff', textDecoration: 'none', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.2em' }}>Go Home</Link>
    </div>
  );

  const items = order.items || [];

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        @keyframes oc-fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes oc-checkPop { 0% { transform:scale(0); opacity:0; } 70% { transform:scale(1.2); } 100% { transform:scale(1); opacity:1; } }
      `}</style>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 40px 80px', animation: 'oc-fadeUp 0.5s ease both' }}>

        {/* Success icon */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(139,0,0,0.15)', border: `2px solid ${A.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            animation: 'oc-checkPop 0.5s ease 0.2s both',
          }}>
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={A.tagText} strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase', color: A.tagText, marginBottom: '10px' }}>
            Order Confirmed
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,5vw,52px)', lineHeight: 0.95, color: '#fff', margin: '0 0 12px' }}>
            Thank you, {order.full_name.split(' ')[0]}!
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
            Your order has been placed successfully. We'll contact you on <strong style={{ color: '#fff' }}>{order.phone}</strong> to confirm delivery details.
          </p>
        </div>

        {/* Order details card */}
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '28px', background: 'rgba(255,255,255,0.02)', marginBottom: '20px' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.15em', color: '#fff', marginBottom: '20px' }}>
            Order Details
          </div>

          {[
            ['Order ID',   `#${order.id.slice(0, 8).toUpperCase()}`],
            ['Name',       order.full_name],
            ['Phone',      order.phone],
            ['City',       order.city],
            ['Location',   order.location_address || '—'],
            ['Payment',    'Cash on Delivery'],
            ['Status',     'Pending'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', gap: '16px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', width: '100px', flexShrink: 0 }}>{label}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: label === 'Status' ? A.tagText : 'rgba(255,255,255,0.7)' }}>{value}</span>
            </div>
          ))}

          {order.notes && (
            <div style={{ display: 'flex', gap: '16px', padding: '10px 0' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', width: '100px', flexShrink: 0 }}>Notes</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{order.notes}</span>
            </div>
          )}
        </div>

        {/* Items ordered */}
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '28px', background: 'rgba(255,255,255,0.02)', marginBottom: '32px' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.15em', color: '#fff', marginBottom: '20px' }}>
            Items Ordered
          </div>

          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ width: '52px', height: '65px', flexShrink: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                {item.image
                  ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.04)' }} />
                }
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>{item.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.3)' }}>
                  Size: {item.size} · Qty: {item.quantity}
                </div>
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: '#fff', letterSpacing: '0.04em' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.1em', color: '#fff' }}>Total</span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', color: '#fff', letterSpacing: '0.06em' }}>${order.subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link to="/collections" style={{
            flex: 1, padding: '14px', textAlign: 'center',
            background: A.solid, color: '#fff', textDecoration: 'none',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.2em',
            clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
            transition: 'background 0.3s',
          }}>Continue Shopping</Link>
          <Link to="/profile" style={{
            flex: 1, padding: '14px', textAlign: 'center',
            background: 'none', color: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.2em',
            clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
            transition: 'all 0.3s',
          }}>View Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;