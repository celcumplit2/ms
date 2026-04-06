import type { DetailEntry } from "./types";

export const technologies: DetailEntry[] = [
  {
    slug: "astro-and-edge-rendering",
    eyebrow: "Technology",
    title: "Astro and edge rendering",
    summary:
      "A fast front-end foundation for content-heavy sites that need both control and performance discipline.",
    tags: ["Astro", "Static-first", "Cloudflare"],
    stat: "Fast by design",
    intro:
      "This technology page explains the practical role of the runtime, not just the tool list. The goal is clarity for both teams and decision-makers.",
    metrics: [
      { value: "0", label: "Client-framework lock-in" },
      { value: "1", label: "Static-first runtime" },
      { value: "Edge", label: "Delivery model" },
    ],
    bullets: [
      "Keep marketing pages light and cacheable.",
      "Add dynamic paths only where they actually matter.",
      "Preserve structured content and build clarity.",
    ],
    sections: [
      {
        title: "Why this stack fits the redesign",
        body:
          "The site needs reusable templates, strong static output, and future flexibility for a larger operating model. Astro matches that combination well.",
      },
      {
        title: "How the page template helps later",
        body:
          "Technical content can evolve over time without changing the shell, section logic, or relationship to other technology pages.",
      },
    ],
    faqs: [
      {
        question: "Is this page type only for developers?",
        answer:
          "No. It needs to stay legible for decision-makers while still being technically credible.",
      },
      {
        question: "Can more technologies be added later?",
        answer:
          "Yes. The listing/detail pattern is intentionally designed for expansion.",
      },
    ],
    image: "/images/home/main.png",
  },
  {
    slug: "design-tokens-and-component-architecture",
    eyebrow: "Technology",
    title: "Design tokens and component architecture",
    summary:
      "The practical infrastructure behind consistent pages, faster delivery, and safer iteration.",
    tags: ["Tokens", "Front-end architecture", "Scalability"],
    stat: "System-level asset",
    intro:
      "This page type translates internal technical capability into a business-readable explanation when technology pages need to explain working method, not only stack names.",
    metrics: [
      { value: "1", label: "Token source" },
      { value: "Many", label: "Reusable sections" },
      { value: "Low", label: "Template drift" },
    ],
    bullets: [
      "Define color, spacing, and typography as code-level primitives.",
      "Map repeated content patterns into stable components.",
      "Protect future page rollout from design inconsistency.",
    ],
    sections: [
      {
        title: "Why it matters for the business",
        body:
          "A component architecture is not an engineering luxury. It directly affects how fast the site can grow and how reliably pages stay consistent.",
      },
      {
        title: "What the new site gets from it",
        body:
          "Cleaner QA, easier content replacement, fewer one-off templates, and a more legible way to scale from initial launch to broader page coverage.",
      },
    ],
    faqs: [
      {
        question: "Can tokens support a dark variant later?",
        answer:
          "Yes. Launch is light-first, but the system is structured so a future theme can layer on top of the same semantic foundations.",
      },
      {
        question: "Does this add implementation overhead now?",
        answer:
          "There is some upfront work, but it prevents compounding layout debt across the entire site.",
      },
    ],
    image: "/images/home/expertise.png",
  },
];
