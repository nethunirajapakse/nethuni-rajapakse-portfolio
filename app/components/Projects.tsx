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
    title: "Orbiting Planet",
    description:
      "Interactive 3D astronomical scene with real-time WebGL rendering, orbit animations, and dynamic lighting — all running in the browser.",
    category: "web",
    tags: ["Three.js", "WebGL", "Vite", "JavaScript"],
    githubUrl: "https://github.com/nethunirajapakse/orbiting-planet",
    liveUrl: "https://orbiting-planet.vercel.app/",
    icon: "bi-globe2",
  },
  {
    id: 2,
    title: "EstateVision",
    description:
      "ML-powered property valuation tool for the Sri Lankan market. Predicts prices from 20 features and explains predictions with SHAP visualizations.",
    category: "ai",
    tags: ["Python", "Flask", "XGBoost", "SHAP", "Vite"],
    githubUrl: "https://github.com/nethunirajapakse/SL-Property-Value-Predictor",
    icon: "bi-house-check",
  },
  {
    id: 3,
    title: "Bicycle Safety System",
    description:
      "Arduino-based IoT system with GPS tracking, crash detection, electronic lock, speedometer, and GSM emergency alerts — built as a university L1 hardware project.",
    category: "fullstack",
    tags: ["Arduino", "C++", "GPS", "GSM", "IoT", "EasyEDA"],
    githubUrl: "https://github.com/nethunirajapakse/Safety-and-security-system-for-bicycle",
    icon: "bi-shield-check",
  },
  {
    id: 4,
    title: "Cosmic Edu App",
    description:
      "React Native app fetching NASA's APOD data, with user auth, dynamic card views, and global session-based click tracking.",
    category: "fullstack",
    tags: ["React Native", "Expo", "expo-router", "NASA API"],
    githubUrl: "https://github.com/nethunirajapakse/cosmic-edu-app",
    icon: "bi-stars",
  },
  {
    id: 5,
    title: "CeylonWild",
    description:
      "A rule-based, light-weight expert recommender system that utilizes a CLIPS-driven production engine to translate user climate, activity, and logistical preferences into mathematically normalized eco-tourism recommendations for Sri Lanka.",
    category: "ai",
    tags: ["Python", "Flask", "CLIPS", "Expert Systems", "TypeScript"],
    githubUrl: "https://github.com/nethunirajapakse/eco-trip-recommender",
    icon: "bi-tree",
  },
  {
    id: 6,
    title: "Ascendia",
    description:
      "Comprehensive construction project management system featuring a web dashboard and mobile client. Supports multi-role user management, real-time inventory tracking with automated low-stock alerts, and task scheduling.",
    category: "fullstack",
    tags: ["ReactJS", "Spring Boot", "MySQL", "Flutter", "Tailwind CSS", "Socket.io"],
    githubUrl: "https://github.com/Jayaweera123/Ascendia-",
    icon: "bi-building-gear",
  },
  {
    id: 7,
    title: "JokeHub",
    description:
      "A cross-platform Flutter application built for mobile, web, and desktop. Fetches dynamic joke data from an external REST API and implements robust local caching mechanics for seamless offline usability.",
    category: "web",
    tags: ["Flutter", "Dart", "REST API", "Offline Caching"],
    githubUrl: "https://github.com/nethunirajapakse/joke-hub",
    icon: "bi-emoji-laughing",
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
