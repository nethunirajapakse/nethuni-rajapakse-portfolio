"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import ScrambleText from "./ScrambleText";

type Entry = {
  kind: "work" | "education";
  year: string;
  title: string;
  org: string;
  meta: string;
  summary?: string;
  points?: string[];
  tags?: string[];
  results?: { label: string; value: string; note?: string }[];
  current?: boolean;
};

// Newest first.
const entries: Entry[] = [
  {
    kind: "work",
    year: "2026",
    title: "Backend Developer",
    org: "Sawiya Foundation",
    meta: "Sep 2026 – Present · Volunteer, part-time · Remote",
    summary:
      "Sawiya is a non-profit platform that lets rural communities in Sri Lanka reach donors directly. I work on its Java backend as part of a agile/Scrum team.",
    points: [
      "Developing Spring Boot REST APIs on a MySQL backend, following the team’s layered architecture and shared coding guidelines.",
      "Working through tickets in the team’s workflow, from code review and cleanup to new features and bug fixes.",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "REST"],
    current: true,
  },
  {
    kind: "work",
    year: "2025",
    title: "Software Engineering Intern",
    org: "Revocare Solutions",
    meta: "Feb 2025 – Aug 2025 · Internship · Colombo",
    summary:
      "Six months on a large FinTech platform, working across Spring Boot microservices and a React frontend in a Kanban-driven team.",
    points: [
      "Sped up frontend data fetching by introducing TanStack Query and tuning custom hooks.",
      "Cut SQL overhead on the backend with QueryDSL and batch fetching.",
      "Wrote unit and integration tests with JUnit and Mockito to protect core APIs.",
      "Built modular CRM components and dynamic filters to make financial data easier to explore.",
    ],
    tags: ["Spring Boot", "React", "TanStack Query", "QueryDSL", "JUnit", "Mockito"],
  },
  {
    kind: "education",
    year: "2022",
    title: "B.Sc. (Hons) in Information Technology",
    org: "University of Moratuwa",
    meta: "2022 – 2026 · Moratuwa",
    results: [{ label: "GPA", value: "3.57", note: "/ 4.00" }],
  },
  {
    kind: "education",
    year: "2020",
    title: "G.C.E. Advanced Level, Physical Science",
    org: "Southlands College",
    meta: "Completed 2020 · Galle",
    results: [
      { label: "G.C.E. A/L", value: "2 A’s & 1 B" },
      { label: "G.C.E. O/L", value: "9 A’s" },
    ],
  },
];


export default function Experience() {
  const { ref, inView } = useInView<HTMLElement>();
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  // Fill the rail as the list scrolls past 60% of the viewport height.
  useEffect(() => {
    const update = () => {
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const reveal = inView ? "animate-reveal" : "opacity-0";
  const railLeft = "calc(var(--pill) + 1rem)";

  return (
    <section id="experience" ref={ref} className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-sm tracking-tight text-accent">
            — experience &amp; education
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-heading">
            <ScrambleText text="My journey so far" />
          </h2>
          <div className="mt-4 flex gap-5 font-mono text-xs text-body/70">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Work
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber" /> Education
            </span>
          </div>
        </div>

        <ol
          ref={listRef}
          className="relative [--pill:0px] md:[--pill:6.25rem]"
        >
          {/* Rail (track + scroll fill) */}
          <span
            aria-hidden
            className="absolute bottom-0 top-3 w-px"
            style={{
              left: railLeft,
              background: "color-mix(in srgb, var(--color-body), transparent 82%)",
            }}
          />
          <span
            aria-hidden
            className="absolute top-3 w-px origin-top"
            style={{
              left: railLeft,
              height: "calc(100% - 0.75rem)",
              transform: `scaleY(${progress})`,
              background: "var(--color-accent)",
              boxShadow: "0 0 10px color-mix(in srgb, var(--color-accent), transparent 55%)",
            }}
          />

          {entries.map((e, i) => {
            const color = e.kind === "work" ? "var(--color-accent)" : "var(--color-amber)";
            return (
              <li
                key={`${e.org}-${e.year}`}
                className={`${reveal} relative pb-12 last:pb-0`}
                style={{
                  animationDelay: `${0.1 + i * 0.12}s`,
                  display: "grid",
                  gridTemplateColumns: "var(--pill) 2rem 1fr",
                }}
              >
                {/* Year pill */}
                <div className="pt-0.5">
                  <span
                    className="hidden w-full rounded-full border px-3 py-1 text-center md:inline-block font-mono text-sm text-heading"
                    style={{
                      borderColor: "color-mix(in srgb, var(--color-body), transparent 80%)",
                      background: "var(--color-panel)",
                    }}
                  >
                    {e.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute top-2 h-4 w-4 -translate-x-1/2 rounded-full border-[3px]"
                    style={{
                      left: "1rem",
                      background: color,
                      borderColor: "var(--color-bg)",
                      boxShadow: `0 0 0 2px ${color}`,
                    }}
                  >
                    {e.current && (
                      <span
                        className="absolute inset-0 animate-ping rounded-full"
                        style={{ background: color, opacity: 0.6 }}
                      />
                    )}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 pl-1 md:pl-2">
                  {/* Year sits above the title on phones; the pill column is desktop-only */}
                  <span
                    className="mb-2 inline-block rounded-full border px-2.5 py-0.5 font-mono text-xs text-heading md:hidden"
                    style={{
                      borderColor: "color-mix(in srgb, var(--color-body), transparent 80%)",
                      background: "var(--color-panel)",
                    }}
                  >
                    {e.year}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-heading">
                    {e.title}
                  </h3>
                  <p className="mt-0.5 font-medium" style={{ color }}>
                    {e.org}
                  </p>
                  <p className="mt-1 font-mono text-xs text-body/60">{e.meta}</p>

                  {e.summary && (
                    <p className="mt-3 leading-relaxed text-body/80">{e.summary}</p>
                  )}

                  {e.points && (
                    <ul className="mt-3 space-y-2">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3 text-sm leading-relaxed text-body/70">
                          <span
                            aria-hidden
                            className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full"
                            style={{ background: color }}
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {e.results && (
                    <dl
                      className="mt-4 flex flex-wrap gap-x-10 gap-y-4 border-t pt-4"
                      style={{
                        borderColor: "color-mix(in srgb, var(--color-body), transparent 85%)",
                      }}
                    >
                      {e.results.map((r) => (
                        <div key={r.label}>
                          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-body/60">
                            {r.label}
                          </dt>
                          <dd className="mt-1 font-display text-2xl font-semibold text-heading">
                            {r.value}
                            {r.note && (
                              <span className="ml-1 font-mono text-sm font-normal text-body/60">
                                {r.note}
                              </span>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {e.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md px-2.5 py-1 font-mono text-xs"
                          style={{
                            color,
                            background: `color-mix(in srgb, ${color}, transparent 90%)`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
