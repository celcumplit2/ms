import type { DetailEntry } from "./types";

export const solutions: DetailEntry[] = [
  {
    slug: "design-system-modernization",
    eyebrow: "Solution",
    title: "Design system modernization",
    summary:
      "Unify fragmented UI into one practical system that teams can ship with and maintain.",
    tags: ["Tokens", "Components", "Governance"],
    stat: "System rollout",
    intro:
      "Modernize the front-end, systematize the visual layer, and create the operating discipline needed to scale content safely.",
    metrics: [
      { value: "1", label: "Shared token source" },
      { value: "All", label: "Page types covered" },
      { value: "Content-ready", label: "Migration model" },
    ],
    bullets: [
      "Audit page types and section families.",
      "Create the foundational token and component layer.",
      "Convert high-traffic page types first, then roll through the rest.",
    ],
    sections: [
      {
        title: "System before screens",
        body:
          "A redesign without a stable component model creates faster visual drift than the legacy site it replaces. The solution is to formalize primitives, cards, sections, and route templates early.",
      },
      {
        title: "Content readiness is not a blocker",
        body:
          "A strong content model keeps delivery moving while final copy, proof, and legal inputs are still being prepared.",
      },
    ],
    faqs: [
      {
        question: "Does this lock us into one theme forever?",
        answer:
          "No. The system is built so additional presentation modes can be introduced later without rebuilding the whole foundation.",
      },
      {
        question: "Why not do all pages as static mockups first?",
        answer:
          "Because the goal is a real site runtime, not a disconnected gallery of polished screens.",
      },
    ],
    image: "/images/about-us/plan.png",
  },
  {
    slug: "lead-generation-site-rebuild",
    eyebrow: "Solution",
    title: "Lead generation site rebuild",
    summary:
      "Reframe a content-heavy site into a dependable pipeline for qualified conversations and inbound work.",
    tags: ["Leads", "SEO", "B2B pages"],
    stat: "Conversion-led IA",
    intro:
      "This solution is focused on turning a content-heavy website into a stronger lead engine instead of a passive reading surface.",
    metrics: [
      { value: "2", label: "Primary action paths" },
      { value: "6", label: "Landing page blocks" },
      { value: "1", label: "Editorial system" },
    ],
    bullets: [
      "Clarify service positioning by audience and business value.",
      "Shape article and capability content into stronger conversion paths.",
      "Prepare the site for structured expansion without repeating layout work.",
    ],
    sections: [
      {
        title: "What changes in practice",
        body:
          "Navigation becomes clearer, list pages become more selective, and each page family gets a stronger role in the lead journey.",
      },
      {
        title: "Why a new front-end matters",
        body:
          "The visual layer influences trust, speed, and editorial discipline. Rebuilding it as a system improves all three.",
      },
    ],
    faqs: [
      {
        question: "Can existing SEO content be retained?",
        answer:
          "Yes. The point is not to discard content authority but to present it through stronger templates and conversion logic.",
      },
      {
        question: "Will the content team need developer help for every change?",
        answer:
          "No. The layout system is being designed so content replacements remain predictable.",
      },
    ],
    image: "/images/home/services.png",
  },
];
