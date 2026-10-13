"use client";

import { useEffect, useRef } from "react";

/**
 * CursorFx — desktop-only pointer effects:
 *  - a soft mint spotlight that trails the cursor
 *  - a small ring that grows over interactive elements
 *  - feeds --mx/--my to any `.spot` element so cards get a cursor-following glow
 * Native cursor is left alone (accessibility). No-op on touch / reduced motion.
 */
export default function CursorFx() {
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const g = glow.current!, r = ring.current!;

    let tx = -200, ty = -200, gx = tx, gy = ty, rx = tx, ry = ty, raf = 0;

    const tick = () => {
      gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08;
      rx += (tx - rx) * 0.22; ry += (ty - ry) * 0.22;
      g.style.transform = `translate3d(${gx}px,${gy}px,0) translate(-50%,-50%)`;
      r.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      g.style.opacity = r.style.opacity = "1";
      const t = e.target as Element | null;
      const spot = t?.closest?.<HTMLElement>(".spot");
      if (spot) {
        const b = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - b.left}px`);
        spot.style.setProperty("--my", `${e.clientY - b.top}px`);
      }
      r.classList.toggle(
        "is-hover",
        !!t?.closest?.("a,button,input,textarea,select,label,[role=button],.spot")
      );
    };
    const onDown = () => r.classList.add("is-down");
    const onUp = () => r.classList.remove("is-down");
    const onLeave = () => { g.style.opacity = r.style.opacity = "0"; };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={glow} aria-hidden className="cursor-glow" />
      <div ref={ring} aria-hidden className="cursor-ring" />
    </>
  );
}
