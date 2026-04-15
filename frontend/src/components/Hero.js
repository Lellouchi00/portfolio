import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const codeLines = [
    { color: '#7c7f8e', text: '// Initializing portfolio...' },
    { color: '#6366f1', text: 'const developer = {' },
    { color: '#f1f5f9', text: "  name: ", after: { color: '#a3e635', text: `'${personalInfo.name}'` } },
    { color: '#f1f5f9', text: "  role: ", after: { color: '#a3e635', text: `'Full Stack'` } },
    { color: '#f1f5f9', text: "  skills: ", after: { color: '#fb923c', text: "['React', 'Node.js', '...']" } },
    { color: '#6366f1', text: '};' },
    { color: '#7c7f8e', text: '' },
    { color: '#f1f5f9', text: 'developer.', after: { color: '#60a5fa', text: 'buildAwesomeThings()' }, suffix: { color: '#f1f5f9', text: ';' } },
  ];

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '70px',
    }}>
      <div className="orb" style={{
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        top: '-100px', right: '-100px',
        animationDelay: '0s',
      }} />
      <div className="orb" style={{
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        bottom: '0', left: '-100px',
        animationDelay: '4s',
      }} />

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        width: '100%',
      }}>
        <div style={{ animation: 'fadeInLeft 0.8s ease forwards' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '999px',
            padding: '8px 16px',
            marginBottom: '28px',
            fontSize: '13px', fontWeight: 500,
            color: '#a5b4fc',
          }}>
            <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            Available for opportunities
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '24px',
          }}>
            Hi, I'm<br />
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '20px',
          }}>
            {personalInfo.title}
          </p>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: '40px',
            maxWidth: '480px',
          }}>
            {personalInfo.bio}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
              <span>→</span>
            </button>
            <button
              className="btn-outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '48px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Find me on</span>
            {[
              { label: 'GitHub', href: personalInfo.github, icon: 'GH' },
              { label: 'LinkedIn', href: personalInfo.linkedin, icon: 'LI' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                width: '38px', height: '38px',
                border: '1px solid var(--border-hover)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: '11px', fontWeight: 700,
                transition: 'var(--transition)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'none'; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ animation: 'fadeInRight 0.8s ease 0.2s both' }}>
          <div style={{ position: 'relative', marginBottom: '50px' }}>
            <div style={{
              width: '220px',
              height: '220px',
              margin: '0 auto',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
              border: '2px solid var(--border-hover)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <img
                src="/my_photo0.jpg"
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            <div style={{
              position: 'absolute', bottom: '-12px', right: 'calc(50% - 140px)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-hover)',
              borderRadius: '10px', padding: '8px 14px',
              fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}>
              <span style={{ color: '#22c55e' }}>●</span> Open to work
            </div>
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', marginTop: '24px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
              background: 'rgba(0,0,0,0.2)',
            }}>
              {['#ef4444','#f59e0b','#22c55e'].map((c, i) => (
                <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              ))}
              <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                portfolio.js
              </span>
            </div>

            <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '13px', lineHeight: 2 }}>
              {codeLines.map((line, i) => (
                <div key={i} style={{ animation: `fadeIn 0.3s ease ${0.3 + i * 0.1}s both` }}>
                  <span style={{ color: 'var(--text-muted)', marginRight: '16px', userSelect: 'none', fontSize: '11px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ color: line.color }}>{line.text}</span>
                  {line.after && <span style={{ color: line.after.color }}>{line.after.text}</span>}
                  {line.suffix && <span style={{ color: line.suffix.color }}>{line.suffix.text}</span>}
                </div>
              ))}
              <div style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--accent-primary)', animation: 'blink 1s infinite', verticalAlign: 'middle', marginLeft: '36px' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'bounce 2s infinite',
      }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }} />
      </div>

      <style>{`
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        @media (max-width: 768px) {
          #home > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #home > div > div > div:last-child { order: -1; }
        }
      `}</style>
    </section>
  );
}

