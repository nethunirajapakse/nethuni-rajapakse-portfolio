"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll-spy: find which section is currently in view
      const sections = navLinks.map((link) => {
        const el = document.getElementById(link.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { id: link.id, top: rect.top, bottom: rect.bottom };
      });

      const current = sections.find(
        (s) => s && s.top <= 120 && s.bottom >= 120
      );
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.headerInner}`}>
        <nav className={`${styles.navmenu} ${mobileOpen ? styles.mobileOpen : ""}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? styles.active : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${mobileOpen ? "bi-x" : "bi-list"}`}></i>
          </button>
        </nav>

        <div className={styles.socialLinks}>
          <a
            href="https://github.com/nethunirajapakse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/nethuni-rajapakse/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://medium.com/@nethunirajapakse/activity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
          >
            <i className="bi bi-medium"></i>
          </a>
        </div>
      </div>
    </header>
  );
}
