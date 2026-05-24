"use client";

import styles from "./About.module.css";

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

const facts = [
  { icon: "bi-cup-hot", label: "Coffee Lover" },
  { icon: "bi-book", label: "Tech Reader" },
  { icon: "bi-music-note-beamed", label: "Music" },
  { icon: "bi-globe", label: "Open Source" },
];

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        {/* Section Title */}
        <div className="section-title">
          <h2>About</h2>
          <p>
            A bit about who I am, what I build, and how I got here.
          </p>
        </div>

        {/* Intro + Photo */}
        <div className={styles.introRow}>
          <div className={styles.introContent}>
            <span className={styles.eyebrow}>Hello there</span>
            <h2 className={styles.headline}>
              Hi, I&apos;m Nethuni &mdash; a curious developer building thoughtful,
              AI-driven software
            </h2>
            <p className={styles.lead}>
              I&apos;m a final-year IT undergraduate at the University of Moratuwa,
              passionate about turning ideas into clean, maintainable systems. My
              recent work has focused on Large Language Models and
              Retrieval-Augmented Generation, where I get to mix solid engineering
              with the messier edges of AI.
            </p>
            <p>
              Outside of code, I write on Medium about the things I learn,
              tinker with side projects, and keep an eye on where developer
              tooling is heading.
            </p>

            <div className={styles.ctaGroup}>
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

          <div className={styles.profileFigure}>
            <div className={styles.profilePhoto}>
              <img src="/profile.jpg" alt="Nethuni Rajapakse" />
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill.title} className={styles.skillItem}>
              <i className={`bi ${skill.icon}`}></i>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          ))}
        </div>

        {/* Journey Timeline */}
        <div className={styles.timelineGrid}>
          {timeline.map((item) => (
            <article key={item.year} className={styles.timelineItem}>
              <span className={styles.dot}></span>
              <time>{item.year}</time>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>

        {/* Quote */}
        <blockquote className={styles.personalQuote}>
          <p>
            &ldquo;Good software is the boring kind that quietly does what you
            expect &mdash; every single time.&rdquo;
          </p>
        </blockquote>

        {/* Fun Facts */}
        <div className={styles.factsGrid}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.factPill}>
              <i className={`bi ${fact.icon}`}></i>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
