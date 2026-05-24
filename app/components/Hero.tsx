'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const roles = ['Software Developer', 'AI Enthusiast', 'Full-stack Engineer', 'IT Undergraduate'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', padding: '0 2rem',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '-5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', paddingTop: '80px', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'Space Mono, monospace', color: 'var(--accent)',
            fontSize: '0.85rem', letterSpacing: '0.15em', marginBottom: '1.5rem',
          }}
        >
          {'>'} Hello, world. I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: '0.5rem',
          }}
        >
          Nethuni
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            marginBottom: '2rem',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.3)',
          }}
        >
          Rajapakse
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 600,
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            color: 'var(--text-muted)', marginBottom: '2rem',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>{'< '}</span>
          <span style={{ color: 'var(--accent)' }}>{displayed}</span>
          <span style={{
            display: 'inline-block', width: '2px', height: '1.4em',
            background: 'var(--accent)', animation: 'blink 1s infinite',
            verticalAlign: 'middle', marginLeft: '2px',
          }} />
          <span style={{ color: 'var(--accent)' }}>{' >'}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          style={{
            maxWidth: '520px', lineHeight: 1.8, color: 'var(--text-muted)',
            fontSize: '0.92rem', marginBottom: '3rem',
          }}
        >
          Final-year IT undergraduate at the University of Moratuwa. I build scalable
          software systems and explore AI-driven solutions — with a focus on LLMs and
          RAG architectures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          <a
            href="#projects"
            style={{
              background: 'var(--accent)', color: 'var(--bg)',
              padding: '12px 28px', borderRadius: '4px', textDecoration: 'none',
              fontFamily: 'Space Mono, monospace', fontSize: '0.8rem',
              fontWeight: 700, letterSpacing: '0.05em', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#33ddff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              border: '1px solid var(--border)', color: 'var(--text)',
              padding: '12px 28px', borderRadius: '4px', textDecoration: 'none',
              fontFamily: 'Space Mono, monospace', fontSize: '0.8rem',
              letterSpacing: '0.05em', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
        >
          {[
            { label: 'GH', href: 'https://github.com/nethunirajapakse' },
            { label: 'LI', href: 'https://linkedin.com/in/nethuni-rajapakse/' },
            { label: 'MD', href: 'https://medium.com/@nethunirajapakse/activity' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{
                color: 'var(--text-muted)', textDecoration: 'none',
                fontFamily: 'Space Mono, monospace', fontSize: '0.7rem',
                letterSpacing: '0.1em', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {s.label}
            </a>
          ))}
          <div style={{ height: '1px', width: '60px', background: 'var(--border)' }} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute', bottom: '2rem', right: '2rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}
      >
        <span style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', writingMode: 'vertical-rl' }}>
          scroll
        </span>
        <div style={{
          width: '1px', height: '60px',
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollLine {
          0%,100%{transform:scaleY(1);opacity:1}
          50%{transform:scaleY(0.5);opacity:0.5}
        }
      `}</style>
    </section>
  );
}
