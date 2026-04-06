import type { DetailEntry } from "./types";

export const services: DetailEntry[] = [
  {
    slug: "accessibility-first-product-design",
    eyebrow: "Service",
    title: "Accessibility-first product design",
    summary:
      "Design systems, flows, and interfaces shaped for inclusion from the first wireframe to polished UI.",
    tags: ["UX strategy", "UI systems", "WCAG"],
    stat: "4-8 week discovery",
    intro:
      "This service page explains how Moldstud approaches interface clarity, accessibility, and scalable product quality from the very first workshop.",
    metrics: [
      { value: "AA", label: "Target contrast baseline" },
      { value: "3", label: "Core workshops" },
      { value: "12", label: "Reusable UI patterns" },
    ],
    bullets: [
      "Audit current UX against friction and accessibility gaps.",
      "Translate findings into reusable design and delivery patterns.",
      "Define delivery-ready specs for design and development teams.",
    ],
    sections: [
      {
        title: "What the engagement covers",
        body:
          "We align business goals, content structure, interface patterns, and accessibility constraints into one coherent product direction. Instead of decorating screens, the work focuses on decision clarity and scalable interaction rules.",
      },
      {
        title: "What the client receives",
        body:
          "A redesigned page system, interaction states, component specs, content hierarchy recommendations, and handoff notes that can be implemented without guesswork.",
      },
    ],
    faqs: [
      {
        question: "Can this start before final copy is ready?",
        answer:
          "Yes. The system is designed around structured demo content first, then replaced block-by-block with production copy.",
      },
      {
        question: "Does accessibility reduce visual quality?",
        answer:
          "No. The point is to make the interface clearer, stronger, and easier to trust while meeting compliance goals.",
      },
    ],
    quote:
      "The right experience should feel premium, readable, and operationally easy to extend.",
    ctaTitle: "Turn fragmented pages into one system",
    ctaCopy:
      "Use this engagement to turn fragmented digital touchpoints into one clear, scalable system.",
    image: "/images/about-us/about-us.png",
  },
  {
    slug: "product-replatforming-and-front-end-rebuilds",
    eyebrow: "Service",
    title: "Product replatforming and front-end rebuilds",
    summary:
      "Structured redesign and migration of legacy marketing sites into a modular front-end runtime.",
    tags: ["Migration", "Astro", "Design system"],
    stat: "Static + dynamic hybrid",
    intro:
      "A rebuild is only useful if it improves maintainability, speed, and the team’s ability to launch new pages without recurring layout debt.",
    metrics: [
      { value: "60k", label: "Pages planned in operating model" },
      { value: "1", label: "Unified design runtime" },
      { value: "0", label: "One-off pages tolerated" },
    ],
    bullets: [
      "Separate content from presentation.",
      "Move repeated sections into reusable components.",
      "Protect future SEO and launch speed with structured routing.",
    ],
    sections: [
      {
        title: "Why teams ask for this",
        body:
          "Legacy sites often become expensive because the content model, design system, and runtime are tightly coupled. Replatforming works when those concerns are separated cleanly.",
      },
      {
        title: "What success looks like",
        body:
          "New page types launch faster, QA becomes predictable, and editorial updates stop requiring layout rewrites.",
      },
    ],
    faqs: [
      {
        question: "Will this preserve SEO value?",
        answer:
          "Yes. The implementation path keeps route coverage, metadata discipline, and structured content migration as explicit requirements.",
      },
      {
        question: "Can the visual redesign happen before CMS integration?",
        answer:
          "Yes. Demo data is a deliberate bridge so the UI can be reviewed early and wired to real content later.",
      },
    ],
    image: "/images/home/services.png",
  },
  {
    slug: "conversion-focused-marketing-pages",
    eyebrow: "Service",
    title: "Conversion-focused marketing pages",
    summary:
      "Page systems designed to move qualified visitors toward conversations, qualified leads, and inbound work.",
    tags: ["Conversion", "Messaging", "Lead flow"],
    stat: "Lead-ready sections",
    intro:
      "This service is aimed at teams that need pages to do more than present information. The goal is a clearer route from reading to action.",
    metrics: [
      { value: "5", label: "Core conversion sections" },
      { value: "2", label: "Form patterns" },
      { value: "1", label: "CTA language system" },
    ],
    bullets: [
      "Clarify value proposition above the fold.",
      "Sequence proof, capability, and action points logically.",
      "Reduce friction between reading and contacting the team.",
    ],
    sections: [
      {
        title: "How we structure the page",
        body:
          "The page opens with a compact narrative, then moves into capabilities, proof, working model, and a direct next step. This reduces the usual clutter of long B2B marketing pages.",
      },
      {
        title: "How content gets replaced later",
        body:
          "Every section is already designed around named fields, so final content simply replaces demo content without touching markup.",
      },
    ],
    faqs: [
      {
        question: "Do you need final testimonials before launch?",
        answer:
          "No. Demo proof blocks can hold the layout while real case data is collected.",
      },
      {
        question: "Can sections be reused across other pages?",
        answer:
          "Yes. The design intentionally treats sections as a library, not as page-specific fragments.",
      },
    ],
    image: "/images/forms/schedule-a-call.png",
  },
];
