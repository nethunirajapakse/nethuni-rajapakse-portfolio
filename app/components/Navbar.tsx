"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "competitions", label: "Hackathons" },
  { id: "volunteering", label: "Volunteering" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { href: "https://github.com/nethunirajapakse", icon: "bi-github", label: "GitHub" },
  { href: "https://linkedin.com/in/nethuni-rajapakse/", icon: "bi-linkedin", label: "LinkedIn" },
  { href: "https://medium.com/@nethunirajapakse", icon: "bi-medium", label: "Medium" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => {
        const el = document.getElementById(link.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { id: link.id, top: rect.top, bottom: rect.bottom };
      });
      const current = sections.find((s) => s && s.top <= 120 && s.bottom >= 120);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`sticky top-0 z-[997] border-b transition-all duration-500 ${
        scrolled ? "bg-[#101a20]/95 backdrop-blur" : "bg-[#142027]"
      }`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-body), transparent 92%)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Wordmark — small mono identity mark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("hero");
          }}
          className="font-mono text-sm text-heading"
        >
          nethuni<span className="text-accent">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`relative py-2 text-[15px] transition after:absolute after:bottom-1 after:left-0 after:h-0.5 after:bg-[var(--nav-hover-color,var(--color-accent))] after:transition-all after:duration-300 ${
                  active
                    ? "text-[var(--nav-hover-color,var(--color-accent))] after:w-6"
                    : "text-[var(--nav-color,var(--color-body))] after:w-0 hover:text-[var(--nav-hover-color,var(--color-accent))] hover:after:w-6"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Socials (desktop) */}
        <div className="hidden items-center gap-3 xl:flex">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-body/60 transition hover:text-heading"
            >
              <i className={`bi ${s.icon}`} />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          className="relative z-[9999] text-3xl text-[var(--nav-color,var(--color-heading))] xl:hidden"
        >
          <i className={`bi ${mobileOpen ? "bi-x" : "bi-list"}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/70 xl:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <nav
            className="absolute inset-x-5 top-16 flex flex-col gap-1 rounded-lg border p-3"
            style={{
              background: "var(--color-bg)",
              borderColor:
                "color-mix(in srgb, var(--color-body), transparent 88%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`rounded-md px-4 py-3 text-[17px] font-medium transition ${
                  activeSection === link.id
                    ? "text-accent"
                    : "text-heading hover:text-accent"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div
              className="mt-2 flex gap-4 border-t px-4 pt-4 text-lg"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--color-body), transparent 88%)",
              }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-body/70 transition hover:text-accent"
                >
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
