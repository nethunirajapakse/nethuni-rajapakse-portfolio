"use client";

import { useState } from "react";
import Image from "next/image";
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
  // {
  //   id: 1,
  //   title: "Orbiting Planet",
  //   description:
  //     "Interactive 3D astronomical scene with real-time WebGL rendering, orbit animations, and dynamic lighting — all running in the browser.",
  //   category: "web",
  //   tags: ["Three.js", "WebGL", "Vite", "JavaScript"],
  //   githubUrl: "https://github.com/nethunirajapakse/orbiting-planet",
  //   liveUrl: "https://orbiting-planet.vercel.app/",
  //   icon: "bi-globe2",
  //   image: "/projects/orbiting-planet.png",
  //   year: "2024",
  // },
  {
    id: 2,
    title: "EstateVision",
    description:
      "ML-powered property valuation tool for the Sri Lankan market. Predicts prices from 20 features and explains predictions with SHAP visualizations.",
    category: "ai",
    tags: ["Python", "Flask", "XGBoost", "SHAP", "Vite"],
    githubUrl: "https://github.com/nethunirajapakse/SL-Property-Value-Predictor",
    icon: "bi-house-check",
    image: "/projects/estatevision.png",
    year: "2026",
  },
  {
    id: 3,
    title: "Bicycle Safety System",
    description:
      "Arduino-based IoT system with GPS tracking, crash detection, electronic lock, speedometer, and GSM emergency alerts. Built as a university L1 hardware project.",
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
      "A rule-based, light-weight expert recommender system that uses a CLIPS-driven production engine to translate climate, activity, and logistical preferences into normalized eco-tourism recommendations for Sri Lanka.",
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
      "Construction project management system with a web dashboard and mobile client. Multi-role user management, real-time inventory tracking with low-stock alerts, and task scheduling.",
    category: "fullstack",
    tags: ["ReactJS", "Spring Boot", "MySQL", "Flutter", "Tailwind CSS", "Socket.io"],
    githubUrl: "https://github.com/Jayaweera123/Ascendia-",
    icon: "bi-building-gear",
    image: "/projects/ascendia.png",
    year: "2024",
  },
  {
    id: 7,
    title: "JokeHub",
    description:
      "A cross-platform Flutter app for mobile, web, and desktop. Fetches dynamic joke data from a REST API and implements local caching for seamless offline usability.",
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
      "Full-stack Spotify analytics dashboard. Continuously syncs listening history into a database via a background job, then surfaces insights Spotify doesn't: trends, genre distribution, hourly activity, and top artists/tracks by real play count.",
    category: "fullstack",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "TanStack Query"],
    githubUrl: "https://github.com/nethunirajapakse/spoti-insights",
    liveUrl: "https://spoti-insights-app.onrender.com/",
    icon: "bi-spotify",
    image: "/projects/spoti-insights.png",
    year: "2026",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "web", label: "Web" },
];

const INITIAL_COUNT = 3;

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const { ref, inView } = useInView<HTMLElement>();

  const sortedProjects = (
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter)
  )
    .slice()
    .sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year));

  const visibleProjects = showAll
    ? sortedProjects
    : sortedProjects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" ref={ref} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-sm tracking-tight text-accent">
            — projects
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-heading">
            Things I&apos;ve built
          </h2>
          <p className="mt-3 leading-relaxed text-body/70">
            A selection ranging from full-stack web apps to AI-driven systems.
          </p>
        </div>

        {/* Filters */}
        <div
          className={`${inView ? "animate-reveal" : "opacity-0"} mb-10 flex flex-wrap gap-2`}
          style={{ animationDelay: "0.05s" }}
        >
          {filters.map((f) => {
            const active = activeFilter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  setActiveFilter(f.key);
                  setShowAll(false);
                }}
                aria-pressed={active}
                className={`rounded-full px-5 py-2 font-mono text-sm transition ${
                  active ? "text-contrast" : "text-accent hover:brightness-110"
                }`}
                style={{
                  background: active
                    ? "var(--color-accent)"
                    : "color-mix(in srgb, var(--color-accent), transparent 90%)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <article
              key={project.id}
              className={`${inView ? "animate-reveal" : "opacity-0"} group flex flex-col overflow-hidden rounded-[var(--radius-card)] border bg-surface transition hover:-translate-y-2`}
              style={{
                animationDelay: `${0.1 + index * 0.07}s`,
                borderColor:
                  "color-mix(in srgb, var(--color-body), transparent 92%)",
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-heading">
                    {project.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-body/50">
                    {project.year}
                  </span>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-body/70">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 font-mono text-[0.7rem] text-accent"
                      style={{
                        background:
                          "color-mix(in srgb, var(--color-accent), transparent 90%)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="flex gap-5 border-t pt-4"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--color-body), transparent 92%)",
                  }}
                >
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-body transition hover:text-accent"
                    >
                      <i className="bi bi-github" /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-body transition hover:text-accent"
                    >
                      <i className="bi bi-box-arrow-up-right" /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {sortedProjects.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-mono text-sm text-accent transition hover:brightness-110"
              style={{
                background:
                  "color-mix(in srgb, var(--color-accent), transparent 90%)",
              }}
            >
              {showAll ? (
                <>
                  Show less <i className="bi bi-chevron-up" />
                </>
              ) : (
                <>
                  Show {sortedProjects.length - INITIAL_COUNT} more{" "}
                  <i className="bi bi-chevron-down" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
