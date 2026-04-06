import type { ArticleEntry } from "./types";

export const articles: ArticleEntry[] = [
  {
    slug: "how-design-systems-protect-b2b-growth-sites",
    eyebrow: "Article",
    title: "How design systems protect B2B growth sites from layout drift",
    summary:
      "Why page velocity collapses when every landing page is treated like a one-off, and how to avoid it.",
    tags: ["Design systems", "B2B", "Front-end"],
    stat: "7 min read",
    author: "Andrew Celcumplit",
    publishedAt: "March 24, 2026",
    readTime: "7 min read",
    intro:
      "Why page velocity collapses when every landing page is treated like a one-off, and how stronger systems protect delivery quality.",
    sections: [
      {
        title: "One-off pages feel faster until they are not",
        body:
          "Most teams can ship a few custom pages quickly. The problem starts when page families multiply, stakeholders request variations, and nobody can explain which layout decisions are reusable versus accidental.",
      },
      {
        title: "Systems reduce discussion cost",
        body:
          "Reusable sections and card patterns remove entire classes of design debate. Teams can spend time on hierarchy, content quality, and conversion logic instead of rebuilding common blocks from scratch.",
      },
      {
        title: "Demo content is still useful",
        body:
          "When editorial content is still evolving, a disciplined content model helps the interface move forward without introducing page-level inconsistency.",
      },
    ],
    takeaway: [
      "Build templates before volume arrives.",
      "Keep content contracts separate from component markup.",
      "Treat design systems as a delivery accelerator, not only a visual exercise.",
    ],
    image: "/uploads/images/a-beginners-guide-to-api-testing-tools-and-techniques-explained-busine-xey7dofd.webp",
  },
  {
    slug: "designing-lead-paths-for-content-heavy-sites",
    eyebrow: "Article",
    title: "Designing lead paths for content-heavy sites",
    summary:
      "A practical look at turning long-form content into a stronger source of conversations, not just pageviews.",
    tags: ["Lead generation", "Content strategy", "UX"],
    stat: "6 min read",
    author: "Daniel Revenco",
    publishedAt: "March 20, 2026",
    readTime: "6 min read",
    intro:
      "A practical look at turning long-form content into a stronger source of conversations, not just pageviews.",
    sections: [
      {
        title: "Traffic without decision paths is weak traffic",
        body:
          "Content can rank and still underperform if users cannot move from reading to relevant next steps. Good article architecture includes context cues, related paths, and clear action moments.",
      },
      {
        title: "Why the listing pages matter too",
        body:
          "Article detail templates do not work in isolation. Index pages, technology pages, and service pages should all reinforce the same route logic.",
      },
    ],
    takeaway: [
      "Give each content family a business role.",
      "Keep CTAs contextual, not generic.",
      "Use the same design language across pages and articles.",
    ],
    image: "/uploads/images/creating-intuitive-app-uis-lessons-from-design-communities-business-cl-z3p125c3.webp",
  },
  {
    slug: "light-theme-redesigns-that-still-feel-premium",
    eyebrow: "Article",
    title: "Light-theme redesigns that still feel premium",
    summary:
      "A note on contrast, texture, and hierarchy when the team wants a cleaner visual direction without losing depth.",
    tags: ["Visual design", "Light mode", "Brand"],
    stat: "5 min read",
    author: "Anna UX",
    publishedAt: "March 18, 2026",
    readTime: "5 min read",
    intro:
      "A note on contrast, texture, and hierarchy when a cleaner visual direction still needs to feel confident and premium.",
    sections: [
      {
        title: "Premium does not mean dark",
        body:
          "A premium light interface relies on pacing, typography, soft surfaces, and confident spacing rather than a dark canvas alone.",
      },
      {
        title: "Consistency matters more than flourish",
        body:
          "The light variant becomes credible when buttons, labels, cards, and section backgrounds behave like one family rather than a collection of isolated ideas.",
      },
    ],
    takeaway: [
      "Use tone and rhythm, not only color, to create atmosphere.",
      "Keep interactive states obvious.",
      "Treat readability as part of brand quality.",
    ],
    image: "/uploads/images/10-essential-tips-for-seamlessly-integrating-php-with-html-and-css-gh1phjlq.webp",
  },
];
