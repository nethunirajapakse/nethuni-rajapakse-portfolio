'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);

  const email = 'nethunirajapakse@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { label: 'GitHub', handle: '@nethunirajapakse', href: 'https://github.com/nethunirajapakse' },
    { label: 'LinkedIn', handle: 'nethuni-rajapakse', href: 'https://linkedin.com/in/nethuni-rajapakse/' },
    { label: 'Medium', handle: '@nethunirajapakse', href: 'https://medium.com/@nethunirajapakse/activity' },
  ];

  return (
    <section id="contact" ref={ref} style={{
      padding: '120px 2rem 80px', position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p style={{ fontFamily: 'Space Mono', fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '1rem' }}>
            03. What's Next?
          </p>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800,
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            letterSpacing: '-0.03em', marginBottom: '1.5rem', lineHeight: 1.1,
          }}>
            Get In Touch
          </h2>
          <p style={{
            color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8,
            marginBottom: '3rem', maxWidth: '480px', margin: '0 auto 3rem',
          }}>
            I'm currently open to new opportunities — internships, collaborations, or
            just a chat about AI and software. My inbox is always open.
          </p>
        </motion.div>

        {/* Email block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '2rem', marginBottom: '2.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1rem',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '6px' }}>
              EMAIL
            </div>
            <div style={{ fontFamily: 'Space Mono', fontSize: '0.9rem', color: 'var(--text)' }}>
              {email}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={copyEmail}
              style={{
                background: 'none', border: '1px solid var(--border)',
                color: copied ? 'var(--accent)' : 'var(--text-muted)',
                padding: '8px 16px', borderRadius: '4px', cursor: 'pointer',
                fontFamily: 'Space Mono', fontSize: '0.72rem', letterSpacing: '0.06em',
                transition: 'all 0.2s',
                borderColor: copied ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <a
              href={`mailto:${email}`}
              style={{
                background: 'var(--accent)', color: 'var(--bg)',
                padding: '8px 20px', borderRadius: '4px', textDecoration: 'none',
                fontFamily: 'Space Mono', fontSize: '0.72rem', letterSpacing: '0.06em',
                fontWeight: 700, transition: 'all 0.2s', display: 'inline-block',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#33ddff'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
            >
              Say Hello →
            </a>
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}
        >
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              style={{
                textDecoration: 'none', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center',
              }}
              onMouseEnter={e => { (e.currentTarget.querySelector('.sl') as HTMLElement).style.color = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget.querySelector('.sl') as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
              <span className="sl" style={{ fontFamily: 'Space Mono', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                {s.label}
              </span>
              <span style={{ fontFamily: 'Space Mono', fontSize: '0.75rem', color: 'var(--text)' }}>
                {s.handle}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
