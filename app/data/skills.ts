/**
 * Skill groups. `logo` is a devicon id (loaded from jsDelivr); skills without
 * one render as plain chips. Keep this list defensible: it's the real stack.
 */

export type SkillItem = { name: string; logo?: string; wordmark?: boolean; icon?: string; src?: string };

export type SkillGroup = {
  number: string;
  title: string;
  description: string;
  skills: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "Languages",
    description: "What I reach for when building services, tools and experiments.",
    skills: [
      { name: "Java", logo: "java" },
      { name: "Python", logo: "python" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Kotlin", logo: "kotlin" },
      { name: "C++", logo: "cplusplus" },
    ],
  },
  {
    number: "02",
    title: "Backend & streaming",
    description: "Services that stay correct under load, retries and partial failure.",
    skills: [
      { name: "Spring Boot", logo: "spring" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "Apache Kafka", logo: "apachekafka" },
      { name: "Redis", logo: "redis" },
      { name: "REST APIs", icon: "bi-diagram-3" },
      { name: "QueryDSL", icon: "bi-database-gear" },
    ],
  },
  {
    number: "03",
    title: "Reliability patterns",
    description: "Design habits that keep distributed systems predictable.",
    skills: [
      { name: "Idempotency", icon: "bi-arrow-repeat" },
      { name: "Circuit breakers", icon: "bi-lightning-charge" },
      { name: "Transactional Outbox", icon: "bi-inbox" },
      { name: "Optimistic locking", icon: "bi-lock" },
      { name: "Resilience4J", icon: "bi-shield-check" },
    ],
  },
  {
    number: "04",
    title: "Data & ML",
    description: "Relational storage, data wrangling and applied machine learning.",
    skills: [
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MySQL", logo: "mysql" },
      { name: "pandas", logo: "pandas" },
      { name: "scikit-learn", logo: "scikitlearn" },
    ],
  },
  {
    number: "05",
    title: "Cloud & DevOps",
    description: "Shipping containerised workloads with pipelines and observability.",
    skills: [
      { name: "Docker", logo: "docker" },
      { name: "Kubernetes", logo: "kubernetes" },
      { name: "AWS", logo: "amazonwebservices", src: "/logos/aws.svg" },
      { name: "EKS Fargate", icon: "bi-cloud" },
      { name: "Cognito", icon: "bi-person-badge" },
      { name: "CloudWatch", icon: "bi-activity" },
      { name: "GitHub Actions", logo: "githubactions" },
    ],
  },
  {
    number: "06",
    title: "Frontend & testing",
    description: "Interfaces that feel quick, plus tests that protect the core.",
    skills: [
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextjs" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "TanStack Query", icon: "bi-arrow-down-up" },
      { name: "JUnit", icon: "bi-check2-square" },
      { name: "Mockito", icon: "bi-bug" },
    ],
  },
];
