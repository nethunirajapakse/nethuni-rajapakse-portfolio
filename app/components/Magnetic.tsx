"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Pulls its child toward the cursor on springs. Mouse only; no-op elsewhere. */
export default function Magnetic({
  children,
  className = "",
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-flex ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const b = ref.current?.getBoundingClientRect();
        if (!b) return;
        x.set((e.clientX - (b.left + b.width / 2)) * strength);
        y.set((e.clientY - (b.top + b.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
