"use client";

import { useInView } from "../hooks/useInView";
import SkillSpace from "./Skillspace";

const skills = [
  {
    icon: "bi-hdd-stack",
    title: "Backend & reliability",
    desc: "Building resilient services that stay correct under failure, load, and retries.",
  },
  {
    icon: "bi-arrow-repeat",
    title: "DevOps & CI/CD",
    desc: "Automating build, test, and deployment pipelines with security checks along the way.",
  },
  {
    icon: "bi-activity",
    title: "Cloud & observability",
    desc: "Running containerized workloads in the cloud with logging and metrics built in.",
  },
  {
    icon: "bi-cpu",
    title: "AI at the edge",
    desc: "Bringing model inference onto resource-constrained devices through optimization.",
  },
];

export default function About() {
  const { ref, inView } = useInView<HTMLElement>();
  const reveal = (delay: string) =>
    `${inView ? "animate-reveal" : "opacity-0"}`;

  return (
    <section id="about" ref={ref} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 font-mono text-sm tracking-tight text-accent">
            — about
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-heading">
            Who I am, and what I build
          </h2>
        </div>

        {/* Intro + skill space */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[5fr_7fr]">
          <figure
            className={`${reveal("0.25s")} relative mx-auto w-full max-w-[360px]`}
            style={{ animationDelay: "0.25s" }}
          >
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-accent), transparent 80%) 0%, transparent 65%)",
              }}
            />
            <SkillSpace animate={inView} />
          </figure>

          <div>
            <h3
              className={`${reveal("0.15s")} font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-medium leading-snug text-heading`}
              style={{ animationDelay: "0.15s" }}
            >
              Hi, I&apos;m <span className="text-accent">Nethuni</span>. I care
              about software that quietly does its job under pressure.
            </h3>

            <p
              className={`${reveal("0.25s")} mt-5 leading-relaxed text-body/80`}
              style={{ animationDelay: "0.25s" }}
            >
              I&apos;m a final-year IT undergraduate at the University of
              Moratuwa, drawn to backend systems and the unglamorous work of
              making them reliable: idempotency, failure recovery, clean
              deploys. More recently I&apos;ve been pulling that same discipline
              into AI, from RAG pipelines to running quantized language models
              on-device.
            </p>

            <p
              className={`${reveal("0.32s")} mt-4 leading-relaxed text-body/70`}
              style={{ animationDelay: "0.32s" }}
            >
              Outside of code, I write on Medium about what I learn and keep an
              eye on where developer tooling is heading.
            </p>

            <div
              className={`${reveal("0.4s")} mt-7 flex flex-wrap items-center gap-5`}
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-[var(--radius-card)] border px-5 py-2.5 font-medium text-heading transition hover:border-accent hover:text-accent"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--color-body), transparent 82%)",
                }}
              >
                View my work <i className="bi bi-arrow-up-right" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm text-body/80 underline-offset-4 transition hover:text-accent hover:underline"
              >
                résumé <i className="bi bi-download" />
              </a>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-24">
          <p className="mb-8 font-mono text-sm tracking-tight text-accent">
            — what I do
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, i) => (
              <div
                key={skill.title}
                className={`${reveal(`${0.1 + i * 0.08}s`)} rounded-[var(--radius-card)] border p-6 transition hover:-translate-y-1`}
                style={{
                  animationDelay: `${0.1 + i * 0.08}s`,
                  borderColor:
                    "color-mix(in srgb, var(--color-body), transparent 90%)",
                  background:
                    "color-mix(in srgb, var(--color-surface), transparent 20%)",
                }}
              >
                <span
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl text-accent"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-accent), transparent 88%)",
                  }}
                >
                  <i className={`bi ${skill.icon}`} />
                </span>
                <h3 className="mb-1.5 font-display text-lg font-semibold text-heading">
                  {skill.title}
                </h3>
                <p className="text-sm leading-relaxed text-body/70">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote — the reliability thesis, elevated */}
        <blockquote
          className={`${reveal("0.05s")} mx-auto mt-24 max-w-3xl border-l-2 pl-6 font-display text-[clamp(1.35rem,3vw,1.9rem)] font-medium leading-snug text-heading/90`}
          style={{
            animationDelay: "0.05s",
            borderColor: "var(--color-accent)",
          }}
        >
          Good software is the boring kind that quietly does what you expect,
          every single time.
        </blockquote>
      </div>
    </section>
  );
}
