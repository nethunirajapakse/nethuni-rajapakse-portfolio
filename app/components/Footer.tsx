const socials = [
  { href: "https://github.com/nethunirajapakse", icon: "bi-github", label: "GitHub" },
  { href: "https://linkedin.com/in/nethuni-rajapakse/", icon: "bi-linkedin", label: "LinkedIn" },
  { href: "https://medium.com/@nethunirajapakse", icon: "bi-medium", label: "Medium" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-10 text-center text-sm text-body"
      style={{
        borderColor: "color-mix(in srgb, var(--color-body), transparent 92%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-body/80">
          © {year} <strong className="font-semibold text-heading">Nethuni Rajapakse</strong>
        </p>

        <div className="mt-5 flex justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border text-base text-body/60 transition hover:border-accent hover:text-accent"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--color-body), transparent 78%)",
              }}
            >
              <i className={`bi ${s.icon}`} />
            </a>
          ))}
        </div>

        <p className="mt-4 font-mono text-xs text-body/40">
          built with next.js · {year}
        </p>
      </div>
    </footer>
  );
}
