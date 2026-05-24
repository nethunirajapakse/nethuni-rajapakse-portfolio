'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['About', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 2rem',
        background: scrolled ? 'rgba(8,13,16,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}
    >
      {/* Logo */}
      <a href="#hero" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem',
          color: 'var(--heading)', letterSpacing: '-0.02em',
        }}>
          NR<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
        {links.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
            style={{
              color: 'var(--text-muted)', textDecoration: 'none',
              fontFamily: 'Space Mono, monospace', fontSize: '0.78rem',
              letterSpacing: '0.08em', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <span style={{ color: 'var(--accent)', marginRight: '4px' }}>0{i + 1}.</span>{link}
          </motion.a>
        ))}
        <motion.a
          href="/resume.pdf"
          target="_blank"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            border: '1px solid var(--accent)', color: 'var(--accent)',
            padding: '6px 18px', borderRadius: '4px', textDecoration: 'none',
            fontFamily: 'Space Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.06em', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--accent-glow)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Resume
        </motion.a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--accent)', fontSize: '1.4rem', display: 'none',
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0,
              background: 'rgba(8,13,16,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}
          >
            {links.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--text)', textDecoration: 'none',
                  fontFamily: 'Space Mono, monospace', fontSize: '1rem',
                }}
              >
                <span style={{ color: 'var(--accent)', marginRight: '8px' }}>0{i + 1}.</span>{link}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              style={{
                border: '1px solid var(--accent)', color: 'var(--accent)',
                padding: '10px 20px', borderRadius: '4px', textDecoration: 'none',
                fontFamily: 'Space Mono, monospace', fontSize: '0.85rem',
                textAlign: 'center',
              }}
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
