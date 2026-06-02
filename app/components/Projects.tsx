"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Projects.module.css";
import { useInView } from "../hooks/useInView";

type Project = {
  id: number;
  title: string;
  description: string;
  category: "ai" | "fullstack" | "web";
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  icon: string;
  image: string;
  year: string;
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
    image: "/projects/orbiting-planet.png",
    year: "2024",
  },
  {
    id: 2,
    title: "EstateVision",
    description:
      "ML-powered property valuation tool for the Sri Lankan market. Predicts prices from 20 features and explains predictions with SHAP visualizations.",
    category: "ai",
    tags: ["Python", "Flask", "XGBoost", "SHAP", "Vite"],
    githubUrl:
      "https://github.com/nethunirajapakse/SL-Property-Value-Predictor",
    icon: "bi-house-check",
    image: "/projects/estatevision.png",
    year: "2026",
  },
  {
    id: 3,
    title: "Bicycle Safety System",
    description:
      "Arduino-based IoT system with GPS tracking, crash detection, electronic lock, speedometer, and GSM emergency alerts — built as a university L1 hardware project.",
    category: "fullstack",
    tags: ["Arduino", "C++", "GPS", "GSM", "IoT", "EasyEDA"],
    githubUrl:
      "https://github.com/nethunirajapakse/Safety-and-security-system-for-bicycle",
    icon: "bi-shield-check",
    image: "/projects/bicycle-safety.png",
    year: "2023",
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
    image: "/projects/cosmic-edu.png",
    year: "2024",
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
    image: "/projects/ceylonwild.png",
    year: "2025",
  },
  {
    id: 6,
    title: "Ascendia",
    description:
      "Comprehensive construction project management system featuring a web dashboard and mobile client. Supports multi-role user management, real-time inventory tracking with automated low-stock alerts, and task scheduling.",
    category: "fullstack",
    tags: [
      "ReactJS",
      "Spring Boot",
      "MySQL",
      "Flutter",
      "Tailwind CSS",
      "Socket.io",
    ],
    githubUrl: "https://github.com/Jayaweera123/Ascendia-",
    icon: "bi-building-gear",
    image: "/projects/ascendia.png",
    year: "2024",
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
    image: "/projects/jokehub.png",
    year: "2024",
  },
  {
    id: 8,
    title: "Spoti-Insights",
    description:
      "Full-stack Spotify analytics dashboard. Continuously syncs your listening history into a database via a background job, then surfaces insights Spotify doesn't — listening trends, genre distribution, hourly activity, and top artists/tracks by real play count.",
    category: "fullstack",
    tags: [
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "TanStack Query",
    ],
    githubUrl: "https://github.com/nethunirajapakse/spoti-insights",
    liveUrl: "https://spoti-insights-app.onrender.com/",
    icon: "bi-spotify",
    image: "/projects/spoti-insights.png",
    year: "2025",
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
  const { ref, inView } = useInView<HTMLElement>();

  const filteredProjects = (
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter)
  )
    .slice()
    .sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year));

  return (
    <section
      id="projects"
      ref={ref}
      className={`section ${styles.projects} ${inView ? styles.inView : ""}`}
    >
      <div className="container">
        <div className="section-title">
          <h2>Projects</h2>
          <p>
            A selection of things I&apos;ve built &mdash; ranging from
            full-stack web apps to AI-driven systems.
          </p>
        </div>

        {/* Filters */}
        <ul
          className={`${styles.reveal} ${styles.filters}`}
          style={{ "--delay": "0.05s" } as any}
        >
          {filters.map((f) => (
            <li key={f.key}>
              <button
                type="button"
                className={`${styles.filterBtn} ${
                  activeFilter === f.key ? styles.active : ""
                }`}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Project Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.reveal} ${styles.card}`}
              style={{ "--delay": `${0.1 + index * 0.07}s` } as any}
            >
              <div className={styles.cardImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <h4>{project.title}</h4>
                  <span className={styles.year}>{project.year}</span>
                </div>

                <p>{project.description}</p>

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
