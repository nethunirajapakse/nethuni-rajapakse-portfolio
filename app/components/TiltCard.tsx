"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * TiltCard — 3D tilt-on-hover wrapper. The card rotates toward the
 * cursor on springs.
 *
 * Tilt is a post-mount enhancement: the server and first client render are
 * identical (no tilt), and it only switches on for fine-pointer, non-reduced
 * motion visitors. Pointer listeners sit on the stable outer wrapper (not the
 * rotating element) so the hit-area never shifts under the cursor — that was
 * the source of hover flicker. That keeps hydration stable for everyone.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 10,
  fill = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  /** stretch to the parent's height (grid cards); false = size to content */
  fill?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(ok);
  }, []);

  const mx = useMotionValue(0.5); // pointer x, 0..1
  const my = useMotionValue(0.5); // pointer y, 0..1

  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 180,
    damping: 22,
  });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: 1100 }}
      className={fill ? "h-full" : ""}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative ${fill ? "h-full" : ""} ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
