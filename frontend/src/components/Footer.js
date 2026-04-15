import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 24px',
      background: 'var(--bg-primary)',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* Logo */}
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem' }}>
          <span className="gradient-text">{personalInfo.name}</span>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
          © {year} {personalInfo.name}. All rights reserved.
          <span style={{ display: 'block', fontSize: '11px', marginTop: '2px', color: 'var(--text-muted)' }}>
            Built with React & Node.js
          </span>
        </p>

        {/* Social */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { label: 'GitHub', href: personalInfo.github },
            { label: 'LinkedIn', href: personalInfo.linkedin },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              fontSize: '13px', color: 'var(--text-muted)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
