export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: '2rem',
      textAlign: 'center', position: 'relative', zIndex: 1,
    }}>
      <p style={{ fontFamily: 'Space Mono', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
        Built by{' '}
        <a
          href="https://github.com/nethunirajapakse"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'none' }}
        >
          Nethuni Rajapakse
        </a>
        {' '}· Next.js + Framer Motion
      </p>
    </footer>
  );
}
