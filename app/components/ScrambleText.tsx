"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/**
 * ScrambleText — "decrypts" its text. Server-renders the final string (so
 * SEO / no-JS are fine), then scrambles → resolves left-to-right.
 *   on="boot"  plays when the boot sequence finishes (or immediately if skipped)
 *   on="view"  plays once when scrolled into view
 */
export default function ScrambleText({
  text,
  className = "",
  on = "view",
  duration = 900,
}: {
  text: string;
  className?: string;
  on?: "boot" | "view";
  duration?: number;
}) {
  const [out, setOut] = useState(text);
  const rootRef = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const reduced = useRef(false);

  const run = useCallback(() => {
    if (reduced.current) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const resolved = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        s += i < resolved || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [text, duration]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    if (on === "boot") {
      if (document.documentElement.dataset.boot === "running") {
        const h = () => run();
        window.addEventListener("bootdone", h, { once: true });
        return () => window.removeEventListener("bootdone", h);
      }
      run();
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [on, run]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span ref={rootRef} className={`relative inline-block ${className}`}>
      {/* real text reserves the final size, so scrambling never reflows */}
      <span className="invisible">{text}</span>
      <span aria-hidden className="absolute inset-0 overflow-hidden">
        {out}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
