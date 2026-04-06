import type { ActionLink, Metric, NavLink } from "./types";

export const company = {
  name: "Moldstud",
  descriptor: "Digital product teams, software services, and growth systems for ambitious companies.",
  email: "hello@moldstud.com",
  phone: "+373 22 555 010",
  locations: ["Chisinau", "London", "Remote delivery"],
};

export const navigation: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/solutions", label: "Solutions" },
  { href: "/technologies", label: "Technologies" },
  { href: "/articles", label: "Articles" },
  { href: "/careers", label: "Careers" },
  { href: "/about-us", label: "About" },
];

export const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "/services", label: "Services" },
      { href: "/solutions", label: "Solutions" },
      { href: "/industries", label: "Industries" },
      { href: "/technologies", label: "Technologies" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about-us", label: "About us" },
      { href: "/careers", label: "Careers" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/contacts", label: "Contact" },
    ],
  },
  {
    title: "Knowledge",
    links: [
      { href: "/articles", label: "Articles" },
      { href: "/hire-us", label: "Hire us" },
      { href: "/request-profiles", label: "Request profiles" },
      { href: "/privacy-policy", label: "Privacy policy" },
    ],
  },
];

export const siteCta: {
  title: string;
  copy: string;
  primary: ActionLink;
  secondary: ActionLink;
} = {
  title: "Build and scale remote engineering teams without slowing down delivery.",
  copy:
    "Moldstud combines product thinking, delivery support, software services, and specialist hiring into one operating model built for execution.",
  primary: { href: "/request-profiles", label: "Hire talents" },
  secondary: { href: "/hire-us", label: "Get consultation" },
};

export const homePage: {
  eyebrow: string;
  title: string;
  intro: string;
  primary: ActionLink;
  secondary: ActionLink;
  stats: Metric[];
  trustPoints: string[];
  spotlight: { title: string; body: string }[];
} = {
  eyebrow: "Software development company",
  title: "Digital product teams, software services, and strategy that move faster.",
  intro:
    "Moldstud helps startups and growing companies ship platforms, design systems, and stronger digital experiences without losing clarity along the way.",
  primary: { href: "/hire-us", label: "Get 30 min consultation" },
  secondary: { href: "/request-profiles", label: "Hire talents" },
  stats: [
    { value: "Top 3%", label: "Talent and delivery focus" },
    { value: "Product + growth", label: "Integrated delivery model" },
    { value: "Remote-ready", label: "Cross-border collaboration" },
  ],
  trustPoints: [
    "Strategy, design, and engineering aligned around business outcomes.",
    "Clear service positioning, stronger conversion paths, and scalable page architecture.",
    "Reusable systems that keep growth, content, and delivery moving in one direction.",
  ],
  spotlight: [
    {
      title: "Product discovery and UX systems",
      body:
        "From audits and design systems to service positioning and experience strategy, Moldstud helps teams reduce friction before development costs rise.",
    },
    {
      title: "Engineering teams and software services",
      body:
        "Build the right mix of front-end, back-end, QA, and product execution without fragmenting ownership across too many vendors.",
    },
    {
      title: "Growth pages and conversion architecture",
      body:
        "Turn content-heavy websites into clearer lead-generation systems with stronger landing pages, cleaner navigation, and better action paths.",
    },
  ],
};

export const aboutPage = {
  eyebrow: "About the studio",
  title: "We build digital systems that are easier to read, easier to trust, and easier to evolve.",
  intro:
    "Moldstud combines product thinking, software delivery, and growth execution into a single working model for ambitious digital products.",
  metrics: [
    { value: "2019", label: "Studio start" },
    { value: "Product + web", label: "Delivery mix" },
    { value: "Remote-first", label: "Collaboration model" },
  ],
  values: [
    {
      title: "Clarity over noise",
      body:
        "We prefer interfaces that explain themselves instead of demanding effort from the user.",
    },
    {
      title: "Systems over heroics",
      body:
        "A polished front-end is useful only when the team can extend it without rethinking every page.",
    },
    {
      title: "Accessible by default",
      body:
        "Readability, contrast, and clear interaction states are product quality, not side tasks.",
    },
  ],
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Bring the scope, the blockers, and the delivery context.",
  intro:
    "Use this page to start the conversation around software services, team extension, product design, or growth-focused front-end work.",
  offices: [
    "Chisinau, Moldova",
    "Delivery across Europe and North America",
    "Response window: usually within one business day",
  ],
};

export const hireUsPage = {
  eyebrow: "Hire us",
  title: "Use this page when the project is concrete and the delivery needs are clear.",
  intro:
    "The project intake flow is tuned for fast scoping, realistic delivery framing, and a direct path from requirements to execution.",
};

export const policyPage = {
  eyebrow: "Policy",
  title: "Privacy policy",
  intro:
    "This page is prepared for final legal copy and provides the production structure for privacy, data, and retention information.",
  sections: [
    {
      title: "Information we collect",
      body:
        "We may collect contact information, project details, and communication metadata when a visitor submits a form or contacts the team directly.",
    },
    {
      title: "How information is used",
      body:
        "Data is used to respond to requests, qualify projects, coordinate delivery conversations, and improve how the site presents information.",
    },
    {
      title: "Data retention",
      body:
        "Information is retained only for as long as needed for communication, delivery, legal, or operational reasons. Final retention rules should be replaced with the approved legal policy.",
    },
  ],
};

export const requestProfilesPage = {
  eyebrow: "Talent request",
  title: "Request curated candidate profiles for the roles you need to fill next.",
  intro:
    "Use this route when the need is specialist hiring, not a full delivery engagement. Moldstud can help shape the role profile and shortlist relevant candidates.",
};
