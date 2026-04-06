export interface ImportCategory {
  parent: string | null;
  title: string;
}

export interface UpdateCategoryDescription {
  Category: string;
  Content: string;
}

export interface ImportArticle {
  category: string;
  description: string;
  image: string;
  intro: string;
  'meta.description': string;
  'meta.title': string;
  publishAt: string;
  root: string;
  status: string;
  timeToRead: string;
  title: string;
}

export interface ImportUpdateArticle {
  id: string;
  description: string;
  image: string;
  intro: string;
  'meta.description': string;
  'meta.title': string;
  title: string;
}

export interface ImportComment {
  name: string;
  email: string;
  content: string;
  blog_id: string;
  publish_at: string;
  status: 'published' | 'unpublished';
}

export interface ImportJob {
  alias: string;
  title: string;
  category: 'backend' | 'frontend';
  intro: string;
  seniority: 'Mid-Level' | 'Senior-Level';
  type: 'Full-Time';
  location: 'Remote';
  description: string;
  hardSkills: string[];
  hardSkills__001: string;
  hardSkills__002: string;
  hardSkills__003: string;
  hardSkills__004: string;
  hardSkills__005: string;
  hardSkills__006: string;
  hardSkills__007: string;
  softSkills__001: string;
  softSkills__002: string;
  softSkills__003: string;
  softSkills__004: string;
  softSkills: string[];
  timezone: string;
  workingHours: string;
  management: 'Scrum';
  timeSize: string;
  recruitmentSteps: Array<{ duration: number, description: string }>;
  recruitmentSteps__duration: string;
  recruitmentSteps__description: string;
  recruitmentSteps__optional: string;
}
