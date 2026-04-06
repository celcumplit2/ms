import type { CareerEntry } from "./types";

export const careers = [
  {
    slug: "senior-product-designer",
    eyebrow: "Career",
    title: "Senior product designer",
    summary:
      "Own product flows, page systems, and design quality across client-facing experiences.",
    tags: ["Design", "Remote-friendly", "Lead role"],
    stat: "Open now",
    location: "Remote / Chisinau",
    employmentType: "Full-time",
    level: "Senior",
    compensation: "Competitive, discussed during process",
    intro:
      "Lead product flows, service pages, and design quality across visible client-facing experiences.",
    responsibilities: [
      "Lead page-system thinking across marketing and product-facing surfaces.",
      "Collaborate with engineering on reusable components and handoff clarity.",
      "Raise visual quality without sacrificing accessibility and speed.",
    ],
    requirements: [
      "Strong product and systems thinking.",
      "Confidence in Figma and developer collaboration.",
      "Ability to simplify dense information into clear interfaces.",
    ],
    benefits: [
      "Flexible remote collaboration.",
      "Direct influence on visible product quality.",
      "A team that values execution over presentation theater.",
    ],
    image: "/images/careers/careers.png",
  },
  {
    slug: "front-end-engineer-design-systems",
    eyebrow: "Career",
    title: "Front-end engineer, design systems",
    summary:
      "Build fast, maintainable Astro-based interfaces from structured design and content models.",
    tags: ["Front-end", "Astro", "Components"],
    stat: "Hybrid role",
    location: "Remote / Europe",
    employmentType: "Contract to long-term",
    level: "Mid/Senior",
    compensation: "Project-based start",
    intro:
      "Translate product and marketing design into a robust runtime built for speed, consistency, and long-term scale.",
    responsibilities: [
      "Build page templates and section systems in Astro.",
      "Translate structured content into route-ready components.",
      "Keep implementation fast, readable, and easy to extend.",
    ],
    requirements: [
      "Strong HTML, CSS, TypeScript, and component architecture fundamentals.",
      "Experience with static-first and hybrid delivery models.",
      "Clear judgment on when to generalize and when not to.",
    ],
    benefits: [
      "Work on the site and the system behind it.",
      "Tight feedback loop with design and product.",
      "Low-bureaucracy execution environment.",
    ],
    image: "/images/home/main.png",
  },
] satisfies CareerEntry[];
