import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';

const A = {
  solid:      '#8B0000',
  bright:     '#b30000',
  glow:       'rgba(139,0,0,0.45)',
  glowSoft:   'rgba(139,0,0,0.15)',
  border:     'rgba(180,0,0,0.4)',
  borderSoft: 'rgba(139,0,0,0.2)',
  tag:        'rgba(139,0,0,0.1)',
  tagText:    '#ff6b6b',
};

const ImgPlaceholder = () => (
  <div style={{
    width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '12px',
    background: 'rgba(255,255,255,0.03)',
  }}>
    <svg width="48" height="48" fill="none" viewBox="0 0 24 24"
      stroke="rgba(255,255,255,0.1)" strokeWidth="1">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
    <span style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
      letterSpacing: '0.18em', color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase',
    }}>No image yet</span>
  </div>
);

const RelatedCard = ({ product }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        border: `1px solid ${hovered ? A.border : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '4px', overflow: 'hidden', transition: 'all 0.3s',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 8px 30px rgba(0,0,0,0.5), 0 0 15px ${A.glow}` : 'none',
      }}
    >
      <div style={{ aspectRatio: '3/4', position: 'relative', background: 'rgba(255,255,255,0.04)' }}>
        {product.image_url
          ? <img src={product.image_url} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <ImgPlaceholder />
        }
        {product.sold_out && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px',
              letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.15)', padding: '4px 12px',
            }}>Sold Out</span>
          </div>
        )}
      </div>
      <div style={{ padding: '14px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>{product.name}</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: '#fff', letterSpacing: '0.06em' }}>${product.price}</div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct]           = useState(null);
  const [related, setRelated]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [activeImg, setActiveImg]       = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity]         = useState(1);
  const [added, setAdded]               = useState(false);
  const [sizeError, setSizeError]       = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); setError(null);
      setSelectedSize(null); setQuantity(1); setActiveImg(0);

      const { data, error } = await supabase
        .from('products').select('*').eq('id', id).single();

      if (error || !data) {
        setError('Product not found.');
      } else {
        setProduct(data);
        const { data: relatedData } = await supabase
          .from('products').select('*')
          .eq('category', data.category).neq('id', id).limit(3);
        setRelated(relatedData || []);
      }
      setLoading(false);
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = product
    ? (product.images?.length ? product.images : product.image_url ? [product.image_url] : [])
    : [];

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)' }}>Loading...</div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: A.tagText, fontSize: '14px' }}>{error}</div>
      <button onClick={() => navigate('/collections')} style={{
        background: A.solid, color: '#fff', border: 'none', cursor: 'pointer',
        fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px',
        letterSpacing: '0.2em', padding: '12px 28px',
      }}>Back to Collections</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        @keyframes pd-fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pd-shake { 0%,100% { transform:translateX(0); } 25% { transform:translateX(-6px); } 75% { transform:translateX(6px); } }
        .pd-size-btn {
          width:52px; height:52px; display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(255,255,255,0.12); background:none; color:rgba(255,255,255,0.55);
          font-family:'DM Sans',sans-serif; font-size:12px; cursor:pointer; transition:all 0.2s;
        }
        .pd-size-btn:hover { border-color:${A.border}; color:#fff; }
        .pd-size-btn.selected { background:${A.solid}; border-color:${A.solid}; color:#fff; }
        .pd-thumb {
          width:72px; height:90px; object-fit:cover; flex-shrink:0;
          border:1px solid rgba(255,255,255,0.08); cursor:pointer; transition:border-color 0.2s;
        }
        .pd-thumb.active { border-color:${A.border}; }
        .pd-thumb-ph {
          width:72px; height:90px; flex-shrink:0; cursor:pointer;
          border:1px solid rgba(255,255,255,0.08); transition:border-color 0.2s;
          background:rgba(255,255,255,0.04); display:flex; align-items:center; justify-content:center;
        }
        .pd-thumb-ph.active { border-color:${A.border}; }
        .pd-qty-btn {
          width:36px; height:36px; background:none; border:1px solid rgba(255,255,255,0.12);
          color:rgba(255,255,255,0.7); cursor:pointer; font-size:18px;
          display:flex; align-items:center; justify-content:center; transition:all 0.2s;
        }
        .pd-qty-btn:hover:not(:disabled) { border-color:rgba(255,255,255,0.3); color:#fff; }
        .pd-qty-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .pd-add-btn {
          flex:1; padding:16px; background:${A.solid}; color:#fff; border:none; cursor:pointer;
          font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.2em;
          clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));
          transition:background 0.3s, box-shadow 0.3s;
        }
        .pd-add-btn:hover { background:${A.bright}; box-shadow:0 0 30px ${A.glow}; }
        .pd-add-btn:disabled { background:rgba(255,255,255,0.08); cursor:not-allowed; color:rgba(255,255,255,0.3); clip-path:none; box-shadow:none; }
        .pd-related-item { animation:pd-fadeUp 0.5s ease both; }
      `}</style>

      {/* Breadcrumb */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto', padding: '24px 40px 0',
        display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
        letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
      }}>
        <Link to="/" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link to="/collections" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Collections</Link>
        <span>/</span>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>{product.name}</span>
      </div>

      {/* Main */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto', padding: '32px 40px 60px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start',
      }}>
        {/* LEFT — Gallery */}
        <div style={{ display: 'flex', gap: '12px', animation: 'pd-fadeUp 0.5s ease both' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {images.length > 0
              ? images.map((img, i) => (
                  <img key={i} src={img} alt={`${product.name} ${i + 1}`}
                    className={`pd-thumb${activeImg === i ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)} />
                ))
              : [0,1,2].map(i => (
                  <div key={i} className={`pd-thumb-ph${activeImg === i ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                      stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                  </div>
                ))
            }
          </div>
          <div style={{
            flex: 1, aspectRatio: '3/4', position: 'relative',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden',
          }}>
            {images[activeImg]
              ? <img src={images[activeImg]} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <ImgPlaceholder />
            }
            {product.sold_out && (
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px',
                  letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.2)', padding: '8px 20px',
                }}>Sold Out</span>
              </div>
            )}
            {product.category && (
              <div style={{
                position: 'absolute', top: '14px', left: '14px',
                background: A.tag, border: `1px solid ${A.borderSoft}`,
                color: A.tagText, fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px',
              }}>{product.category}</div>
            )}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div style={{ animation: 'pd-fadeUp 0.5s ease 0.15s both' }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(36px, 4vw, 56px)',
            lineHeight: 0.95, color: '#fff', letterSpacing: '0.02em', margin: '0 0 16px',
          }}>{product.name}</h1>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px',
            color: '#fff', letterSpacing: '0.06em', marginBottom: '24px',
          }}>${product.price}</div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '24px' }} />

          {product.description && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px',
            }}>{product.description}</p>
          )}

          {/* Size selector */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: sizeError ? A.tagText : 'rgba(255,255,255,0.6)',
                animation: sizeError ? 'pd-shake 0.3s ease' : 'none', transition: 'color 0.3s',
              }}>
                {sizeError ? 'Please select a size' : `Size${selectedSize ? `: ${selectedSize}` : ''}`}
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                fontWeight: 300, color: 'rgba(255,255,255,0.25)',
                cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px',
              }}>Size guide</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(product.sizes || ['XS','S','M','L','XL','XXL']).map(size => (
                <button key={size}
                  className={`pd-size-btn${selectedSize === size ? ' selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >{size}</button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
              fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)', marginBottom: '12px',
            }}>Quantity</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="pd-qty-btn" disabled={quantity <= 1}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <div style={{
                width: '52px', height: '36px',
                border: '1px solid rgba(255,255,255,0.12)', borderLeft: 'none', borderRight: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#fff',
              }}>{quantity}</div>
              <button className="pd-qty-btn" disabled={quantity >= 10}
                onClick={() => setQuantity(q => Math.min(10, q + 1))}>+</button>
            </div>
          </div>

          {/* Add to cart */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="pd-add-btn" disabled={product.sold_out} onClick={handleAddToCart}>
              {product.sold_out ? 'Sold Out' : added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '32px 0' }} />

          {/* Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              ['Category', product.category || '—'],
              ['Availability', product.sold_out ? 'Sold Out' : 'In Stock'],
              ['SKU', `DXXV-${product.id?.toString().slice(0,8).toUpperCase()}`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: '16px' }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)', width: '90px', flexShrink: 0,
                }}>{label}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                  color: value === 'Sold Out' ? A.tagText : 'rgba(255,255,255,0.6)',
                }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '48px 40px 80px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 300,
            letterSpacing: '0.28em', textTransform: 'uppercase', color: A.tagText, marginBottom: '8px',
          }}>You may also like</div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px,3vw,42px)',
            color: '#fff', margin: '0 0 28px', letterSpacing: '0.02em',
          }}>Related Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {related.map((p, i) => (
              <div key={p.id} className="pd-related-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <RelatedCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;