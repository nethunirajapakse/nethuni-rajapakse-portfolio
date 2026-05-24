'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { cat: 'Languages', items: ['Python', 'TypeScript', 'Java', 'SQL'] },
  { cat: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { cat: 'Backend', items: ['Node.js', 'FastAPI', 'Spring Boot'] },
  { cat: 'AI / ML', items: ['LangChain', 'RAG', 'OpenAI API', 'Hugging Face'] },
  { cat: 'Tools', items: ['Git', 'Docker', 'PostgreSQL', 'Supabase'] },
];

const facts = [
  { label: 'University', value: 'University of Moratuwa' },
  { label: 'Degree', value: 'BSc. IT (Hons)' },
  { label: 'Year', value: 'Final Year' },
  { label: 'Location', value: 'Sri Lanka 🇱🇰' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} style={{
      padding: '120px 2rem', position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}
        >
          <span style={{ color: 'var(--accent)', fontFamily: 'Space Mono', fontSize: '0.85rem' }}>01.</span>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.02em' }}>
            About Me
          </h2>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)', maxWidth: '200px' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Left: bio + facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p style={{ lineHeight: 1.85, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              I'm a final-year IT undergraduate at the University of Moratuwa with a passion for
              building things that live on the internet. I specialize in full-stack development and
              have a growing interest in AI — particularly Large Language Models and Retrieval-Augmented
              Generation (RAG) systems.
            </p>
            <p style={{ lineHeight: 1.85, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
              When I'm not coding, I write about tech on Medium, contributing to a community of
              developers. I believe in writing clean, maintainable code and building products
              that are both functional and delightful to use.
            </p>

            {/* Facts grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '6px', padding: '14px 16px',
                  }}
                >
                  <div style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '4px' }}>
                    {f.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontFamily: 'Space Mono' }}>
                    {f.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p style={{ fontFamily: 'Space Mono', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              // tech stack
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {skills.map((group, gi) => (
                <motion.div
                  key={group.cat}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + gi * 0.1 }}
                >
                  <div style={{
                    fontFamily: 'Space Mono', fontSize: '0.7rem', color: 'var(--text-muted)',
                    letterSpacing: '0.08em', marginBottom: '0.6rem',
                  }}>
                    {group.cat}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {group.items.map(item => (
                      <span key={item} style={{
                        background: 'var(--bg-3)', border: '1px solid var(--border)',
                        color: 'var(--text)', fontFamily: 'Space Mono',
                        fontSize: '0.75rem', padding: '4px 12px', borderRadius: '3px',
                        transition: 'all 0.2s', cursor: 'default',
                      }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                          e.currentTarget.style.color = 'var(--accent)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.color = 'var(--text)';
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
