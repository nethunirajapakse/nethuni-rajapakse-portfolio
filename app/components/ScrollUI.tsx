"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

/** Top progress bar + right-hand section rail with live active state. */
export default function ScrollUI() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (e): e is HTMLElement => !!e
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[9990] h-[2px] origin-left bg-accent"
        style={{ scaleX, boxShadow: "0 0 10px var(--color-accent)" }}
      />
      <nav
        aria-label="Section rail"
        className="fixed right-5 top-1/2 z-[900] hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
      >
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label={s.label}
              aria-current={on ? "true" : undefined}
              className="group flex items-center gap-3"
            >
              <span
                className={`font-mono text-[0.7rem] transition-all duration-300 ${
                  on
                    ? "translate-x-0 text-accent opacity-100"
                    : "translate-x-1 text-body/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {s.label}
              </span>
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: on ? 22 : 8,
                  height: 8,
                  background: on
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-body), transparent 70%)",
                  boxShadow: on ? "0 0 12px var(--color-accent)" : "none",
                }}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
