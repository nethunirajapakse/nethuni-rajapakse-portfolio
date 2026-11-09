export type Project = {
  id: number;
  codename: string;
  title: string;
  description: string;
  category: "ai" | "fullstack" | "web";
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  year: string;
  status: "deployed" | "active" | "archived";
};

export const projects: Project[] = [
   {
    id: 9,
    codename: "MSN-009",
    title: "Rostra",
    description:
      "Event-driven online auction platform built as four Spring Boot microservices (auth, auction, bidding, notification) behind a Spring Cloud Gateway. Services talk over Kafka with at-least-once delivery via the Transactional Outbox pattern, and concurrent bids are handled with JPA optimistic locking and Resilience4J circuit breakers.",
    category: "fullstack",
    tags: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Spring Cloud Gateway", "Docker"],
    githubUrl: "https://github.com/nethunirajapakse/rostra",
    image: "/projects/rostra.png",
    year: "2026",
    status: "active",
  },  
  {
    id: 8,
    codename: "MSN-008",
    title: "Spoti-Insights",
    description:
      "Full-stack Spotify analytics dashboard. Continuously syncs listening history via a background job, then surfaces insights Spotify doesn't: trends, genre distribution, hourly activity, and top artists by real play count.",
    category: "fullstack",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "TanStack Query"],
    githubUrl: "https://github.com/nethunirajapakse/spoti-insights",
    liveUrl: "https://spoti-insights-app.onrender.com/",
    image: "/projects/spoti-insights.png",
    year: "2026",
    status: "deployed",
  },
  {
    id: 2,
    codename: "MSN-002",
    title: "EstateVision",
    description:
      "ML-powered property valuation for the Sri Lankan market. Predicts prices from 20 features and explains every prediction with SHAP visualizations.",
    category: "ai",
    tags: ["Python", "Flask", "XGBoost", "SHAP", "Vite"],
    githubUrl: "https://github.com/nethunirajapakse/SL-Property-Value-Predictor",
    image: "/projects/estatevision.png",
    year: "2026",
    status: "active",
  },
  {
    id: 5,
    codename: "MSN-005",
    title: "CeylonWild",
    description:
      "Rule-based, lightweight expert recommender: a CLIPS-driven production engine translates climate, activity, and logistical preferences into normalized eco-tourism recommendations for Sri Lanka.",
    category: "ai",
    tags: ["Python", "Flask", "CLIPS", "Expert Systems", "TypeScript"],
    githubUrl: "https://github.com/nethunirajapakse/eco-trip-recommender",
    image: "/projects/ceylonwild.png",
    year: "2025",
    status: "active",
  },
  {
    id: 1,
    codename: "MSN-001",
    title: "Orbiting Planet",
    description:
      "Interactive 3D astronomical scene with real-time WebGL rendering, orbit animations, and dynamic lighting — all running in the browser.",
    category: "web",
    tags: ["Three.js", "WebGL", "Vite", "JavaScript"],
    githubUrl: "https://github.com/nethunirajapakse/orbiting-planet",
    liveUrl: "https://orbiting-planet.vercel.app/",
    image: "/projects/orbiting-planet.png",
    year: "2024",
    status: "deployed",
  },
  {
    id: 4,
    codename: "MSN-004",
    title: "Cosmic Edu App",
    description:
      "React Native app fetching NASA's APOD data, with user auth, dynamic card views, and global session-based click tracking.",
    category: "fullstack",
    tags: ["React Native", "Expo", "expo-router", "NASA API"],
    githubUrl: "https://github.com/nethunirajapakse/cosmic-edu-app",
    image: "/projects/cosmic-edu.png",
    year: "2024",
    status: "archived",
  },
  {
    id: 6,
    codename: "MSN-006",
    title: "Ascendia",
    description:
      "Construction project management system with web dashboard and mobile client. Multi-role user management, real-time inventory tracking with low-stock alerts, and task scheduling.",
    category: "fullstack",
    tags: ["ReactJS", "Spring Boot", "MySQL", "Flutter", "Tailwind CSS", "Socket.io"],
    githubUrl: "https://github.com/Jayaweera123/Ascendia-",
    image: "/projects/ascendia.png",
    year: "2024",
    status: "archived",
  },
  {
    id: 7,
    codename: "MSN-007",
    title: "JokeHub",
    description:
      "Cross-platform Flutter app for mobile, web, and desktop. Fetches dynamic joke data from a REST API with local caching for seamless offline usability.",
    category: "web",
    tags: ["Flutter", "Dart", "REST API", "Offline Caching"],
    githubUrl: "https://github.com/nethunirajapakse/joke-hub",
    image: "/projects/jokehub.png",
    year: "2024",
    status: "archived",
  },
  {
    id: 3,
    codename: "MSN-003",
    title: "Bicycle Safety System",
    description:
      "Arduino-based IoT system with GPS tracking, crash detection, electronic lock, speedometer, and GSM emergency alerts. Built as a university L1 hardware project.",
    category: "fullstack",
    tags: ["Arduino", "C++", "GPS", "GSM", "IoT", "EasyEDA"],
    githubUrl:
      "https://github.com/nethunirajapakse/Safety-and-security-system-for-bicycle",
    image: "/projects/bicycle-safety.png",
    year: "2023",
    status: "archived",
  },
];

export const socials = [
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
    href: "https://medium.com/@nethunirajapakse",
    icon: "bi-medium",
    label: "Medium",
  },
];
