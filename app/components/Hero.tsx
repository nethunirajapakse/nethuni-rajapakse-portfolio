"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const typedItems = [
  "Software Developer",
  "IT Undergraduate",
  "AI Enthusiast",
  "Full-stack Engineer",
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [itemIndex, setItemIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentWord = typedItems[itemIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAtEnd = 1500;

    const timeout = setTimeout(
      () => {
        if (!isDeleting && typedText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseAtEnd);
          return;
        }
        if (isDeleting && typedText === "") {
          setIsDeleting(false);
          setItemIndex((prev) => (prev + 1) % typedItems.length);
          return;
        }
        setTypedText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1),
        );
      },
      typedText === currentWord && !isDeleting ? pauseAtEnd : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, itemIndex]);

  return (
    <section id="hero" className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.row}>
          {/* ---------------- Content ---------------- */}
          <div className={styles.content}>
            <h1
              className={`${styles.reveal} ${styles.title}`}
              style={{ "--delay": "0.15s" } as any}
            >
              Hello, I&apos;m{" "}
              <span className={styles.name}>Nethuni Rajapakse</span>
            </h1>

            <h2
              className={`${styles.reveal} ${styles.subtitle}`}
              style={{ "--delay": "0.25s" } as any}
            >
              Passionate <span className={styles.typed}>{typedText}</span>
              <span className={styles.cursor} aria-hidden="true">
                |
              </span>
            </h2>

            <p
              className={`${styles.reveal} ${styles.description}`}
              style={{ "--delay": "0.35s" } as any}
            >
              Final-year undergraduate at the University of Moratuwa. I
              specialize in building scalable software systems and exploring
              AI-driven solutions, with a strong focus on Large Language Models
              and RAG architectures.
            </p>

            <div
              className={`${styles.reveal} ${styles.actions}`}
              style={{ "--delay": "0.45s" } as any}
            >
              <a href="#projects" className="btn btn-primary">
                View My Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                Get In Touch
              </a>
            </div>

            <div
              className={`${styles.reveal} ${styles.socialLinks}`}
              style={{ "--delay": "0.55s" } as any}
            >
              <a
                href="https://medium.com/@nethunirajapakse/activity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
              >
                <i className="bi bi-medium"></i>
              </a>
              <a
                href="https://linkedin.com/in/nethuni-rajapakse/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://github.com/nethunirajapakse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          {/* ---------------- Image ---------------- */}
          <div className={styles.imageBlock}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageGlow} aria-hidden="true" />

              <div className={styles.imageFrame}>
                <img src="/me.png" alt="Nethuni Rajapakse" />
              </div>

              <div className={styles.floatingElements} aria-hidden="true">
                <div className={`${styles.floatingCard} ${styles.cardAi}`}>
                  <i className="bi bi-cpu"></i>
                  <span>AI &amp; ML</span>
                </div>
                <div className={`${styles.floatingCard} ${styles.cardDev}`}>
                  <i className="bi bi-code-slash"></i>
                  <span>Dev</span>
                </div>
                <div className={`${styles.floatingCard} ${styles.cardWriter}`}>
                  <i className="bi bi-journal-text"></i>
                  <span>Writer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
