import { useState, useMemo } from 'react';

// ─── ACCENT ──────────────────────────────────────────────────────────────────
const A = {
  solid:    '#8B0000',
  bright:   '#b30000',
  glow:     'rgba(139,0,0,0.45)',
  border:   'rgba(180,0,0,0.4)',
  borderSoft: 'rgba(139,0,0,0.2)',
  tag:      'rgba(139,0,0,0.1)',
  tagText:  '#ff6b6b',
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// Shaped like a Supabase `products` table response.
// When you connect Supabase, replace this with:
//
//   const { data: products } = await supabase
//     .from('products')
//     .select('*')
//     .order('created_at', { ascending: false });
//
const MOCK_PRODUCTS = [
  { id: 1, name: 'Washed Varsity Hoodie',   price: 120, category: 'Hoodies',   image: null, sold_out: false },
  { id: 2, name: 'District Cargo Pants',    price: 95,  category: 'Bottoms',   image: null, sold_out: false },
  { id: 3, name: 'Crimson Logo Tee',        price: 45,  category: 'T-Shirts',  image: null, sold_out: true  },
  { id: 4, name: 'Tactical Overshirt',      price: 135, category: 'Outerwear', image: null, sold_out: false },
  { id: 5, name: 'Relaxed Fit Crewneck',    price: 85,  category: 'Hoodies',   image: null, sold_out: false },
  { id: 6, name: 'Utility Shorts',          price: 65,  category: 'Bottoms',   image: null, sold_out: true  },
  { id: 7, name: 'Heavyweight Pocket Tee',  price: 50,  category: 'T-Shirts',  image: null, sold_out: false },
  { id: 8, name: 'Bomber Jacket',           price: 210, category: 'Outerwear', image: null, sold_out: false },
  { id: 9, name: 'XXV Snapback',            price: 40,  category: 'Accessories', image: null, sold_out: false },
];

const CATEGORIES = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

const SORT_OPTIONS = [
  { label: 'Newest',        value: 'newest' },
  { label: 'Price: Low–High', value: 'price_asc' },
  { label: 'Price: High–Low', value: 'price_desc' },
];

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (product.sold_out) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    // TODO: dispatch to cart context / Supabase cart table
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
        border: `1px solid ${hovered ? A.border : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.6), 0 0 20px ${A.glow}` : '0 4px 16px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Image area */}
      <div style={{
        position: 'relative',
        aspectRatio: '3/4',
        background: 'rgba(255,255,255,0.04)',
        overflow: 'hidden',
      }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          // Placeholder until real images are added
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}>
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.12)" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
              letterSpacing: '0.16em', color: 'rgba(255,255,255,0.1)',
              textTransform: 'uppercase',
            }}>No image yet</span>
          </div>
        )}

        {/* Sold out overlay */}
        {product.sold_out && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '15px', letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '5px 14px',
            }}>Sold Out</span>
          </div>
        )}

        {/* Category pill */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: A.tag, border: `1px solid ${A.borderSoft}`,
          color: A.tagText,
          fontFamily: "'DM Sans', sans-serif", fontSize: '9px',
          fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '3px 9px',
        }}>
          {product.category}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
            fontSize: '13px', color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.02em', lineHeight: 1.4,
          }}>{product.name}</span>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '17px', color: '#fff',
            letterSpacing: '0.06em', whiteSpace: 'nowrap',
          }}>${product.price}</span>
        </div>

        <button
          onClick={handleAdd}
          disabled={product.sold_out}
          style={{
            marginTop: 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '10px',
            background: product.sold_out ? 'rgba(255,255,255,0.05)' : added ? 'rgba(139,0,0,0.3)' : A.solid,
            color: product.sold_out ? 'rgba(255,255,255,0.25)' : '#fff',
            border: product.sold_out ? '1px solid rgba(255,255,255,0.08)' : 'none',
            cursor: product.sold_out ? 'not-allowed' : 'pointer',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '13px', letterSpacing: '0.18em',
            clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))',
            transition: 'background 0.3s',
          }}
        >
          {product.sold_out ? 'Unavailable' : added ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// ─── COLLECTIONS PAGE ─────────────────────────────────────────────────────────
const Collections = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy]                 = useState('newest');
  const [sortOpen, setSortOpen]             = useState(false);

  // TODO: replace MOCK_PRODUCTS with Supabase fetch (useEffect + useState or React Query)
  const products = MOCK_PRODUCTS;

  const filtered = useMemo(() => {
    let list = activeCategory === 'All'
      ? products
      : products.filter(p => p.category === activeCategory);

    if (sortBy === 'price_asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    // 'newest' keeps insertion order (Supabase will sort by created_at)

    return list;
  }, [products, activeCategory, sortBy]);

  const activeLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label;

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        @keyframes c-fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .c-cat-btn {
          background: none; border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.45); cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 7px 18px; transition: all 0.25s; white-space: nowrap;
        }
        .c-cat-btn:hover { border-color: ${A.border}; color: #fff; }
        .c-cat-btn.active {
          background: ${A.solid}; border-color: ${A.solid};
          color: #fff;
        }
        .c-sort-item {
          padding: 10px 18px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.6);
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .c-sort-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .c-sort-item.active { color: ${A.tagText}; }
        .c-grid-item {
          animation: c-fadeUp 0.5s ease both;
        }
      `}</style>

      {/* Page header */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '48px 40px 32px',
        maxWidth: '1280px', margin: '0 auto',
      }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
          fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: A.tagText, marginBottom: '10px',
        }}>
          SS 2025
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(42px, 5vw, 72px)',
          lineHeight: 0.9, color: '#fff',
          letterSpacing: '0.02em', margin: 0,
        }}>
          Collections
        </h1>
      </div>

      {/* Filter + Sort bar */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '24px 40px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`c-cat-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setSortOpen(v => !v)}
            style={{
              background: 'none', cursor: 'pointer',
              border: `1px solid ${sortOpen ? A.border : 'rgba(255,255,255,0.1)'}`,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'border-color 0.25s',
            }}
          >
            Sort: {activeLabel}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
              style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {sortOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: '#111', border: '1px solid rgba(255,255,255,0.1)',
              minWidth: '180px', zIndex: 20,
              boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
            }}>
              {SORT_OPTIONS.map(opt => (
                <div
                  key={opt.value}
                  className={`c-sort-item${sortBy === opt.value ? ' active' : ''}`}
                  onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '18px 40px 0',
        fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
        fontWeight: 300, letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
      }}>
        {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '28px 40px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className="c-grid-item"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{
            gridColumn: '1 / -1', textAlign: 'center',
            padding: '80px 0',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            color: 'rgba(255,255,255,0.2)', fontSize: '14px', letterSpacing: '0.1em',
          }}>
            No products in this category yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;