import type { CaseStudyEntry, ProfileEntry } from "./types";

export const caseStudies: CaseStudyEntry[] = [
  {
    slug: "reframing-a-content-heavy-growth-site",
    eyebrow: "Case study",
    title: "Reframing a content-heavy growth site into a lead-ready platform",
    summary:
      "How design systems, page architecture, and structured content can turn a legacy site into a clearer operating asset.",
    tags: ["Redesign", "Growth", "Content platform"],
    stat: "12 week transformation",
    client: "Confidential B2B platform",
    outcome: "Sharper positioning and cleaner launch mechanics",
    duration: "12 weeks",
    intro:
      "A long-form case study format that connects challenge, approach, and outcome without collapsing into presentation-only storytelling.",
    challenge:
      "The client had strong content volume and domain authority, but the front-end layer had become visually fragmented and harder to evolve.",
    approach:
      "We rebuilt the visual system around reusable sections, route templates, and a migration-friendly content model.",
    result:
      "The new structure made reviews faster, clarified the lead journey, and reduced page-type ambiguity across the site.",
    image: "/images/home/values.png",
  },
  {
    slug: "launching-a-scalable-content-system-before-final-copy",
    eyebrow: "Case study",
    title: "Launching a scalable content system before final copy was ready",
    summary:
      "How a structured content model allowed design and engineering to move without blocking on editorial completion.",
    tags: ["Delivery model", "Demo data", "Front-end"],
    stat: "Parallel tracks",
    client: "Internal rollout model",
    outcome: "Design review before content freeze",
    duration: "Ongoing",
    intro:
      "This engagement focuses on moving design and engineering forward while content production is still catching up.",
    challenge:
      "The team needed to validate layout, rhythm, and page architecture before every content block had a final owner or approved text.",
    approach:
      "We used structured placeholder data to populate every route family while preserving stable content contracts for later replacement.",
    result:
      "The visual system could be reviewed honestly, and content replacement became a planned follow-up step rather than a rebuild.",
    image: "/images/forms/schedule-a-call.png",
  },
];

export const profiles: ProfileEntry[] = [
  {
    slug: "daria-accessibility-lead",
    eyebrow: "Profile",
    title: "Daria Kozak, accessibility and systems lead",
    summary:
      "A specialist profile page built for future talent showcases, hiring conversations, and expert-led delivery pages.",
    tags: ["Accessibility", "Design systems", "Audit"],
    stat: "8 years in product design",
    role: "Accessibility and systems lead",
    location: "Chisinau / Remote",
    skills: ["WCAG strategy", "Figma systems", "Design QA", "Cross-functional workshops"],
    highlights: [
      "Builds design systems that scale across marketing and product surfaces.",
      "Specializes in readability, contrast, and usability under real delivery constraints.",
      "Bridges design rationale and engineering execution clearly.",
    ],
    image: "/images/about-us/about-us.png",
  },
  {
    slug: "mark-front-end-architect",
    eyebrow: "Profile",
    title: "Mark Iliev, front-end architect",
    summary:
      "A specialist profile page for showcasing technical leadership, delivery approach, and role-specific capabilities.",
    tags: ["Astro", "Performance", "Front-end systems"],
    stat: "Component architecture focus",
    role: "Front-end architect",
    location: "Europe / Remote",
    skills: ["Static-first delivery", "Component design", "Performance budgets", "Content modeling"],
    highlights: [
      "Translates complex design systems into maintainable runtime code.",
      "Keeps implementation decisions aligned with future content growth.",
      "Values clarity, speed, and operational simplicity.",
    ],
    image: "/images/home/main.png",
  },
];
