'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    num: '01',
    title: 'RAG-Powered Knowledge Assistant',
    description:
      'An AI assistant that ingests documents and answers questions using Retrieval-Augmented Generation. Built with LangChain, OpenAI API, and a vector database for semantic search.',
    tags: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'PostgreSQL'],
    github: 'https://github.com/nethunirajapakse',
    live: null,
    featured: true,
  },
  {
    num: '02',
    title: 'Full-Stack Task Manager',
    description:
      'A collaborative project management app with real-time updates, role-based access control, and a clean dashboard. Built with Next.js, Supabase, and TypeScript.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    github: 'https://github.com/nethunirajapakse',
    live: null,
    featured: true,
  },
  {
    num: '03',
    title: 'University Research Portal',
    description:
      'A portal for undergraduate students to submit, track, and manage research proposals. Features PDF generation, email notifications, and admin review workflows.',
    tags: ['React', 'Spring Boot', 'Java', 'MySQL'],
    github: 'https://github.com/nethunirajapakse',
    live: null,
    featured: false,
  },
  {
    num: '04',
    title: 'Tech Blog — Medium',
    description:
      'Writing about software engineering, AI trends, and developer tools. Covering topics from LLM fine-tuning to practical Next.js patterns.',
    tags: ['Technical Writing', 'AI', 'Web Dev'],
    github: null,
    live: 'https://medium.com/@nethunirajapakse/activity',
    featured: false,
  },
];

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg-3)' : 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--accent-dim)' : 'var(--border)'}`,
        borderRadius: '8px', padding: '2rem',
        transition: 'all 0.3s ease', cursor: 'default',
        position: 'relative', overflow: 'hidden',
        boxShadow: hovered ? '0 0 30px rgba(0,212,255,0.06)' : 'none',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: 'Space Mono', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>
          {project.num}
        </span>
        <div style={{ display: 'flex', gap: '12px' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'Space Mono', fontSize: '0.7rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'Space Mono', fontSize: '0.7rem', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>

      <h3 style={{
        fontFamily: 'Syne', fontWeight: 700, fontSize: '1.15rem',
        marginBottom: '0.75rem', letterSpacing: '-0.01em',
        color: hovered ? 'var(--accent)' : 'var(--heading)', transition: 'color 0.3s',
      }}>
        {project.title}
      </h3>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'Space Mono', fontSize: '0.68rem',
            color: 'var(--accent-dim)', letterSpacing: '0.06em',
          }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Accent line on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '2px', background: 'var(--accent)',
        width: hovered ? '100%' : '0%', transition: 'width 0.4s ease',
      }} />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} style={{
      padding: '120px 2rem', position: 'relative', zIndex: 1,
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 50%, var(--bg) 100%)',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}
        >
          <span style={{ color: 'var(--accent)', fontFamily: 'Space Mono', fontSize: '0.85rem' }}>02.</span>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.02em' }}>
            Projects
          </h2>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)', maxWidth: '200px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <a
            href="https://github.com/nethunirajapakse"
            target="_blank"
            rel="noreferrer"
            style={{
              border: '1px solid var(--border)', color: 'var(--text-muted)',
              padding: '12px 28px', borderRadius: '4px', textDecoration: 'none',
              fontFamily: 'Space Mono', fontSize: '0.78rem', letterSpacing: '0.06em',
              transition: 'all 0.2s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            View More on GitHub ↗
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #projects > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
