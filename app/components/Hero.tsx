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

  // Simple typed.js-style effect
  useEffect(() => {
    const currentWord = typedItems[itemIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAtEnd = 1500;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentWord) {
        // Pause, then start deleting
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
          : currentWord.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, itemIndex]);

  return (
    <section id="hero" className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Hello, I&apos;m{" "}
              <span className={styles.highlight}>Nethuni Rajapakse</span>
            </h1>
            <h2 className={styles.subtitle}>
              Passionate <span className={styles.typed}>{typedText}</span>
              <span className={styles.cursor}>|</span>
            </h2>
            <p className={styles.description}>
              Final-year undergraduate at the University of Moratuwa. I
              specialize in building scalable software systems and exploring
              AI-driven solutions, with a strong focus on Large Language Models
              and RAG architectures.
            </p>

            <div className={styles.actions}>
              <a href="#projects" className="btn btn-primary">
                View My Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                Get In Touch
              </a>
            </div>

            <div className={styles.socialLinks}>
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

          <div className={styles.imageBlock}>
            <div className={styles.imageWrapper}>
              {/* Replace src with your own image once you have one in /public */}
              <div className={styles.profilePlaceholder}>
                <img src="/profile.jpg" alt="Nethuni Rajapakse" />
              </div>

              <div className={styles.floatingElements}>
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
