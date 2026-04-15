import React, { useEffect, useRef, useState } from 'react';
import { projects, personalInfo } from '../data/portfolioData';

const ProjectCard = ({ project, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  const delay = index * 100;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: '20px',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.1)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image / Placeholder */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '12px',
          }}>
            <span style={{ fontSize: '40px', opacity: 0.4 }}>🖼️</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Project Preview</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(6, 11, 20, 0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '13px' }}
              onClick={e => e.stopPropagation()}
            >
              Live Demo →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline"
              style={{ padding: '9px 20px', fontSize: '13px' }}
              onClick={e => e.stopPropagation()}
            >
              GitHub
            </a>
          )}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: 'rgba(99,102,241,0.9)',
            borderRadius: '999px',
            padding: '4px 12px',
            fontSize: '11px', fontWeight: 600, color: 'white',
          }}>
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '11px', fontWeight: 500,
              color: '#a5b4fc',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '999px',
              padding: '3px 10px',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.1rem',
          marginBottom: '10px',
          color: 'var(--text-primary)',
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          flex: 1,
          marginBottom: '20px',
        }}>
          {project.description}
        </p>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
              fontSize: '13px', color: 'var(--accent-primary)',
              textDecoration: 'none', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '4px',
              transition: 'gap 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.gap = '8px'}
              onMouseLeave={e => e.currentTarget.style.gap = '4px'}
            >
              Live Demo →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
              fontSize: '13px', color: 'var(--text-muted)',
              textDecoration: 'none', fontWeight: 500,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const displayedProjects = filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects;

  return (
    <section id="projects" ref={ref} style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Portfolio</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Selected Projects</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
            A showcase of projects I've built, from concept to deployment.
          </p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '32px' }}>
            {['all', 'featured'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '9px 22px',
                  borderRadius: '999px',
                  border: `1px solid ${filter === f ? 'var(--accent-primary)' : 'var(--border)'}`,
                  background: filter === f ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: filter === f ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem', fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
              >
                {f === 'all' ? 'All Projects' : 'Featured'}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {displayedProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            See More on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
