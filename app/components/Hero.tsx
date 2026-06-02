"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const typedItems = [
  { prefix: "a passionate ", role: "software developer" },
  { prefix: "an ambitious ", role: "IT undergraduate" },
  { prefix: "a driven ", role: "AI enthusiast" },
  { prefix: "a versatile ", role: "full-stack engineer" },
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [itemIndex, setItemIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Combine prefix and role to compute the full string to type out
    const currentItem = typedItems[itemIndex];
    const fullWord = `${currentItem.prefix}${currentItem.role}`;
    
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAtEnd = 1500;

    const timeout = setTimeout(
      () => {
        if (!isDeleting && typedText === fullWord) {
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
            ? fullWord.substring(0, prev.length - 1)
            : fullWord.substring(0, prev.length + 1),
        );
      },
      typedText === fullWord && !isDeleting ? pauseAtEnd : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, itemIndex]);

  // Helper logic to split the currently typed text between the normal prefix and the colored role
  const currentItem = typedItems[itemIndex];
  const prefixLength = currentItem.prefix.length;
  
  let renderPrefix = "";
  let renderRole = "";

  if (typedText.length <= prefixLength) {
    renderPrefix = typedText;
  } else {
    renderPrefix = currentItem.prefix;
    renderRole = typedText.substring(prefixLength);
  }

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
              {/* The prefix stays normal color, the role gets the custom colored style */}
              <span>I&apos;m {renderPrefix}</span>
              <span className={styles.typed}>{renderRole}</span>
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
