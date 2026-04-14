import { articles as rawArticles } from "../../artifacts/reference/rejected-redesign-src-20260324-173816/data/articles.ts";
import { company as rawCompany } from "../../artifacts/reference/rejected-redesign-src-20260324-173816/data/base.ts";
import { careers as rawCareers } from "../../artifacts/reference/rejected-redesign-src-20260324-173816/data/careers.ts";
import { caseStudies as rawCaseStudies, profiles as rawProfiles } from "../../artifacts/reference/rejected-redesign-src-20260324-173816/data/extras.ts";
import { industries as rawIndustries } from "../../artifacts/reference/rejected-redesign-src-20260324-173816/data/industries.ts";
import { services as rawServices } from "../../artifacts/reference/rejected-redesign-src-20260324-173816/data/services.ts";
import { solutions as rawSolutions } from "../../artifacts/reference/rejected-redesign-src-20260324-173816/data/solutions.ts";
import { technologies as rawTechnologies } from "../../artifacts/reference/rejected-redesign-src-20260324-173816/data/technologies.ts";

type Metric = {
  label: string;
  value: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

type DetailSection = {
  title: string;
  body: string;
};

type EntryBase = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  tags: string[];
  stat?: string;
  image?: string;
};

export type DetailEntry = EntryBase & {
  intro: string;
  metrics: Metric[];
  bullets: string[];
  sections: DetailSection[];
  faqs: FaqItem[];
  quote?: string;
  ctaTitle?: string;
  ctaCopy?: string;
};

export type ArticleEntry = EntryBase & {
  author: string;
  publishedAt: string;
  readTime: string;
  intro: string;
  sections: DetailSection[];
  takeaway: string[];
};

export type CareerEntry = EntryBase & {
  location: string;
  employmentType: string;
  level: string;
  compensation: string;
  intro: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

export type CaseStudyEntry = EntryBase & {
  client: string;
  outcome: string;
  duration: string;
  intro: string;
  challenge: string;
  approach: string;
  result: string;
};

export type ProfileEntry = EntryBase & {
  role: string;
  location: string;
  skills: string[];
  highlights: string[];
};

type NavLink = {
  href: string;
  label: string;
};

type FooterGroup = {
  title: string;
  links: NavLink[];
};

type ImagePanel = {
  src: string;
  alt: string;
};

type HeroCard = {
  name: string;
  role: string;
  skills: string[];
  avatar: string;
  years: string;
};

type ServiceTile = {
  title: string;
  copy: string;
  href: string;
  featured?: boolean;
};

type BenefitTile = {
  title: string;
  copy: string;
};

type Testimonial = {
  category: string;
  company: string;
  metrics: string[];
  quote: string;
  author: string;
  role: string;
};

type HomeJob = {
  title: string;
  copy: string;
  href: string;
};

type Certification = {
  title: string;
  copy: string;
};

type IndustryTile = {
  title: string;
  copy: string;
  href: string;
};

type RouteKind =
  | "home"
  | "listing"
  | "detail"
  | "articles-list"
  | "article-detail"
  | "careers-list"
  | "career-detail"
  | "career-apply"
  | "case-studies-list"
  | "case-study-detail"
  | "profile"
  | "hire-us"
  | "request-profiles"
  | "talents-designers"
  | "simple";

export type RoutePage =
  | { kind: "home" }
  | {
      kind: "listing";
      family: "services" | "industries" | "solutions" | "technologies";
      title: string;
      intro: string;
      theme: "light" | "dark";
      heroImage?: ImagePanel;
      cards: DetailEntry[];
    }
  | {
      kind: "detail";
      family: "services" | "industries" | "solutions" | "technologies";
      entry: DetailEntry;
      theme: "dark";
      heroImage?: ImagePanel;
    }
  | { kind: "articles-list"; entries: ArticleEntry[] }
  | { kind: "article-detail"; entry: ArticleEntry; related: ArticleEntry[] }
  | { kind: "careers-list"; entries: CareerEntry[] }
  | { kind: "career-detail"; entry: CareerEntry }
  | { kind: "career-apply"; entry: CareerEntry }
  | { kind: "case-studies-list"; entries: CaseStudyEntry[] }
  | { kind: "case-study-detail"; entry: CaseStudyEntry; related: CaseStudyEntry[] }
  | { kind: "profile"; entry: ProfileEntry }
  | { kind: "hire-us" }
  | { kind: "request-profiles" }
  | { kind: "talents-designers" }
  | { kind: "simple"; slug: string; title: string; intro: string };

const replacements = [
  ["вЂ™", "'"],
  ["вЂ”", "—"],
  ["вЂ“", "–"],
  ["вЂњ", '"'],
  ["вЂќ", '"'],
  ["в€¦", "…"],
  ["â€™", "'"],
  ["â€“", "–"],
  ["â€œ", '"'],
  ["â€", '"'],
];

function cleanString(input: string): string {
  return replacements.reduce((value, [bad, good]) => value.split(bad).join(good), input);
}

function cleanValue<T>(value: T): T {
  if (typeof value === "string") {
    return cleanString(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => cleanValue(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, cleanValue(entry)]),
    ) as T;
  }

  return value;
}

const articlesModule = cleanValue(rawArticles) as ArticleEntry[];
const companyModule = cleanValue(rawCompany) as { name: string; email: string; phone: string };
const careersModule = cleanValue(rawCareers) as CareerEntry[];
const caseStudiesModule = cleanValue(rawCaseStudies) as CaseStudyEntry[];
const profilesModule = cleanValue(rawProfiles) as ProfileEntry[];
const industriesModule = cleanValue(rawIndustries) as DetailEntry[];
const servicesModule = cleanValue(rawServices) as DetailEntry[];
const solutionsModule = cleanValue(rawSolutions) as DetailEntry[];
const technologiesModule = cleanValue(rawTechnologies) as DetailEntry[];

export const company = companyModule;

export const navigation: NavLink[] = [
  { href: "/services", label: "Roles" },
  { href: "/industries", label: "Industries" },
  { href: "/solutions", label: "Build" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/articles", label: "Insights" },
  { href: "/careers", label: "Careers" },
];

export const headerActions = {
  primary: { href: "/hire-us", label: "Build a product" },
  secondary: { href: "/request-profiles", label: "Hire talents" },
  tertiary: { href: "/careers", label: "Join us" },
};

export const footerGroups: FooterGroup[] = [
  {
    title: "Services",
    links: [
      { href: "/services", label: "Database Design and Management" },
      { href: "/services", label: "Artificial Intelligence Integration" },
      { href: "/services", label: "Blockchain Development" },
      { href: "/services", label: "Machine Learning Development" },
      { href: "/services", label: "Responsive Web Design" },
      { href: "/services", label: "Cybersecurity Services" },
    ],
  },
  {
    title: "Industries",
    links: [
      { href: "/industries", label: "Automotive" },
      { href: "/industries", label: "Aerospace" },
      { href: "/industries", label: "Banking" },
      { href: "/industries", label: "Biotechnology" },
      { href: "/industries", label: "Information Technology" },
      { href: "/industries", label: "Telecommunication" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions", label: "Security Operations Platform (SOC)" },
      { href: "/solutions", label: "Threat Detection & Response Platform" },
      { href: "/solutions", label: "Managed Detection & Response (MDR)" },
      { href: "/solutions", label: "Security Information & Event Management" },
    ],
  },
  {
    title: "Other",
    links: [
      { href: "/request-profiles", label: "Apply as a talent" },
      { href: "/articles", label: "Articles" },
      { href: "/technologies", label: "Technologies" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/careers", label: "Careers" },
      { href: "/about-us", label: "About us" },
      { href: "/contacts", label: "Contact" },
    ],
  },
];

export const services = servicesModule;
export const industries = industriesModule;
export const solutions = solutionsModule;
export const technologies = technologiesModule;
export const articles = articlesModule;
export const careers = careersModule;
export const caseStudies = caseStudiesModule;
export const profiles = profilesModule;

export const heroCards: HeroCard[] = [
  {
    name: "Noah R.",
    role: "Web Developer",
    years: "4 yrs",
    skills: ["React", "JavaScript", "HTML/CSS", "Node.js"],
    avatar: "/images/home/main.png",
  },
  {
    name: "Ava J.",
    role: "Content Strategist",
    years: "3 yrs",
    skills: ["Notion", "Google Docs", "Trello", "Figma"],
    avatar: "/images/home/services.png",
  },
  {
    name: "Elijah K.",
    role: "Data Analyst",
    years: "7 yrs",
    skills: ["Tableau", "Excel", "Python", "SQL"],
    avatar: "/images/about-us/about-us.png",
  },
  {
    name: "Sophia L.",
    role: "Marketing Specialist",
    years: "2 yrs",
    skills: ["HubSpot", "Mailchimp", "Canva", "GA4"],
    avatar: "/images/home/main-video-cover.webp",
  },
  {
    name: "James B.",
    role: "SEO Specialist",
    years: "3 yrs",
    skills: ["SEMrush", "Ahrefs", "Google Search", "WordPress"],
    avatar: "/images/home/main.png",
  },
  {
    name: "Mia C.",
    role: "Product Manager",
    years: "6 yrs",
    skills: ["Jira", "Asana", "Trello", "Slack"],
    avatar: "/images/home/services.png",
  },
  {
    name: "Martin F.",
    role: "DevOps Engineer",
    years: "4 yrs",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform"],
    avatar: "/images/about-us/about-us.png",
  },
  {
    name: "Charlotte G.",
    role: "Graphic Designer",
    years: "5 yrs",
    skills: ["Illustrator", "InDesign", "Photoshop", "CorelDRAW"],
    avatar: "/images/home/main-video-cover.webp",
  },
  {
    name: "Emma T.",
    role: "UX Researcher",
    years: "6 yrs",
    skills: ["Miro", "UserTesting", "Lookback", "OptimalSort"],
    avatar: "/images/home/main.png",
  },
  {
    name: "Mason H.",
    role: "Mobile Developer",
    years: "5 yrs",
    skills: ["Flutter", "Swift", "Kotlin", "Xcode"],
    avatar: "/images/home/services.png",
  },
];

export const heroPortraits: Array<{
  src: string;
  top: string;
  left?: string;
  right?: string;
  delay: string;
}> = [
  { src: "/images/home/main.png", top: "6%", left: "9%", delay: "0s" },
  { src: "/images/home/services.png", top: "9%", left: "26%", delay: "0.1s" },
  { src: "/images/about-us/about-us.png", top: "4%", right: "11%", delay: "0.2s" },
  { src: "/images/home/main-video-cover.webp", top: "8%", right: "28%", delay: "0.3s" },
  { src: "/images/home/main.png", top: "28%", left: "0%", delay: "0.4s" },
  { src: "/images/home/services.png", top: "30%", left: "12%", delay: "0.5s" },
  { src: "/images/about-us/about-us.png", top: "42%", right: "20%", delay: "0.6s" },
  { src: "/images/home/main-video-cover.webp", top: "25%", right: "7%", delay: "0.7s" },
  { src: "/images/home/main.png", top: "70%", left: "4%", delay: "0.8s" },
  { src: "/images/home/services.png", top: "78%", left: "29%", delay: "0.9s" },
  { src: "/images/about-us/about-us.png", top: "84%", right: "32%", delay: "1s" },
  { src: "/images/home/main-video-cover.webp", top: "72%", right: "14%", delay: "1.1s" },
];

export const serviceTiles: ServiceTile[] = [
  {
    title: "Accessibility Auditing",
    copy: "We evaluate digital products to ensure they meet accessibility standards and are usable for everyone.",
    href: "/services/accessibility-first-product-design",
  },
  {
    title: "Accessibility Consulting",
    copy: "We guide teams on best practices, compliance, and inclusive design to build accessible and user-friendly digital experiences.",
    href: "/services/accessibility-first-product-design",
  },
  {
    title: "Application Development",
    copy: "We design and develop scalable web and mobile applications tailored to your business goals and user needs.",
    href: "/solutions/design-system-modernization",
    featured: true,
  },
  {
    title: "Blockchain Development",
    copy: "We create blockchain-based solutions for secure transactions, transparency, and decentralized applications.",
    href: "/services/product-replatforming-and-front-end-rebuilds",
  },
  {
    title: "Artificial Intelligence Integration",
    copy: "We integrate AI solutions to automate processes, improve decision-making, and enhance user experiences.",
    href: "/services/conversion-focused-marketing-pages",
  },
  {
    title: "Backend Development",
    copy: "We build secure, high-performance backend systems that power your applications and handle data efficiently.",
    href: "/services/product-replatforming-and-front-end-rebuilds",
  },
  {
    title: "Cloud Computing Services",
    copy: "We deploy and manage cloud infrastructure to ensure scalability, reliability, and cost efficiency.",
    href: "/technologies/astro-and-edge-rendering",
  },
  {
    title: "Code Review and Optimization",
    copy: "We analyze and optimize your codebase to improve performance, security, and maintainability.",
    href: "/technologies/design-tokens-and-component-architecture",
  },
  {
    title: "Custom API Development",
    copy: "We analyze and optimize your codebase to improve performance, security, and maintainability.",
    href: "/technologies/astro-and-edge-rendering",
  },
  {
    title: "Cybersecurity Services",
    copy: "We analyze and optimize your codebase to improve performance, security, and maintainability.",
    href: "/solutions/lead-generation-site-rebuild",
  },
];

export const benefitTiles: BenefitTile[] = [
  {
    title: "Product ownership",
    copy: "We own delivery and align output to business goals, not hours shipped.",
  },
  {
    title: "Senior engineering",
    copy: "Vetted specialists who can operate in complex codebases and release cycles.",
  },
  {
    title: "Fast scaling",
    copy: "Expand a squad without breaking cadence. Onboarding and replacement are managed.",
  },
  {
    title: "Transparency",
    copy: "Boards, reports, demos, and a clear escalation path keep you in control.",
  },
  {
    title: "Quality control",
    copy: "QA, code review, and standards reduce risk and improve predictability.",
  },
  {
    title: "Security baseline",
    copy: "Access hygiene, NDA discipline, and safe delivery practices for B2B contexts.",
  },
];

export const testimonialFilters = [
  "All industries",
  "Healthcare platforms",
  "FinTech Products",
  "eCommerce systems",
  "EdTech delivery",
  "Logistics & ops tools",
  "Real estate workflows",
];

export const testimonials: Testimonial[] = [
  {
    category: "Healthcare",
    company: "200+ employees | $458M funded | 8 talents assigned",
    metrics: ["Java", "Spring", "AWS", "Kubernetes", "React", "Node.js"],
    quote:
      "MoldstudTM nuanced understanding of Omio's hiring needs, fluid communication during the assignment, and high-reliability in managing developers. I can only recommend this approach.",
    author: "Noah B.",
    role: "CTO of Healthcare Startup",
  },
  {
    category: "Healthcare",
    company: "200+ employees | $458M funded | 8 talents assigned",
    metrics: ["Java", "Spring", "AWS", "Kubernetes", "React", "Node.js"],
    quote:
      "MoldstudTM nuanced understanding of Omio's hiring needs, fluid communication during the assignment, and high-reliability in managing developers. I can only recommend this approach.",
    author: "Noah B.",
    role: "CTO of Healthcare Startup",
  },
  {
    category: "Healthcare",
    company: "200+ employees | $458M funded | 8 talents assigned",
    metrics: ["Java", "Spring", "AWS", "Kubernetes", "React", "Node.js"],
    quote:
      "MoldstudTM nuanced understanding of Omio's hiring needs, fluid communication during the assignment, and high-reliability in managing developers. I can only recommend this approach.",
    author: "Noah B.",
    role: "CTO of Healthcare Startup",
  },
  {
    category: "Healthcare",
    company: "200+ employees | $458M funded | 8 talents assigned",
    metrics: ["Java", "Spring", "AWS", "Kubernetes", "React", "Node.js"],
    quote:
      "MoldstudTM nuanced understanding of Omio's hiring needs, fluid communication during the assignment, and high-reliability in managing developers. I can only recommend this approach.",
    author: "Noah B.",
    role: "CTO of Healthcare Startup",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Talent / project matching",
    copy: "We select the right specialists or structure the project based on your specific needs.",
  },
  {
    number: "02",
    title: "Onboarding & setup",
    copy: "We handle onboarding, access, and communication to ensure a smooth and fast start.",
  },
  {
    number: "03",
    title: "Execution & delivery",
    copy: "Our team works closely with you to deliver high-quality results on time.",
  },
  {
    number: "04",
    title: "Quality control & reporting",
    copy: "We continuously track performance, quality, and timelines.",
  },
];

export const techStack = [
  "PHP",
  "Angular",
  "Drupal",
  "C#",
  "Python",
  "Java",
  "Swift",
  "Ruby",
  "React",
  "Redux",
  "VueJS",
  "Git Hub",
  "Bitbucket",
  "Jira",
  "Docker",
  "WordPress",
  "Node JS",
  "Java Script",
];

export const industryTiles: IndustryTile[] = [
  {
    title: "Healthcare Technology",
    copy: "Providing top-tier medical software solutions and telehealth platforms to enhance patient care and streamline operations.",
    href: "/industries/fintech-and-regulated-platforms",
  },
  {
    title: "E-commerce Solutions",
    copy: "Developing robust online shopping experiences, including inventory management systems and customer engagement tools.",
    href: "/industries/health-and-public-sector-services",
  },
  {
    title: "Financial Services",
    copy: "Offering expertise in fintech solutions, from mobile banking apps to blockchain integration.",
    href: "/industries/fintech-and-regulated-platforms",
  },
  {
    title: "Education Technology",
    copy: "Creating interactive learning platforms and tools that facilitate remote education and enhance student engagement.",
    href: "/industries/health-and-public-sector-services",
  },
  {
    title: "Logistics and Supply Chain",
    copy: "Implementing software solutions that optimize supply chain management and track shipments in real-time.",
    href: "/industries/fintech-and-regulated-platforms",
  },
  {
    title: "Real Estate Platforms",
    copy: "Building user-friendly applications for property listings, virtual tours, and tenant management in the real estate sector.",
    href: "/industries/health-and-public-sector-services",
  },
];

export const certifications: Certification[] = [
  {
    title: "ISO/IEC 27001 – Information Security Management",
    copy: "Critical for IT outsourcing. It proves that client data, source code, and confidential information are handled securely.",
  },
  {
    title: "ISO 9001 – Quality Management System",
    copy: "Demonstrates structured, consistent processes for service delivery and client management.",
  },
];

export const homeJobs: HomeJob[] = [
  { title: "Senior Front-End", copy: "Design systems, performance, accessibility, product ownership mindset.", href: "/careers/senior-product-designer" },
  { title: "Backend / Platform", copy: "APIs, reliability, cloud, observability, security hygiene.", href: "/careers/front-end-engineer-design-systems" },
  { title: "QA / Automation", copy: "Quality control, test strategy, CI pipelines, release confidence.", href: "/careers/senior-product-designer" },
  { title: "QA / Automation", copy: "Quality control, test strategy, CI pipelines, release confidence.", href: "/careers/front-end-engineer-design-systems" },
];

export const mainFaqs: FaqItem[] = [
  {
    question: "What range of digital products does Moldstud offer?",
    answer:
      "Moldstud specializes in a wide array of digital solutions including AI-powered tools, blockchain applications, telehealth services, and augmented reality experiences, each designed to meet specific business needs.",
  },
  {
    question: "How does Moldstud ensure the quality of the digital products it designs and develops?",
    answer:
      "We use shared delivery boards, weekly demos, code review, QA standards, and controlled handoff routines to keep work consistent and measurable.",
  },
  {
    question: "Can Moldstud tailor a digital product to my specific business needs?",
    answer:
      "Yes. The delivery model is intentionally modular, so the team can scope around your product stage, architecture, and business goals.",
  },
  {
    question: "How does Moldstud approach user experience in its digital products?",
    answer:
      "The work emphasizes readability, clear hierarchy, and decision support so interfaces stay usable even when the information density is high.",
  },
  {
    question: "What support does Moldstud provide post-launch of a digital product?",
    answer:
      "Support covers maintenance, QA, optimization, and continuing design or front-end work once the first release is in market.",
  },
];

export const talentProfiles = [
  {
    name: "Oksana B.",
    role: "UI/UX Designer",
    experience: "5-7 years of experience",
    skills: ["Figma 5 yrs", "UI/UX 5 yrs", "Adobe 5 yrs", "Animation 2 yrs"],
    avatar: "/images/home/main-video-cover.webp",
  },
  {
    name: "Clarisse T.",
    role: "Graphic Designer",
    experience: "7-10 years of experience",
    skills: ["Figma 8 yrs", "UI/UX 8 yrs", "Adobe 8 yrs"],
    avatar: "/images/home/services.png",
  },
  {
    name: "Ndriqim M.",
    role: "Mobile Developer",
    experience: "5-7 years of experience",
    skills: ["Android 7 yrs", "Flutter 7 yrs", "iOS 7 yrs", "RESTful API 7 yrs"],
    avatar: "/images/about-us/about-us.png",
  },
];

export const jobsBoardFilters = [
  "Web Design",
  "Web Development",
  "Web Entry",
];

export const simplePages = {
  "/about-us": {
    slug: "about-us",
    title: "We build digital systems that are easier to trust and easier to grow.",
    intro:
      "Use this page for company context, working principles, and the kind of delivery discipline that sits behind the public-facing pages.",
  },
  "/contacts": {
    slug: "contacts",
    title: "Bring the scope, blockers, and delivery context.",
    intro:
      "This page stays simple on purpose. The goal is to create a direct path into a real conversation, not bury the visitor in filler copy.",
  },
  "/privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy policy",
    intro:
      "Production legal copy can replace this structure later. For now, the page preserves the final layout shell and supporting hierarchy.",
  },
  "/terms-and-conditions": {
    slug: "terms-and-conditions",
    title: "Terms and conditions",
    intro:
      "This lightweight page keeps the new-site shell in place for legal content until the final production copy is ready.",
  },
  "/cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie policy",
    intro:
      "Use this route for the final cookie policy copy. The main goal here is to keep legal pages inside the new-site runtime as well.",
  },
};

const listingConfigs = {
  services: {
    title: "Hire the Top 3% of the World's Talent",
    intro:
      "Our MoldstudTM is the easiest way to find, onboard, and pay a high-performing remote workforce, from software engineers building your product to specialists evaluating your AI models.",
    theme: "light" as const,
  },
  industries: {
    title: "Hire the Top 3% of the World's Talent",
    intro:
      "Our MoldstudTM is the easiest way to find, onboard, and pay a high-performing remote workforce, from software engineers building your product to specialists evaluating your AI models.",
    theme: "dark" as const,
  },
  solutions: {
    title: "Full Spectrum of Software Development Services",
    intro:
      "We deliver a full range of software development services, from front-end and back-end development to DevOps and QA automation. Our solutions are built to be scalable, secure, and tailored to modern business needs.",
    theme: "dark" as const,
    heroImage: {
      src: "/images/home/main.png",
      alt: "Software delivery team",
    },
  },
  technologies: {
    title: "Comprehensive technology stack powering modern digital solutions",
    intro:
      "On this page, you'll find a complete overview of the technologies we use at Moldstud. From front-end and backend frameworks to tools for automation, testing, and deployment, our stack allows us to build modern, scalable, and high-performance digital products tailored to our clients' needs.",
    theme: "light" as const,
  },
};

const detailHeroImages: Record<"services" | "industries" | "solutions" | "technologies", ImagePanel> = {
  services: {
    src: "/images/home/main.png",
    alt: "Team members around a desk",
  },
  industries: {
    src: "/images/home/services.png",
    alt: "Industry delivery environment",
  },
  solutions: {
    src: "/images/home/services.png",
    alt: "Engineering delivery",
  },
  technologies: {
    src: "/images/about-us/about-us.png",
    alt: "Modern technology teams",
  },
};

export const allRoutePaths = [
  "/",
  "/services",
  ...services.map((entry) => `/services/${entry.slug}`),
  "/industries",
  ...industries.map((entry) => `/industries/${entry.slug}`),
  "/solutions",
  ...solutions.map((entry) => `/solutions/${entry.slug}`),
  "/technologies",
  ...technologies.map((entry) => `/technologies/${entry.slug}`),
  "/articles",
  ...articles.map((entry) => `/articles/${entry.slug}`),
  "/careers",
  ...careers.map((entry) => `/careers/${entry.slug}`),
  ...careers.map((entry) => `/careers/${entry.slug}/apply`),
  "/case-studies",
  ...caseStudies.map((entry) => `/case-studies/${entry.slug}`),
  ...profiles.map((entry) => `/profiles/${entry.slug}`),
  "/hire-us",
  "/request-profiles",
  "/talents/designers",
  ...Object.keys(simplePages),
];

function getFamilyEntry(family: "services" | "industries" | "solutions" | "technologies", slug: string) {
  const collections = {
    services,
    industries,
    solutions,
    technologies,
  };

  return collections[family].find((entry) => entry.slug === slug);
}

export function resolveRoute(path: string): RoutePage | undefined {
  if (path === "/") {
    return { kind: "home" };
  }

  if (path === "/services") {
    return { kind: "listing", family: "services", cards: services, ...listingConfigs.services };
  }

  if (path === "/industries") {
    return { kind: "listing", family: "industries", cards: industries, ...listingConfigs.industries };
  }

  if (path === "/solutions") {
    return { kind: "listing", family: "solutions", cards: solutions, ...listingConfigs.solutions };
  }

  if (path === "/technologies") {
    return { kind: "listing", family: "technologies", cards: technologies, ...listingConfigs.technologies };
  }

  if (path === "/articles") {
    return { kind: "articles-list", entries: articles };
  }

  if (path === "/careers") {
    return { kind: "careers-list", entries: careers };
  }

  if (path === "/case-studies") {
    return { kind: "case-studies-list", entries: caseStudies };
  }

  if (path === "/hire-us") {
    return { kind: "hire-us" };
  }

  if (path === "/request-profiles") {
    return { kind: "request-profiles" };
  }

  if (path === "/talents/designers") {
    return { kind: "talents-designers" };
  }

  if (path in simplePages) {
    const page = simplePages[path as keyof typeof simplePages];
    return { kind: "simple", ...page };
  }

  const segments = path.split("/").filter(Boolean);

  if (segments.length === 2) {
    const [family, slug] = segments;

    if (family === "services" || family === "industries" || family === "solutions" || family === "technologies") {
      const entry = getFamilyEntry(family, slug);

      if (entry) {
        return {
          kind: "detail",
          family,
          entry,
          theme: "dark",
          heroImage: detailHeroImages[family],
        };
      }
    }

    if (family === "articles") {
      const entry = articles.find((item) => item.slug === slug);

      if (entry) {
        return {
          kind: "article-detail",
          entry,
          related: articles.filter((item) => item.slug !== slug).slice(0, 2),
        };
      }
    }

    if (family === "careers") {
      const entry = careers.find((item) => item.slug === slug);

      if (entry) {
        return { kind: "career-detail", entry };
      }
    }

    if (family === "case-studies") {
      const entry = caseStudies.find((item) => item.slug === slug);

      if (entry) {
        return {
          kind: "case-study-detail",
          entry,
          related: caseStudies.filter((item) => item.slug !== slug).slice(0, 2),
        };
      }
    }

    if (family === "profiles") {
      const entry = profiles.find((item) => item.slug === slug);

      if (entry) {
        return { kind: "profile", entry };
      }
    }
  }

  if (segments.length === 3 && segments[0] === "careers" && segments[2] === "apply") {
    const entry = careers.find((item) => item.slug === segments[1]);

    if (entry) {
      return { kind: "career-apply", entry };
    }
  }

  return undefined;
}
