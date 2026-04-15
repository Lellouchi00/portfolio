import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Update active section
      const sections = ['about', 'skills', 'projects', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(6, 11, 20, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,102,241,0.1)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.3rem',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 800, color: 'white',
          }}>
            {personalInfo.name.charAt(0)}
          </span>
          <span className="gradient-text">{personalInfo.name.split(' ')[0]}</span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                color: active === link.href.slice(1) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                background: active === link.href.slice(1) ? 'rgba(99,102,241,0.1)' : 'transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (active !== link.href.slice(1)) e.target.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { if (active !== link.href.slice(1)) e.target.style.color = 'var(--text-secondary)'; }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={personalInfo.resumeUrl}
            download
            className="btn-primary"
            style={{ marginLeft: '8px', padding: '9px 20px', fontSize: '0.85rem' }}
          >
            Resume ↓
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px', color: 'var(--text-primary)',
            display: 'flex', flexDirection: 'column', gap: '5px',
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: '22px', height: '2px',
              background: 'var(--text-primary)',
              borderRadius: '2px',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(5px, -5px)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 999,
          background: 'rgba(6, 11, 20, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '20px 24px',
          display: 'flex', flexDirection: 'column', gap: '8px',
          animation: 'fadeDown 0.2s ease',
        }}>
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                background: 'none', border: 'none',
                padding: '14px 16px', borderRadius: '10px',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500,
                cursor: 'pointer', textAlign: 'left',
                color: active === link.href.slice(1) ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: active === link.href.slice(1) ? 'rgba(99,102,241,0.1)' : 'transparent',
              }}
            >
              {link.label}
            </button>
          ))}
          <a href={personalInfo.resumeUrl} download className="btn-primary" style={{ marginTop: '8px', justifyContent: 'center' }}>
            Download Resume
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
