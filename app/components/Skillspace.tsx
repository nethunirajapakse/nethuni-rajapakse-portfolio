"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

/* ------------------------------------------------------------------ *
 * Tech stack — grouped into clusters. Each node carries a devicon
 * logo (served from jsDelivr). `wm` marks wordmark-only logos.
 * Keep this list interview-defensible: it's your real stack.
 * ------------------------------------------------------------------ */
const CATEGORIES = [
  "Languages",
  "Backend & streaming",
  "Data",
  "Cloud & DevOps",
  "Frontend",
] as const;

type Tech = { id: string; label: string; cat: number; wm?: boolean };

const TECH: Tech[] = [
  // Languages
  { id: "java", label: "Java", cat: 0 },
  { id: "python", label: "Python", cat: 0 },
  { id: "typescript", label: "TypeScript", cat: 0 },
  { id: "kotlin", label: "Kotlin", cat: 0 },
  { id: "cplusplus", label: "C++", cat: 0 },
  // Backend & streaming
  { id: "spring", label: "Spring Boot", cat: 1 },
  { id: "fastapi", label: "FastAPI", cat: 1 },
  { id: "apachekafka", label: "Apache Kafka", cat: 1 },
  { id: "redis", label: "Redis", cat: 1 },
  // Data
  { id: "postgresql", label: "PostgreSQL", cat: 2 },
  { id: "mysql", label: "MySQL", cat: 2 },
  { id: "pandas", label: "pandas", cat: 2 },
  { id: "scikitlearn", label: "scikit-learn", cat: 2 },
  // Cloud & DevOps
  { id: "docker", label: "Docker", cat: 3 },
  { id: "kubernetes", label: "Kubernetes", cat: 3 },
  { id: "amazonwebservices", label: "AWS", cat: 3, wm: true },
  { id: "githubactions", label: "GitHub Actions", cat: 3 },
  // Frontend
  { id: "react", label: "React", cat: 4 },
  { id: "nextjs", label: "Next.js", cat: 4 },
  { id: "tailwindcss", label: "Tailwind CSS", cat: 4 },
];

const logoUrl = (t: Tech) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t.id}/${t.id}-${
    t.wm ? "original-wordmark" : "original"
  }.svg`;

/* ------------------------------------------------------------------ *
 * 3D layout + projection (logical 440×440 space).
 * ------------------------------------------------------------------ */
const CX = 220;
const CY = 220;
const R = 150; // sphere radius
const FOCAL = 560; // perspective strength (larger = flatter)
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

type V3 = [number, number, number];
const norm = (v: V3): V3 => {
  const m = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / m, v[1] / m, v[2] / m];
};
const cross = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const fibDir = (i: number, n: number): V3 => {
  const y = 1 - ((i + 0.5) / n) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const t = GOLDEN * i;
  return [Math.cos(t) * r, y, Math.sin(t) * r];
};

type Projected = { sx: number; sy: number; depth: number; scale: number };
const project = ([x, y, z]: V3, rx: number, ry: number): Projected => {
  const X = x * Math.cos(ry) + z * Math.sin(ry);
  const Zt = -x * Math.sin(ry) + z * Math.cos(ry);
  const Y = y * Math.cos(rx) - Zt * Math.sin(rx);
  const Z = y * Math.sin(rx) + Zt * Math.cos(rx);
  const scale = FOCAL / (FOCAL + Z);
  return { sx: CX + X * scale, sy: CY + Y * scale, depth: Z, scale };
};

export default function SkillSpace({ animate }: { animate: boolean }) {
  // Base positions: cluster each category around its own direction.
  const base = useMemo<V3[]>(() => {
    const counts = CATEGORIES.map(
      (_, c) => TECH.filter((t) => t.cat === c).length
    );
    const centers = CATEGORIES.map((_, c) => norm(fibDir(c, CATEGORIES.length)));
    const seen = new Array(CATEGORIES.length).fill(0);
    return TECH.map((t) => {
      const c = centers[t.cat];
      const helper: V3 = Math.abs(c[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
      const u = norm(cross(c, helper));
      const v = cross(c, u);
      const m = counts[t.cat];
      const j = seen[t.cat]++;
      const a = m === 1 ? 0 : 0.62; // cone half-angle
      const phi = (2 * Math.PI * j) / m + t.cat;
      const d = norm([
        Math.cos(a) * c[0] + Math.sin(a) * (Math.cos(phi) * u[0] + Math.sin(phi) * v[0]),
        Math.cos(a) * c[1] + Math.sin(a) * (Math.cos(phi) * u[1] + Math.sin(phi) * v[1]),
        Math.cos(a) * c[2] + Math.sin(a) * (Math.cos(phi) * u[2] + Math.sin(phi) * v[2]),
      ]);
      return [d[0] * R * 0.96, d[1] * R * 0.96, d[2] * R * 0.96] as V3;
    });
  }, []);

  const rot = useRef({ x: -0.35, y: 0.5 });
  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const projRef = useRef<Projected[]>([]);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [, force] = useState(0);
  const tick = () => force((f) => (f + 1) % 1_000_000);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (animate) setShown(true);
  }, [animate]);

  // pointer → logical (440-space) coords
  const toLogical = (clientX: number, clientY: number) => {
    const rect = boxRef.current!.getBoundingClientRect();
    return [
      ((clientX - rect.left) / rect.width) * 440,
      ((clientY - rect.top) / rect.height) * 440,
    ];
  };
  const nearest = (lx: number, ly: number) => {
    let best = -1;
    let bestD = 30 * 30;
    projRef.current.forEach((p, i) => {
      const d = (p.sx - lx) ** 2 + (p.sy - ly) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    moved.current = false;
    last.current = { x: e.clientX, y: e.clientY };
    setActive(null);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      rot.current.y += dx * 0.008;
      rot.current.x = Math.max(-1.25, Math.min(1.25, rot.current.x + dy * 0.008));
      tick();
    } else if (e.pointerType === "mouse") {
      const [lx, ly] = toLogical(e.clientX, e.clientY);
      const n = nearest(lx, ly);
      setActive(n === -1 ? null : n);
    }
  };
  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    if (!moved.current) {
      const [lx, ly] = toLogical(e.clientX, e.clientY);
      const n = nearest(lx, ly);
      setActive((cur) => (n === -1 || n === cur ? null : n));
    }
    dragging.current = false;
  };
  const onLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.pointerType === "mouse") setActive(null);
  };

  // --- project this frame ---
  const rx = rot.current.x;
  const ry = rot.current.y;
  const projected = base.map((p) => project(p, rx, ry));
  projRef.current = projected;

  const pct = (n: number) => `${(n / 440) * 100}%`;
  const current = active !== null ? TECH[active] : null;

  return (
    <div className="w-full select-none">
      <div
        ref={boxRef}
        className="relative aspect-square w-full touch-none"
        style={{
          cursor: dragging.current ? "grabbing" : "grab",
          opacity: shown || reduced ? 1 : 0,
          transform: shown || reduced ? "scale(1)" : "scale(0.94)",
          transition: reduced
            ? "none"
            : "opacity 0.6s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onLeave}
      >
        {/* logo chips */}
        {projected.map((p, i) => {
          const t = TECH[i];
          const on = active === i;
          // 0 = deep in back, 1 = nearest to viewer
          const near = Math.max(0, Math.min(1, (p.scale - 0.78) / (1.34 - 0.78)));
          const size = 11 * p.scale * (on ? 1.16 : 1); // % of container width
          const op = on ? 1 : 0.26 + 0.74 * near;
          const bright = on ? 1 : 0.42 + 0.58 * near; // far nodes fall into shadow
          const blurPx = on ? 0 : (1 - near) * 1.3;
          return (
            <div
              key={t.id}
              className="absolute"
              style={{
                left: pct(p.sx),
                top: pct(p.sy),
                width: `${size}%`,
                aspectRatio: "1",
                transform: "translate(-50%, -50%)",
                zIndex: Math.round(p.scale * 1000),
                opacity: op,
                pointerEvents: "none",
                transition: "width 0.15s ease, opacity 0.15s ease",
              }}
            >
              <div
                className="flex h-full w-full items-center justify-center rounded-[24%]"
                style={{
                  background: "rgba(255,255,255,0.94)",
                  border: on
                    ? "1.5px solid var(--color-accent)"
                    : "1px solid color-mix(in srgb, var(--color-body), transparent 84%)",
                  boxShadow: on
                    ? "0 10px 24px -8px color-mix(in srgb, var(--color-accent), transparent 40%)"
                    : `0 6px 16px -10px rgba(0,0,0,${0.5 * near})`,
                  filter: `brightness(${bright}) blur(${blurPx}px)`,
                  transition: "filter 0.15s ease",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl(t)}
                  alt={t.label}
                  draggable={false}
                  loading="eager"
                  className="h-[64%] w-[64%] object-contain"
                />
              </div>
              {on && (
                <span
                  className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-accent"
                  style={{ fontSize: "0.72rem" }}
                >
                  {t.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* readout */}
      <div
        className="mt-3 rounded-[var(--radius-card)] border px-4 py-3 font-mono text-[0.8rem]"
        style={{
          borderColor: "color-mix(in srgb, var(--color-body), transparent 90%)",
          background: "color-mix(in srgb, var(--color-surface), transparent 20%)",
        }}
      >
        {current ? (
          <span className="text-body/80">
            <span className="text-accent">{current.label}</span>{" "}
            <span className="text-body/50">— {CATEGORIES[current.cat]}</span>
          </span>
        ) : (
          <span className="text-body/50">
            // drag to rotate · hover to inspect
          </span>
        )}
      </div>
    </div>
  );
}
