"use client";

import { useInView } from "../hooks/useInView";
import { competitions } from "../data/community";
import EventPhotos from "./EventPhotos";
import ScrambleText from "./ScrambleText";
import TiltCard from "./TiltCard";

const BORDER = "color-mix(in srgb, var(--color-body), transparent 92%)";

export default function Competitions() {
  const { ref, inView } = useInView<HTMLElement>();
  const withPhotos = (c: (typeof competitions)[number]) => (c.photos?.length ?? 0) > 0;

  return (
    <section id="competitions" ref={ref} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-sm tracking-tight text-accent">
            — hackathons &amp; competitions
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-heading">
            <ScrambleText text="Building under the clock" />
          </h2>
          <p className="mt-4 leading-relaxed text-body/80">
            Design sprints and programming contests where I worked with a team to ship
            an idea or solve problems against the clock.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {competitions.map((c, i) => (
            <div
              key={c.id}
              className={`${inView ? "animate-reveal" : "opacity-0"} lg:col-span-2`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <TiltCard intensity={4} fill={false} className="rounded-[var(--radius-card)]">
                <article
                  className={`spot flex flex-col gap-5 overflow-hidden rounded-[var(--radius-card)] border bg-surface p-5 sm:p-6 ${
                    withPhotos(c) ? "lg:flex-row lg:gap-7" : ""
                  }`}
                  style={{ borderColor: BORDER }}
                >
                  {withPhotos(c) && (
                    <div className="w-full overflow-hidden rounded-lg sm:max-w-sm lg:w-64 lg:max-w-none lg:shrink-0 lg:self-start">
                      <EventPhotos
                        photos={c.photos ?? []}
                        title={`${c.title} · ${c.event}`}
                        icon="bi-trophy"
                        fit={c.photoFit}
                        aspect="aspect-[4/3]"
                      />
                    </div>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                      {c.result && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs"
                          style={{
                            color: "var(--color-amber)",
                            background:
                              "color-mix(in srgb, var(--color-amber), transparent 88%)",
                          }}
                        >
                          <i className="bi bi-trophy-fill" /> {c.result}
                        </span>
                      )}
                      {c.date && (
                        <span className="font-mono text-xs text-body/50">{c.date}</span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-semibold text-heading sm:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-1 font-medium text-accent">{c.event}</p>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-body/60">
                      {c.organiser}
                    </p>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-body/75">
                      {c.description}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
