import React, { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import axios from 'axios';

const InputField = ({ label, type = 'text', value, onChange, placeholder, required, error, multiline }) => {
  const [focused, setFocused] = useState(false);
  const style = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${error ? '#ef4444' : focused ? 'var(--accent-primary)' : 'var(--border)'}`,
    borderRadius: '10px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? '140px' : undefined,
    boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px', fontWeight: 500,
        color: 'var(--text-secondary)',
        marginBottom: '8px',
      }}>
        {label} {required && <span style={{ color: 'var(--accent-primary)' }}>*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={style}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={style}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
    </div>
  );
};

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    try {
      const res = await axios.post('/api/contact', formData);
      if (res.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to send. Please try again.';
      setStatus('error');
      setErrors({ submit: msg });
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const contactItems = [
    { icon: '📧', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: '📱', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: '📍', label: 'Location', value: personalInfo.address, href: null },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: '120px 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* BG orb */}
      <div style={{
        position: 'absolute', bottom: '-150px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Contact</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Let's Create Something<br />
            <span className="gradient-text">Great</span>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
            Have a project in mind? I'm always open to discussing new opportunities.
            I typically respond within 24 hours.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '48px',
          alignItems: 'start',
        }} className="contact-grid">
          {/* Left — contact info */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.7s ease',
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '28px' }}>
              Contact Information
            </h3>

            {contactItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                marginBottom: '24px',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px', fontWeight: 500 }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{
                      color: 'var(--text-primary)', textDecoration: 'none',
                      fontSize: '0.95rem', fontWeight: 500,
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500 }}>
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border)', margin: '32px 0' }} />

            {/* Social links */}
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Find me online
            </h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'LinkedIn', href: personalInfo.linkedin, icon: 'in' },
                { label: 'GitHub', href: personalInfo.github, icon: 'GH' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '13px', fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <span style={{
                    width: '20px', height: '20px',
                    background: 'rgba(99,102,241,0.2)',
                    borderRadius: '4px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', fontWeight: 800,
                  }}>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card" style={{
            padding: '36px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '24px' }}>
              Send a Message
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <InputField
                label="Your Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                error={errors.name}
              />
              <InputField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
                error={errors.email}
              />
            </div>

            <InputField
              label="Message"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project..."
              required
              multiline
              error={errors.message}
            />

            {errors.submit && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '14px', color: '#f87171' }}>
                ⚠️ {errors.submit}
              </div>
            )}

            {status === 'success' && (
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '14px', color: '#4ade80' }}>
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
            >
              {status === 'sending' ? (
                <>
                  <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  Sending...
                </>
              ) : (
                <>Send Message →</>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
