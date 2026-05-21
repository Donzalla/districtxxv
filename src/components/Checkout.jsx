import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const A = {
  solid:  '#8B0000',
  bright: '#b30000',
  glow:   'rgba(139,0,0,0.4)',
  border: 'rgba(180,0,0,0.4)',
  tag:    '#ff6b6b',
};

const inputStyle = (focused) => ({
  width: '100%',
  padding: '12px 14px',
  background: focused ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
  border: `1px solid ${focused ? A.border : 'rgba(255,255,255,0.1)'}`,
  color: '#fff',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.2s',
  boxSizing: 'border-box',
});

const labelStyle = {
  display: 'block',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '10px',
  fontWeight: 300,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: '6px',
};

function Field({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '18px' }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: A.tag }}> *</span>}</label>
      {children}
    </div>
  );
}

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const defaultName = user?.user_metadata?.full_name || '';

  const [form, setForm] = useState({
    full_name: defaultName,
    phone: '',
    city: '',
    location_address: '',
    notes: '',
  });
  const [focused, setFocused] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');`}</style>
        <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Your cart is empty.</div>
        <Link to="/collections" style={{ padding: '12px 32px', background: A.solid, color: '#fff', textDecoration: 'none', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.2em' }}>
          Shop Now
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { data, error: insertError } = await supabase
      .from('orders')
      .insert({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        location_address: form.location_address.trim() || null,
        notes: form.notes.trim() || null,
        items,
        subtotal,
        status: 'Pending',
        user_id: user?.id || null,
      })
      .select('id')
      .single();

    if (insertError) {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
      return;
    }

    clearCart();
    navigate(`/order-confirmation/${data.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        @keyframes co-fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .co-btn:hover { background: ${A.bright} !important; }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px', animation: 'co-fadeUp 0.4s ease both' }}>

        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase', color: A.tag, marginBottom: '10px' }}>
          Checkout
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,5vw,52px)', lineHeight: 0.95, color: '#fff', margin: '0 0 40px' }}>
          Complete Your Order
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>

          {/* Shipping form */}
          <form onSubmit={handleSubmit}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.15em', color: '#fff', marginBottom: '24px' }}>
              Delivery Details
            </div>

            <Field label="Full Name" required>
              <input
                value={form.full_name}
                onChange={set('full_name')}
                onFocus={() => setFocused('full_name')}
                onBlur={() => setFocused('')}
                style={inputStyle(focused === 'full_name')}
                required
              />
            </Field>

            <Field label="Phone Number" required>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused('')}
                style={inputStyle(focused === 'phone')}
                placeholder="+1 (555) 000-0000"
                required
              />
            </Field>

            <Field label="City" required>
              <input
                value={form.city}
                onChange={set('city')}
                onFocus={() => setFocused('city')}
                onBlur={() => setFocused('')}
                style={inputStyle(focused === 'city')}
                required
              />
            </Field>

            <Field label="Delivery Address">
              <input
                value={form.location_address}
                onChange={set('location_address')}
                onFocus={() => setFocused('location_address')}
                onBlur={() => setFocused('')}
                style={inputStyle(focused === 'location_address')}
                placeholder="Street, apartment, area…"
              />
            </Field>

            <Field label="Order Notes">
              <textarea
                value={form.notes}
                onChange={set('notes')}
                onFocus={() => setFocused('notes')}
                onBlur={() => setFocused('')}
                style={{ ...inputStyle(focused === 'notes'), resize: 'vertical', minHeight: '80px' }}
                placeholder="Special instructions, preferred contact time…"
              />
            </Field>

            {/* Payment method notice */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', border: `1px solid ${A.border}`, background: 'rgba(139,0,0,0.06)', marginBottom: '24px' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={A.tag} strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.12em', color: '#fff' }}>Cash on Delivery</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Pay when your order arrives</div>
              </div>
            </div>

            {error && (
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: A.tag, marginBottom: '16px' }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="co-btn"
              style={{
                width: '100%',
                padding: '16px',
                background: submitting ? 'rgba(139,0,0,0.5)' : A.solid,
                color: '#fff',
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '18px',
                letterSpacing: '0.25em',
                clipPath: 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))',
                transition: 'background 0.3s',
              }}
            >
              {submitting ? 'Placing Order…' : 'Place Order'}
            </button>
          </form>

          {/* Order summary */}
          <div style={{ border: '1px solid rgba(255,255,255,0.08)', padding: '28px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.15em', color: '#fff', marginBottom: '20px' }}>
              Order Summary
            </div>

            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ width: '52px', height: '65px', flexShrink: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                  {item.image
                    ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%' }} />
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
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#fff', letterSpacing: '0.06em' }}>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <Link to="/collections" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.08em' }}>
                ← Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
