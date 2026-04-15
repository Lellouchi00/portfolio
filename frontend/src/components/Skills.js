import React, { useEffect, useRef, useState } from 'react';
import { skills } from '../data/portfolioData';

const SkillIcon = ({ icon }) => {
  const icons = {
    html5: '🌐',
    css3: '🎨',
    js: '⚡',
    react: '⚛️',
    nodejs: '🟢',
    express: '🚂',
    mongodb: '🍃',
    typescript: '📘',
    database: '🗄️',
    shield: '🛡️',
    security: '🔒',
    default: '💡',
  };
  return <span style={{ fontSize: '18px' }}>{icons[icon] || icons.default}</span>;
};

const SkillBar = ({ skill, visible, delay }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(timer);
    }
  }, [visible, delay]);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '20px',
      transition: 'all 0.3s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s, background 0.3s`,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px',
            borderRadius: '8px',
            background: 'rgba(99,102,241,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <SkillIcon icon={skill.icon} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>
            {skill.name}
          </span>
        </div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '0.9rem',
          color: 'var(--accent-primary)',
        }}>
          {skill.level}%
        </span>
      </div>

      {/* Progress bar track */}
      <div style={{
        height: '6px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: animated ? `${skill.level}%` : '0%',
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          borderRadius: '3px',
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 10px rgba(99,102,241,0.5)',
        }} />
      </div>
    </div>
  );
};

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const categories = ['all', ...new Set(skills.map(s => s.category))];
  const filteredSkills = activeTab === 'all' ? skills : skills.filter(s => s.category === activeTab);

  const categoryLabels = { all: 'All Skills', frontend: 'Frontend', backend: 'Backend', other: 'Other' };

  return (
    <section id="skills" ref={ref} style={{ padding: '120px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      {/* BG orb */}
      <div style={{
        position: 'absolute', top: '50%', right: '-200px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Skills & Expertise</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>My Technical Arsenal</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
            Technologies I work with to build exceptional digital experiences.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: '9px 22px',
                borderRadius: '999px',
                border: `1px solid ${activeTab === cat ? 'var(--accent-primary)' : 'var(--border)'}`,
                background: activeTab === cat ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: activeTab === cat ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {filteredSkills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              visible={visible}
              delay={i * 80}
            />
          ))}
        </div>

        {/* Add skill hint */}
        <div style={{
          textAlign: 'center',
          marginTop: '48px',
          padding: '20px',
          borderRadius: '14px',
          border: '1px dashed var(--border)',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
        }}>
          💡 To add a new skill, edit <code style={{ color: 'var(--accent-primary)', background: 'rgba(99,102,241,0.1)', padding: '2px 8px', borderRadius: '4px' }}>src/data/portfolioData.js</code> and add to the <code style={{ color: 'var(--accent-primary)', background: 'rgba(99,102,241,0.1)', padding: '2px 8px', borderRadius: '4px' }}>skills</code> array.
        </div>
      </div>
    </section>
  );
}
