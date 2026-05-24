"use client";

import { useState } from "react";
import styles from "./Projects.module.css";

type Project = {
  id: number;
  title: string;
  description: string;
  category: "ai" | "fullstack" | "web";
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  icon: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "RAG-Powered Knowledge Assistant",
    description:
      "Retrieval-Augmented Generation system that answers questions from a custom document corpus using vector embeddings.",
    category: "ai",
    tags: ["Python", "LangChain", "OpenAI", "ChromaDB"],
    githubUrl: "https://github.com/nethunirajapakse",
    icon: "bi-cpu",
  },
  {
    id: 2,
    title: "Full-Stack E-Commerce Platform",
    description:
      "Production-ready commerce app with cart, checkout, auth, and admin dashboard. Built mobile-first.",
    category: "fullstack",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/nethunirajapakse",
    icon: "bi-cart-check",
  },
  {
    id: 3,
    title: "LLM Fine-Tuning Pipeline",
    description:
      "End-to-end pipeline for fine-tuning open-source language models on domain-specific data.",
    category: "ai",
    tags: ["PyTorch", "HuggingFace", "Python", "MLOps"],
    githubUrl: "https://github.com/nethunirajapakse",
    icon: "bi-diagram-3",
  },
  {
    id: 4,
    title: "Personal Portfolio Site",
    description:
      "This site &mdash; a Next.js portfolio with a clean, dark aesthetic and smooth section navigation.",
    category: "web",
    tags: ["Next.js", "TypeScript", "CSS Modules"],
    githubUrl: "https://github.com/nethunirajapakse",
    icon: "bi-window-stack",
  },
  {
    id: 5,
    title: "Task Management API",
    description:
      "RESTful API with JWT auth, role-based access control, and real-time updates via websockets.",
    category: "fullstack",
    tags: ["Node.js", "Express", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/nethunirajapakse",
    icon: "bi-list-check",
  },
  {
    id: 6,
    title: "Sentiment Analysis Dashboard",
    description:
      "Real-time sentiment analysis of social media streams with visualizations and trend tracking.",
    category: "ai",
    tags: ["Python", "FastAPI", "React", "ML"],
    githubUrl: "https://github.com/nethunirajapakse",
    icon: "bi-graph-up",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "web", label: "Web" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <div className="section-title">
          <h2>Projects</h2>
          <p>
            A selection of things I&apos;ve built &mdash; ranging from full-stack
            web apps to AI-driven systems.
          </p>
        </div>

        {/* Filters */}
        <ul className={styles.filters}>
          {filters.map((f) => (
            <li
              key={f.key}
              className={activeFilter === f.key ? styles.active : ""}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </li>
          ))}
        </ul>

        {/* Project Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.cardIcon}>
                <i className={`bi ${project.icon}`}></i>
              </div>

              <div className={styles.cardBody}>
                <h4
                  dangerouslySetInnerHTML={{ __html: project.title }}
                ></h4>
                <p
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></p>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.cardLinks}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                    >
                      <i className="bi bi-github"></i>
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View live"
                    >
                      <i className="bi bi-box-arrow-up-right"></i>
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
