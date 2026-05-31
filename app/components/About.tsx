"use client";

import styles from "./About.module.css";
import { useInView } from  "../hooks/useInView";

const skills = [
  {
    icon: "bi-code-slash",
    title: "Full-Stack Development",
    desc: "React, Next.js, Node.js, and modern web stacks.",
  },
  {
    icon: "bi-cpu",
    title: "AI & LLMs",
    desc: "RAG architectures, fine-tuning, and prompt engineering.",
  },
  {
    icon: "bi-database",
    title: "Backend & Data",
    desc: "Scalable APIs, databases, and system design.",
  },
  {
    icon: "bi-phone",
    title: "Mobile-first UI",
    desc: "Responsive interfaces with thoughtful UX.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "Started at University of Moratuwa",
    desc: "Began IT undergraduate journey.",
  },
  {
    year: "2023",
    title: "First Full-stack Project",
    desc: "Built and shipped end-to-end web applications.",
  },
  {
    year: "2024",
    title: "Diving into AI/LLMs",
    desc: "Started exploring RAG systems and LLM applications.",
  },
  {
    year: "2025",
    title: "Final-year Research",
    desc: "Focused on production-grade AI-driven solutions.",
  },
];

export default function About() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={`section ${styles.about} ${inView ? styles.inView : ""}`}
    >
      <div className="container">
        {/* Section Title */}
        <div className="section-title">
          <h2>About</h2>
          <p>A bit about who I am, what I build, and how I got here.</p>
        </div>

        {/* Intro + Photo */}
        <div className={styles.introRow}>
          <div className={styles.introContent}>
            <h2
              className={`${styles.reveal} ${styles.headline}`}
              style={{ "--delay": "0.15s" } as any}
            >
              Hi, I&apos;m <span className={styles.name}>Nethuni</span> &mdash;
              a curious developer building thoughtful, AI-driven software
            </h2>

            <p
              className={`${styles.reveal} ${styles.lead}`}
              style={{ "--delay": "0.25s" } as any}
            >
              I&apos;m a final-year IT undergraduate at the University of
              Moratuwa, passionate about turning ideas into clean, maintainable
              systems. My recent work has focused on Large Language Models and
              Retrieval-Augmented Generation, where I get to mix solid
              engineering with the messier edges of AI.
            </p>

            <p className={styles.reveal} style={{ "--delay": "0.32s" } as any}>
              Outside of code, I write on Medium about the things I learn,
              tinker with side projects, and keep an eye on where developer
              tooling is heading.
            </p>

            <div
              className={`${styles.reveal} ${styles.ctaGroup}`}
              style={{ "--delay": "0.4s" } as any}
            >
              <a href="#projects" className={styles.btnGhost}>
                View My Work <i className="bi bi-arrow-up-right"></i>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkUnderline}
              >
                Download Resume <i className="bi bi-download"></i>
              </a>
            </div>
          </div>

          <div
            className={`${styles.reveal} ${styles.profileFigure}`}
            style={{ "--delay": "0.25s" } as any}
          >
            <div className={styles.profileWrapper}>
              <div className={styles.profileGlow} aria-hidden="true" />
              <div className={styles.profilePhoto}>
                <img src="/profile.jpg" alt="Nethuni Rajapakse" />
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className={styles.skillsBlock}>
          <p
            className={`${styles.reveal} ${styles.groupLabel}`}
            style={{ "--delay": "0.05s" } as any}
          >
            What I do
          </p>
          <div className={styles.skillsGrid}>
            {skills.map((skill, i) => (
              <div
                key={skill.title}
                className={`${styles.reveal} ${styles.skillItem}`}
                style={{ "--delay": `${0.1 + i * 0.08}s` } as any}
              >
                <span className={styles.iconWrap}>
                  <i className={`bi ${skill.icon}`}></i>
                </span>
                <h3>{skill.title}</h3>
                <p>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline
        <div className={styles.timelineBlock}>
          <p
            className={`${styles.reveal} ${styles.groupLabel}`}
            style={{ "--delay": "0.05s" } as any}
          >
            My journey
          </p>
          <div className={styles.timelineGrid}>
            {timeline.map((item, i) => (
              <article
                key={item.year}
                className={`${styles.reveal} ${styles.timelineItem}`}
                style={{ "--delay": `${0.1 + i * 0.08}s` } as any}
              >
                <span className={styles.dot}></span>
                <time>{item.year}</time>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div> */}

        {/* Quote */}
        <blockquote
          className={`${styles.reveal} ${styles.personalQuote}`}
          style={{ "--delay": "0.05s" } as any}
        >
          <p>
            Good software is the boring kind that quietly does what you expect
            &mdash; every single time.
          </p>
        </blockquote>
      </div>
    </section>
  );
}
