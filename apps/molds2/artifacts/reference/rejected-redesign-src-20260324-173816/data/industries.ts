import type { DetailEntry } from "./types";

export const industries: DetailEntry[] = [
  {
    slug: "fintech-and-regulated-platforms",
    eyebrow: "Industry",
    title: "Fintech and regulated platforms",
    summary:
      "Product experiences for payment, compliance, and operations-heavy teams that cannot compromise on clarity.",
    tags: ["Fintech", "Compliance", "Ops dashboards"],
    stat: "Audit-ready design",
    intro:
      "This industry page shows how Moldstud adapts the same disciplined structure to sectors where clarity, trust, and operational stakes are high.",
    metrics: [
      { value: "74", label: "Domain authority baseline" },
      { value: "AA", label: "Accessibility target" },
      { value: "24/7", label: "Operational stakes" },
    ],
    bullets: [
      "Structured onboarding and form UX.",
      "Trust signals embedded in core sections.",
      "Clear hierarchy for legal and product claims.",
    ],
    sections: [
      {
        title: "Industry pressures",
        body:
          "Fintech interfaces need to balance confidence, speed, and control. That affects hierarchy, copy density, and how proof is surfaced across key pages.",
      },
      {
        title: "Where the design system helps",
        body:
          "By standardizing high-trust sections and conversion flows, the same design language can power product pages, capability pages, and lead capture pages.",
      },
    ],
    faqs: [
      {
        question: "Can regulated copy be added later?",
        answer:
          "Yes. Demo content placeholders are intentionally structured so legal and compliance teams can replace them later.",
      },
      {
        question: "Is this only for dashboards?",
        answer:
          "No. The same patterns support marketing, product-detail, onboarding, and trust-building pages.",
      },
    ],
    image: "/images/home/expertise.png",
  },
  {
    slug: "health-and-public-sector-services",
    eyebrow: "Industry",
    title: "Health and public sector services",
    summary:
      "Clear and inclusive interfaces for service-heavy products where reach, trust, and usability are non-negotiable.",
    tags: ["Healthcare", "Public services", "Accessibility"],
    stat: "Service-heavy content",
    intro:
      "This page is built for content-dense sectors that need to stay readable, credible, and easy to navigate across long service journeys.",
    metrics: [
      { value: "3", label: "Audience groups served" },
      { value: "100%", label: "Readable hierarchy focus" },
      { value: "1", label: "Unified service language" },
    ],
    bullets: [
      "Reduce decision fatigue on long informational pages.",
      "Make service pathways easier to understand on mobile.",
      "Build trust through consistent patterns and plain language.",
    ],
    sections: [
      {
        title: "Design priorities",
        body:
          "Readability, action clarity, and confidence cues matter more than visual novelty here. The light system helps by prioritizing contrast, spacing, and section rhythm.",
      },
      {
        title: "Operational note",
        body:
          "A disciplined page system keeps service communication consistent even when institutional content evolves over time.",
      },
    ],
    faqs: [
      {
        question: "Why use the same design system across sectors?",
        answer:
          "Shared infrastructure keeps implementation efficient while sector pages still receive their own messaging and proof structure.",
      },
      {
        question: "Can this support multilingual content later?",
        answer:
          "Yes. The new layout system is built to handle content variation without redesigning the entire page shell.",
      },
    ],
    image: "/images/home/values.png",
  },
];
