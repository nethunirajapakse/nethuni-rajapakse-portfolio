import Image from "next/image";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import ResilienceDemo from "./ResilienceDemo";

/**
 * Hero — no "use client" needed. The old version needed it only for the
 * typewriter; without that, this is a pure server component (faster, less JS).
 * Entrance animation is CSS-only via the `reveal` animation + staggered delays.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden py-20"
    >
      {/* Single ambient glow — one accessory, not two */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[6%] -top-[12%] -z-10 h-[46vw] max-h-[620px] w-[46vw] max-w-[620px] rounded-full blur-[64px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent), transparent 86%) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        {/* ---------------- Content ---------------- */}
        <div className="flex flex-col items-start max-md:items-center max-md:text-center">
          {/* Status eyebrow — monospace, functional green dot. This is the
              signature voice: system-status language, and it's actually true. */}
          <p
            className="animate-reveal mb-7 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono text-[0.78rem] tracking-tight text-body/90 backdrop-blur"
            style={{
              animationDelay: "0.1s",
              borderColor:
                "color-mix(in srgb, var(--color-accent), transparent 76%)",
              background:
                "color-mix(in srgb, var(--color-surface), transparent 30%)",
            }}
          >
            {/* <span
              className="h-2 w-2 rounded-full bg-[#22c55e]"
              style={{ animation: "statusPulse 2.2s ease-out infinite" }}
            /> */}
            aspiring software engineer
          </p>

          <h1
            className="animate-reveal font-display text-[clamp(2.6rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-heading"
            style={{ animationDelay: "0.2s" }}
          >
            <ScrambleText text="Nethuni Rajapakse" on="boot" duration={1100} />
          </h1>

          {/* The thesis — one honest, memorable line instead of a typewriter */}
          <p
            className="animate-reveal mt-5 font-display text-[clamp(1.3rem,2.6vw,1.75rem)] font-medium leading-snug text-heading/85"
            style={{ animationDelay: "0.3s" }}
          >
            Build. Break. <span className="text-accent">Learn.</span>
          </p>

          <p
            className="animate-reveal mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-body/75"
            style={{ animationDelay: "0.4s" }}
          >
            {/* University of Moratuwa IT graduate with hands-on microservices and
            CI/CD experience, drawn to reliability engineering and a growing
            lean into AI at the edge. */}
          </p>

          {/* Actions */}
          <div
            className="animate-reveal mt-9 flex flex-wrap gap-3 max-md:justify-center max-[420px]:w-full max-[420px]:flex-col"
            style={{ animationDelay: "0.5s" }}
          >
            <Magnetic className="max-[420px]:w-full [&>a]:max-[420px]:w-full">
              <a
                href="#projects"
                className="rounded-[var(--radius-card)] bg-accent px-6 py-3 text-center font-medium !text-contrast transition hover:brightness-110 max-[420px]:w-full"
              >
                View projects
              </a>
            </Magnetic>
            <Magnetic className="max-[420px]:w-full [&>a]:max-[420px]:w-full">
              <a
                href="#contact"
                className="rounded-[var(--radius-card)] border px-6 py-3 text-center font-medium text-heading transition hover:border-accent hover:text-accent max-[420px]:w-full"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--color-body), transparent 82%)",
                }}
              >
                Get in touch
              </a>
            </Magnetic>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-4 py-3 font-mono text-sm text-body/80 transition hover:text-accent max-[420px]:w-full"
            >
              résumé
              <i className="bi bi-arrow-down-short transition group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* Socials */}
          <div
            className="animate-reveal mt-9 flex gap-3 max-md:justify-center"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              {
                href: "https://github.com/nethunirajapakse",
                icon: "bi-github",
                label: "GitHub",
              },
              {
                href: "https://linkedin.com/in/nethuni-rajapakse/",
                icon: "bi-linkedin",
                label: "LinkedIn",
              },
              {
                href: "https://medium.com/@nethunirajapakse/activity",
                icon: "bi-medium",
                label: "Medium",
              },
            ].map((s) => (
              <Magnetic key={s.label} strength={0.45}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-card)] border text-lg text-body transition hover:-translate-y-1 hover:border-accent hover:text-accent"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--color-body), transparent 86%)",
                    background:
                      "color-mix(in srgb, var(--color-surface), transparent 20%)",
                  }}
                >
                  <i className={`bi ${s.icon}`} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* ---------------- Portrait ----------------
            Clean: accent ring + soft glow + one true mono caption.
            The three floating buzzword cards are gone. */}
        <div className="flex justify-center">
          <figure
            className="animate-reveal relative w-full max-w-[380px]"
            style={{ animationDelay: "0.35s" }}
          >
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--color-accent), transparent 72%) 0%, transparent 65%)",
              }}
            />
            <TiltCard intensity={6} fill={false} className="rounded-3xl">
              <div
                className="relative aspect-square overflow-hidden rounded-3xl border shadow-2xl"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--color-accent), transparent 78%)",
                  background:
                    "linear-gradient(135deg, var(--color-surface), color-mix(in srgb, var(--color-surface), var(--color-accent) 12%))",
                }}
              >
                <Image
                  src="/nethuni.png"
                  alt="Nethuni Rajapakse"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                  priority
                />
              </div>
            </TiltCard>
            <figcaption className="mt-4 text-center font-mono text-[0.8rem] text-body/60">
              {"// Moratuwa, Sri Lanka"}
            </figcaption>
            {/* <ResilienceDemo /> */}
          </figure>
        </div>
      </div>
    </section>
  );
}
