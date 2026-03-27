import { useEffect, useRef } from 'react';
import heroImg from '../assets/hero.jpg';
import { Link } from 'react-router-dom';

// Deep crimson — pulled from the Vanpparel app icon
const A = {
  solid:      '#8B0000',
  bright:     '#b30000',
  glow:       'rgba(139,0,0,0.5)',
  glowSoft:   'rgba(139,0,0,0.18)',
  border:     'rgba(180,0,0,0.45)',
  borderSoft: 'rgba(139,0,0,0.2)',
  tag:        'rgba(139,0,0,0.1)',
  tagText:    '#ff6b6b',
};

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const glow = hero.querySelector('.h-glow');
      if (glow) glow.style.transform = `translate(${x * 25}px, ${y * 15}px)`;
      const img = hero.querySelector('.h-img');
      if (img) img.style.transform = `scale(1.03) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
    };
    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} style={{
      position: 'relative',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

        @keyframes h-fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes h-float {
          0%,100% { transform: translateY(0px) scale(1.03); }
          50%      { transform: translateY(-14px) scale(1.03); }
        }
        @keyframes h-pulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.1); }
        }
        @keyframes h-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .h-img {
          animation: h-float 6s ease-in-out infinite;
          transition: transform 0.4s ease;
          transform-style: preserve-3d;
        }
        .h-glow {
          animation: h-pulse 5s ease-in-out infinite;
          transition: transform 0.8s ease;
        }
        .h-tag {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px;
          border: 1px solid ${A.border};
          background: ${A.tag};
          color: ${A.tagText};
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 400; letter-spacing: 0.22em;
          text-transform: uppercase;
          animation: h-fadeUp 0.5s ease 0.1s both;
        }
        .h-btn-main {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 34px;
          background: ${A.solid}; color: #fff; border: none; cursor: pointer;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px; letter-spacing: 0.16em;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: box-shadow 0.3s, background 0.3s;
        }
        .h-btn-main:hover { background: ${A.bright}; box-shadow: 0 0 30px ${A.glow}; }
        .h-btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 34px;
          background: transparent; color: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.16); cursor: pointer;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px; letter-spacing: 0.16em;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: border-color 0.3s, color 0.3s;
        }
        .h-btn-ghost:hover { border-color: ${A.border}; color: #fff; }
        .h-ticker-wrap {
          position: absolute; bottom: 0; left: 0; right: 0;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 11px 0;
        }
        .h-ticker-track {
          display: flex; width: max-content;
          animation: h-ticker 28s linear infinite;
        }
        .h-ticker-item {
          display: flex; align-items: center; gap: 36px;
          padding: 0 36px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px; letter-spacing: 0.28em;
          color: rgba(255,255,255,0.18); white-space: nowrap;
        }
        .h-dot { width: 3px; height: 3px; background: ${A.solid}; border-radius: 50%; flex-shrink: 0; }
        .h-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .h-stat { animation: h-fadeUp 0.7s ease both; }
        .h-stat:nth-child(1) { animation-delay: 0.7s; }
        .h-stat:nth-child(2) { animation-delay: 0.85s; }
        .h-stat:nth-child(3) { animation-delay: 1.0s; }
      `}</style>

      <div className="h-grid" />

      {/* Deep crimson glow */}
      <div className="h-glow" style={{
        position: 'absolute', right: '8%', top: '50%',
        transform: 'translateY(-50%)',
        width: '500px', height: '500px', borderRadius: '50%',
        background: `radial-gradient(circle, ${A.glow} 0%, ${A.glowSoft} 45%, transparent 70%)`,
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Subtle bottom-left bleed */}
      <div style={{
        position: 'absolute', left: '-80px', bottom: '5%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: `radial-gradient(circle, rgba(139,0,0,0.2) 0%, transparent 70%)`,
        filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '1280px',
        margin: '0 auto', padding: '60px 40px 100px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', gap: '40px',
      }}>

        {/* LEFT */}
        <div>
          <div className="h-tag">
            <span style={{ width: 5, height: 5, background: A.solid, borderRadius: '50%', display: 'inline-block' }} />
            SS 2025 Collection
          </div>

          <h1 style={{
            margin: '22px 0 0',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(68px, 8.5vw, 122px)',
            lineHeight: 0.88, color: '#fff',
            animation: 'h-fadeUp 0.6s ease 0.2s both',
          }}>
            <span style={{ display: 'block' }}>District</span>
            <span style={{
              display: 'block', position: 'relative',
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              color: 'transparent',
            }}>
              XXV
              <span style={{
                position: 'absolute', left: 0, top: 0,
                background: `linear-gradient(135deg, ${A.solid} 0%, ${A.bright} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', clipPath: 'inset(0 58% 0 0)',
              }}>XXV</span>
            </span>
          </h1>

          <p style={{
            marginTop: '26px',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: '14px', lineHeight: 1.8,
            color: 'rgba(255,255,255,0.42)', maxWidth: '360px',
            animation: 'h-fadeUp 0.6s ease 0.38s both',
          }}>
            Precision-cut streetwear for those who move at the edge of culture.
            Limited drops. No restocks. No compromises.
          </p>

          <div style={{
            display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap',
            animation: 'h-fadeUp 0.6s ease 0.52s both',
          }}>
            <Link to="/collections" className="h-btn-main" style={{ textDecoration: 'none' }}>
                 Shop Collection
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </Link>
            <button className="h-btn-ghost">Lookbook</button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '36px', marginTop: '48px',
            paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            {[['25','Pieces'],['72H','Drop Window'],['SS25','Season']].map(([val, lbl]) => (
              <div key={lbl} className="h-stat">
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px',
                  color: '#fff', letterSpacing: '0.04em', lineHeight: 1,
                }}>{val}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
                  fontWeight: 300, color: 'rgba(255,255,255,0.28)',
                  letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '5px',
                }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative', minHeight: '480px',
        }}>
          <div style={{
            position: 'absolute', width: '400px', height: '400px',
            border: `1px solid ${A.borderSoft}`, borderRadius: '50%',
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          }} />

          {[
            { top: '8%',    left: '8%',  borderTop:    `1px solid ${A.border}`, borderLeft:  `1px solid ${A.border}` },
            { top: '8%',    right: '8%', borderTop:    `1px solid ${A.border}`, borderRight: `1px solid ${A.border}` },
            { bottom: '8%', left: '8%',  borderBottom: `1px solid ${A.border}`, borderLeft:  `1px solid ${A.border}` },
            { bottom: '8%', right: '8%', borderBottom: `1px solid ${A.border}`, borderRight: `1px solid ${A.border}` },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: '22px', height: '22px', ...s }} />
          ))}

          <div className="h-img" style={{ position: 'relative', zIndex: 5 }}>
            <img
              src={heroImg}
              alt="District XXV — SS25"
              style={{
                width: 'clamp(260px, 26vw, 380px)',
                height: 'auto',
                display: 'block',
                borderRadius: '4px',
                filter: 'brightness(0.72) contrast(1.1) drop-shadow(0 20px 50px rgba(0,0,0,0.95))',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '4px',
              background: `linear-gradient(135deg, ${A.glowSoft} 0%, transparent 60%)`,
              mixBlendMode: 'screen', pointerEvents: 'none',
            }} />
          </div>

          <div style={{
            position: 'absolute', bottom: '6%', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            fontSize: '10px', letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            Washed Varsity Hoodie · ₂₅
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="h-ticker-wrap">
        <div className="h-ticker-track">
          {[...Array(2)].map((_, gi) => (
            <div key={gi} className="h-ticker-item">
              {['New Drop','Limited Edition','SS 2025','District XXV','Streetwear','No Restocks','Precision Cut'].map((t, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
                  {t}<span className="h-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;