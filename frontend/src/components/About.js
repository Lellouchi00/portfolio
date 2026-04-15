import React, { useEffect, useRef, useState } from 'react';
import { personalInfo, stats, aboutCards } from '../data/portfolioData';

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* BG accent */}
      <div style={{
        position: 'absolute', top: '50%', left: '-200px',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
          className="about-grid"
        >
          {/* Left — Image / visual block */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.7s ease',
            position: 'relative',
          }}>
            {/* Main image placeholder */}
            {/* <!-- Add your profile image here --> */}
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              maxWidth: '420px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              
              <img
  src="/my-photo.jpg"
  alt="About Me"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }}
/>

             
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '80px', height: '80px',
                background: 'linear-gradient(135deg, #6366f1, transparent)',
                borderBottomLeftRadius: '80px',
                opacity: 0.4,
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: '80px', height: '80px',
                background: 'linear-gradient(315deg, #8b5cf6, transparent)',
                borderTopRightRadius: '80px',
                opacity: 0.4,
              }} />
            </div>

          
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginTop: '20px',
            }}>
              {stats.map((stat, i) => (
                <div key={i} className="glass-card" style={{
                  padding: '20px 12px',
                  textAlign: 'center',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${0.4 + i * 0.1}s`,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <p className="section-label">Biography</p>
            <h2 className="section-title">A Little About Me</h2>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: '16px',
            }}>
              I'm a passionate Software Engineer and Web Developer with a love for building
              things that live on the internet. I care deeply about writing clean, maintainable
              code and creating experiences that are both functional and beautiful.
            </p>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: '36px',
            }}>
              Whether it's a complex backend system or a pixel-perfect frontend, I bring the
              same level of attention to detail and passion for quality to everything I build.
            </p>

           

           
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {aboutCards.map((card, i) => (
                <div key={i} className="glass-card" style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.5s ease ${0.5 + i * 0.1}s`,
                }}>
                  <div style={{
                    width: '44px', height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(99,102,241,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}>
                    {card.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '2px', fontSize: '0.95rem' }}>
                      {card.title}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {card.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
