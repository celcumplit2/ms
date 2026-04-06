import type { FaqItem } from "./types";

export const testimonials = [
  {
    quote:
      "The new system made the site feel like one product instead of a collection of disconnected pages.",
    author: "Daria Kozak",
    role: "Product design lead",
  },
  {
    quote:
      "We finally had templates that the team could extend without reopening every visual decision.",
    author: "Mark Iliev",
    role: "Front-end architect",
  },
  {
    quote:
      "The strongest change was not only speed. It was clarity, confidence, and easier conversion paths.",
    author: "Daniel Revenco",
    role: "Growth strategist",
  },
];

export const directions = [
  {
    title: "Product delivery",
    body:
      "Design, engineering, QA, and release mechanics structured as one operating model.",
  },
  {
    title: "Growth pages",
    body:
      "Service, industry, and article templates designed to move visitors toward action.",
  },
  {
    title: "Design systems",
    body:
      "Reusable tokens, cards, and section logic that reduce visual drift as the site grows.",
  },
  {
    title: "Content operations",
    body:
      "Demo content now, production content later, with stable contracts between content and layout.",
  },
];

export const certifications = [
  "WCAG-aware delivery",
  "Static-first performance discipline",
  "SEO-ready route architecture",
  "Component-based rollout",
];

export const homeFaqs: FaqItem[] = [
  {
    question: "Can the design ship before final content is approved?",
    answer:
      "Yes. The visual system is built around structured placeholder data so layout approval does not wait on content freeze.",
  },
  {
    question: "Will these sections scale to more page families later?",
    answer:
      "Yes. The system is organized around reusable section families instead of one-off page compositions.",
  },
  {
    question: "Can light and dark surfaces coexist without losing consistency?",
    answer:
      "Yes. The Figma direction already mixes white and dark surfaces. The code follows the same logic with shared spacing, typography, and button language.",
  },
];

export const operatingPrinciples = [
  {
    title: "Talent pre-vetted",
    body: "Specialists are presented with role clarity, not generic capability lists.",
  },
  {
    title: "Flexible contracts",
    body: "The site language supports delivery services and role-based hiring at the same time.",
  },
  {
    title: "Fast integration",
    body: "Sections are designed to shorten the distance between reading, scoping, and action.",
  },
  {
    title: "Transparent management",
    body: "The layout puts process, proof, and expectations in visible positions.",
  },
  {
    title: "IP protection",
    body: "Trust messaging is treated as an explicit part of the page system.",
  },
];

export const deliverySteps = [
  {
    step: "01",
    title: "Clarify route family and business role",
    body:
      "Every page type gets a defined job before layout decisions are generalized.",
  },
  {
    step: "02",
    title: "Assemble sections from the shared library",
    body:
      "Hero, cards, proof, FAQ, and CTA blocks are reused with controlled variation.",
  },
  {
    step: "03",
    title: "Swap demo content for real data later",
    body:
      "The markup stays stable while copy, proof, and assets are replaced block by block.",
  },
];

export const footerFaq: FaqItem[] = [
  {
    question: "Is the current build using demo content?",
    answer:
      "Yes. The layout and section hierarchy are being locked first. Real content can replace demo content later without changing the runtime.",
  },
  {
    question: "Why rebuild on a clean runtime instead of repainting the old one?",
    answer:
      "The redesign needs new structural rules, not cosmetic edits on top of a discarded system.",
  },
];
