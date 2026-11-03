"use client";

import {
  useEffect,
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

/* One colour per cluster, kept inside the site's palette. */
const CAT_COLORS = ["#00e5a0", "#ffb454", "#5aa9ff", "#b794f6", "#ff7a9c"];

/* ------------------------------------------------------------------ *
 * 3D layout + projection (logical 440×440 space).
 * ------------------------------------------------------------------ */
const CX = 220;
const CY = 220;
const R = 150; // sphere radius
const FOCAL = 560; // perspective strength (larger = flatter)
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const IDLE_SPIN = 0.3; // rad/s while nobody is touching it
const HOVER_SPIN = 0.05; // slows right down while a logo is being inspected

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
// 0 = deep at the back, 1 = nearest to the viewer
const nearness = (scale: number) =>
  Math.max(0, Math.min(1, (scale - 0.78) / (1.34 - 0.78)));

/* Cluster centres, and every logo placed on a cone around its centre. */
const CENTERS: V3[] = CATEGORIES.map((_, c) => norm(fibDir(c, CATEGORIES.length)));
const BASE: V3[] = (() => {
  const counts = CATEGORIES.map((_, c) => TECH.filter((t) => t.cat === c).length);
  const seen = new Array(CATEGORIES.length).fill(0);
  return TECH.map((t) => {
    const c = CENTERS[t.cat];
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
})();

/* Members of each cluster, in order, for drawing the constellation lines. */
const MEMBERS: number[][] = CATEGORIES.map((_, c) =>
  TECH.map((t, i) => (t.cat === c ? i : -1)).filter((i) => i >= 0)
);

/* Wireframe: three parallels and three meridians, sampled as 3D points. */
const RING_STEPS = 72;
const RINGS: V3[][] = (() => {
  const rings: V3[][] = [];
  for (const lat of [-0.55, 0, 0.55]) {
    const y = Math.sin(lat) * R;
    const r = Math.cos(lat) * R;
    rings.push(
      Array.from({ length: RING_STEPS }, (_, k) => {
        const t = (k / RING_STEPS) * Math.PI * 2;
        return [Math.cos(t) * r, y, Math.sin(t) * r] as V3;
      })
    );
  }
  for (const lon of [0, Math.PI / 3, (2 * Math.PI) / 3]) {
    rings.push(
      Array.from({ length: RING_STEPS }, (_, k) => {
        const t = (k / RING_STEPS) * Math.PI * 2;
        return [
          Math.cos(t) * R * Math.cos(lon),
          Math.sin(t) * R,
          Math.cos(t) * R * Math.sin(lon),
        ] as V3;
      })
    );
  }
  return rings;
})();

const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

export default function SkillSpace({ animate }: { animate: boolean }) {
  const rot = useRef({ x: -0.35, y: 0.5 });
  const vel = useRef({ x: 0, y: IDLE_SPIN });
  const target = useRef<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0, t: 0 });
  const hover = useRef<{ lx: number; ly: number } | null>(null);
  const spinRef = useRef(true);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [view, setView] = useState({ x: -0.35, y: 0.5 });
  const [active, setActive] = useState<number | null>(null);
  const [spin, setSpin] = useState(true);
  const [grabbing, setGrabbing] = useState(false);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [k, setK] = useState(1); // px per logical unit

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (animate) setShown(true);
  }, [animate]);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setK(el.clientWidth / 440));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    spinRef.current = spin;
  }, [spin]);

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
    BASE.forEach((b, i) => {
      const p = project(b, rot.current.x, rot.current.y);
      const d = (p.sx - lx) ** 2 + (p.sy - ly) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };

  // Animation loop: idle spin, drag inertia, easing toward a chosen cluster.
  useEffect(() => {
    if (!shown || reduced) return;
    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) {
        prev = now;
        return;
      }
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const r = rot.current;
      const v = vel.current;

      if (target.current) {
        const k = Math.min(1, dt * 4.5);
        const dy = wrapAngle(target.current.y - r.y);
        const dx = target.current.x - r.x;
        r.y += dy * k;
        r.x += dx * k;
        v.x = 0;
        v.y = 0;
        if (Math.abs(dy) + Math.abs(dx) < 0.004) target.current = null;
      } else if (!dragging.current) {
        const idle = !spinRef.current ? 0 : hover.current ? HOVER_SPIN : IDLE_SPIN;
        r.y += v.y * dt;
        r.x = Math.max(-1.25, Math.min(1.25, r.x + v.x * dt));
        v.y += (idle - v.y) * Math.min(1, dt * 1.6);
        v.x *= Math.exp(-dt * 3);
      }

      // keep the hovered logo in sync while the sphere turns under the cursor
      if (hover.current && !dragging.current) {
        const n = nearest(hover.current.lx, hover.current.ly);
        setActive((cur) => (cur === (n === -1 ? null : n) ? cur : n === -1 ? null : n));
      }
      setView({ x: r.x, y: r.y });
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [shown, reduced]);

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    moved.current = false;
    target.current = null;
    vel.current = { x: 0, y: 0 };
    last.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    setGrabbing(true);
    setActive(null);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved.current = true;
      const dt = Math.max(0.008, (e.timeStamp - last.current.t) / 1000);
      last.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
      rot.current.y += dx * 0.008;
      rot.current.x = Math.max(-1.25, Math.min(1.25, rot.current.x + dy * 0.008));
      // remember the flick so it keeps spinning after release
      vel.current.y = Math.max(-6, Math.min(6, (dx * 0.008) / dt));
      vel.current.x = Math.max(-4, Math.min(4, (dy * 0.008) / dt));
      setView({ x: rot.current.x, y: rot.current.y });
    } else if (e.pointerType === "mouse") {
      const [lx, ly] = toLogical(e.clientX, e.clientY);
      hover.current = { lx, ly };
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
      vel.current = { x: 0, y: spinRef.current ? IDLE_SPIN : 0 };
    }
    dragging.current = false;
    setGrabbing(false);
  };
  const onLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    setGrabbing(false);
    hover.current = null;
    if (e.pointerType === "mouse") setActive(null);
  };

  // --- project this frame ---
  const projected = BASE.map((p) => project(p, view.x, view.y));
  const lit = active !== null ? TECH[active].cat : null;

  const current = active !== null ? TECH[active] : null;
  const litColor = lit !== null ? CAT_COLORS[lit] : "#00e5a0";

  // wireframe split into a faint back half and a brighter front half
  let ringFront = "";
  let ringBack = "";
  for (const ring of RINGS) {
    const pts = ring.map((v) => project(v, view.x, view.y));
    for (let k = 0; k < pts.length; k++) {
      const a = pts[k];
      const b = pts[(k + 1) % pts.length];
      const seg = `M${a.sx.toFixed(1)} ${a.sy.toFixed(1)}L${b.sx.toFixed(1)} ${b.sy.toFixed(1)}`;
      if (a.depth + b.depth < 0) ringFront += seg;
      else ringBack += seg;
    }
  }

  return (
    <div className="w-full select-none">
      <div
        ref={boxRef}
        className="relative aspect-square w-full touch-pan-y"
        style={{
          cursor: grabbing ? "grabbing" : "grab",
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
        onPointerCancel={onLeave}
      >
        {/* sphere body: glow, wireframe and constellation lines */}
        <svg
          aria-hidden
          viewBox="0 0 440 440"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="ss-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={litColor} stopOpacity="0.22" />
              <stop offset="55%" stopColor={litColor} stopOpacity="0.07" />
              <stop offset="100%" stopColor={litColor} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx={CX}
            cy={CY}
            r={R * 1.32}
            fill="url(#ss-glow)"
            style={{ transition: "opacity 0.4s ease" }}
          />
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={litColor}
            strokeOpacity="0.16"
            strokeWidth="1"
          />
          <path d={ringBack} fill="none" stroke="#a9bcc9" strokeOpacity="0.07" strokeWidth="0.8" />
          <path d={ringFront} fill="none" stroke={litColor} strokeOpacity="0.2" strokeWidth="0.9" />

          {MEMBERS.map((idx, c) =>
            idx.length < 2
              ? null
              : idx.map((i, k) => {
                  if (idx.length === 2 && k === 1) return null;
                  const j = idx[(k + 1) % idx.length];
                  const a = projected[i];
                  const b = projected[j];
                  const near = nearness((a.scale + b.scale) / 2);
                  const on = lit === c;
                  const base = lit === null ? 0.3 : on ? 0.75 : 0.06;
                  return (
                    <line
                      key={`${c}-${k}`}
                      x1={a.sx}
                      y1={a.sy}
                      x2={b.sx}
                      y2={b.sy}
                      stroke={CAT_COLORS[c]}
                      strokeOpacity={base * (0.25 + 0.75 * near)}
                      strokeWidth={on ? 1.4 : 1}
                      strokeLinecap="round"
                    />
                  );
                })
          )}
        </svg>

        {/* logo chips: a fixed 440x440 layer scaled to fit, so every move is a GPU transform */}
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ width: 440, height: 440, transform: `scale(${k})` }}
        >
        {projected.map((p, i) => {
          const t = TECH[i];
          const on = active === i;
          const color = CAT_COLORS[t.cat];
          const inLit = lit === null || lit === t.cat;
          const near = nearness(p.scale);
          const sc = p.scale * (on ? 1.18 : inLit && lit !== null ? 1.06 : 1);
          const op = (on ? 1 : 0.26 + 0.74 * near) * (inLit ? 1 : 0.28);
          const bright = on ? 1 : 0.42 + 0.58 * near; // far nodes fall into shadow
          const blurPx = on ? 0 : Math.round(((1 - near) * 1.3 + (inLit ? 0 : 0.8)) * 4) / 4;
          const glow = (on || (lit !== null && inLit)) && near > 0.2;
          const showLabel = on || (lit === t.cat && near > 0.45);
          return (
            <div
              key={t.id}
              className="absolute left-0 top-0"
              style={{
                width: 50,
                height: 50,
                transform: `translate3d(${(p.sx - 25).toFixed(2)}px, ${(p.sy - 25).toFixed(2)}px, 0) scale(${sc.toFixed(3)})`,
                zIndex: Math.round(p.scale * 1000),
                opacity: op,
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className="flex h-full w-full items-center justify-center rounded-[24%]"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  border: `${on ? 2 : 1.5}px solid color-mix(in srgb, ${color}, transparent ${
                    on ? 0 : 52
                  }%)`,
                  boxShadow: glow
                    ? `0 0 ${on ? 26 : 16}px -2px color-mix(in srgb, ${color}, transparent ${
                        on ? 25 : 50
                      }%), 0 8px 18px -10px rgba(0,0,0,0.6)`
                    : `0 6px 16px -10px rgba(0,0,0,${0.5 * near})`,
                  filter: `brightness(${bright}) blur(${blurPx}px)`,
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
              {showLabel && (
                <span
                  className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono"
                  style={{ fontSize: "0.68rem", color }}
                >
                  {t.label}
                </span>
              )}
            </div>
          );
        })}
        </div>
      </div>

      {/* readout */}
      <div
        className="mt-3 flex items-center justify-between gap-3 rounded-[var(--radius-card)] border px-4 py-3 font-mono text-[0.8rem]"
        style={{
          borderColor: "color-mix(in srgb, var(--color-body), transparent 90%)",
          background: "color-mix(in srgb, var(--color-surface), transparent 20%)",
        }}
      >
        {current ? (
          <span className="text-body/80">
            <span style={{ color: CAT_COLORS[current.cat] }}>{current.label}</span>{" "}
            <span className="text-body/50">— {CATEGORIES[current.cat]}</span>
          </span>
        ) : (
          <span className="text-body/50">
            {"// drag to spin · hover a logo"}
          </span>
        )}
        {!reduced && (
          <button
            type="button"
            onClick={() => setSpin((s) => !s)}
            aria-label={spin ? "Pause rotation" : "Resume rotation"}
            aria-pressed={!spin}
            className="shrink-0 text-body/60 transition hover:text-accent"
          >
            <i className={`bi ${spin ? "bi-pause-circle" : "bi-play-circle"}`} />
          </button>
        )}
      </div>
    </div>
  );
}
