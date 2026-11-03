"use client";

import { useInView } from "../hooks/useInView";
import { skillGroups, type SkillItem } from "../data/skills";
import ScrambleText from "./ScrambleText";
import TiltCard from "./TiltCard";

const logoUrl = (s: SkillItem) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s.logo}/${s.logo}-${
    s.wordmark ? "original-wordmark" : "original"
  }.svg`;

function Chip({ skill }: { skill: SkillItem }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-xs text-body transition hover:border-accent hover:text-accent"
      style={{
        borderColor: "color-mix(in srgb, var(--color-body), transparent 85%)",
        background: "color-mix(in srgb, var(--color-body), transparent 96%)",
      }}
    >
      {skill.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl(skill)}
          alt=""
          width={14}
          height={14}
          loading="lazy"
          className="h-3.5 w-3.5 shrink-0 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <i aria-hidden className={`bi ${skill.icon ?? "bi-code-slash"} shrink-0 text-[0.8rem] text-accent`} />
      )}
      {skill.name}
    </span>
  );
}

export default function Skills() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section id="skills" ref={ref} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-sm tracking-tight text-accent">
            — skills
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-heading">
            <ScrambleText text="Tools I build with" />
          </h2>
          <p className="mt-4 leading-relaxed text-body/80">
            The languages, frameworks and practices I use across coursework, internships
            and personal projects.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <div
              key={g.number}
              className={`${inView ? "animate-reveal" : "opacity-0"} h-full`}
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              <TiltCard intensity={5} className="rounded-[var(--radius-card)]">
                <article
                  className="spot flex h-full flex-col rounded-[var(--radius-card)] border bg-surface p-6"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--color-body), transparent 92%)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-heading">
                      {g.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-body/70">
                    {g.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <Chip key={s.name} skill={s} />
                    ))}
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
