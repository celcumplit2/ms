export type NavLink = {
  href: string;
  label: string;
};

export type ActionLink = {
  href: string;
  label: string;
};

export type Metric = {
  label: string;
  value: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CardItem = {
  slug: string;
  title: string;
  summary: string;
  eyebrow: string;
  tags: string[];
  stat?: string;
  image?: string;
};

export type DetailSection = {
  title: string;
  body: string;
};

export type DetailEntry = CardItem & {
  intro: string;
  metrics: Metric[];
  bullets: string[];
  sections: DetailSection[];
  faqs: FaqItem[];
  quote?: string;
  ctaTitle?: string;
  ctaCopy?: string;
};

export type ArticleEntry = CardItem & {
  author: string;
  publishedAt: string;
  readTime: string;
  intro: string;
  sections: DetailSection[];
  takeaway: string[];
};

export type CareerEntry = CardItem & {
  location: string;
  employmentType: string;
  level: string;
  compensation: string;
  intro: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

export type ProfileEntry = CardItem & {
  role: string;
  location: string;
  skills: string[];
  highlights: string[];
};

export type CaseStudyEntry = CardItem & {
  client: string;
  outcome: string;
  duration: string;
  intro: string;
  challenge: string;
  approach: string;
  result: string;
};
