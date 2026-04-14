import {sql} from 'drizzle-orm';
import {database} from '@/database';
import {article, ArticleStatus, latestArticle, type InsertArticle} from '@/modules/article/article.model';
import {author, type InsertAuthor} from '@/modules/author/author.model';
import {category, type InsertCategory} from '@/modules/category/category.model';
import {comment} from '@/modules/comment/comment.model';

interface SeedCategory extends InsertCategory {
  key: string;
}

interface SeedArticleDraft {
  alias: string;
  title: string;
  intro: string;
  image: string;
  categoryKey: string;
  authorKey: string;
  timeToRead: number;
  publishedAt: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
}

function paragraph(text: string): string {
  return `<p>${text}</p>`;
}

function buildContent(title: string, sections: SeedArticleDraft['sections']): string {
  const intro = paragraph(`This local article seed is here to make the MoldStud blog render end to end while we work on the real content pipeline for ${title}.`);
  const html = sections.map((section) => {
    const bullets = section.bullets && section.bullets.length > 0
      ? `<ul>${section.bullets.map((item) => `<li>${item}</li>`).join('')}</ul>`
      : '';

    return [
      `<section>`,
      `<h2>${section.heading}</h2>`,
      section.paragraphs.map(paragraph).join(''),
      bullets,
      `</section>`,
    ].join('');
  }).join('');

  return `${intro}${html}`;
}

async function truncateBlogTables(): Promise<void> {
  await database.execute(sql.raw('SET FOREIGN_KEY_CHECKS = 0'));
  await database.execute(sql.raw('TRUNCATE TABLE `Comments`'));
  await database.execute(sql.raw('TRUNCATE TABLE `LatestArticles`'));
  await database.execute(sql.raw('TRUNCATE TABLE `Articles`'));
  await database.execute(sql.raw('TRUNCATE TABLE `Categories`'));
  await database.execute(sql.raw('TRUNCATE TABLE `Authors`'));
  await database.execute(sql.raw('SET FOREIGN_KEY_CHECKS = 1'));
}

async function main(): Promise<void> {
  await truncateBlogTables();

  const authors: InsertAuthor[] = [
    {
      alias: 'ana-crudu',
      fullName: 'Ana Crudu',
      position: 'Senior Content Strategist',
      photo: '/images/authors/uploads/ana-crudu.jpeg',
      bio: 'Ana helps shape practical engineering content for product teams, startup founders, and delivery leaders.',
      expertise: ['content strategy', 'product discovery', 'editorial operations'],
      education: {
        institution: 'Technical University of Moldova',
        field: 'Digital Product Management',
        degree: 'MSc',
      },
      socials: [
        {type: 'linkedin', url: 'https://www.linkedin.com/company/moldstud'},
        {type: 'github', url: 'https://github.com/celcumplit2/ms'},
      ],
      metaTitle: 'Ana Crudu | MoldStud',
      metaDescription: 'Ana Crudu writes and edits practical articles for the MoldStud engineering blog.',
    },
    {
      alias: 'vasile-crudu',
      fullName: 'Vasile Crudu',
      position: 'Engineering Research Lead',
      photo: '/images/authors/uploads/vasile-crudu.png',
      bio: 'Vasile focuses on software architecture, delivery process design, and platform decisions for modern web teams.',
      expertise: ['software architecture', 'delivery management', 'platform engineering'],
      education: {
        institution: 'Moldova State University',
        field: 'Computer Science',
        degree: 'BSc',
      },
      socials: [
        {type: 'linkedin', url: 'https://www.linkedin.com/company/moldstud'},
        {type: 'github', url: 'https://github.com/celcumplit2/ms'},
      ],
      metaTitle: 'Vasile Crudu | MoldStud',
      metaDescription: 'Vasile Crudu publishes engineering research and implementation guidance for the MoldStud blog.',
    },
  ];

  const insertedAuthors = await database.insert(author).values(authors).$returningId();
  const authorIds = new Map<string, number>([
    ['ana-crudu', insertedAuthors[0].id],
    ['vasile-crudu', insertedAuthors[1].id],
  ]);

  const rootCategories: SeedCategory[] = [
    {
      key: 'engineering-strategy',
      alias: 'engineering-strategy',
      name: 'Engineering Strategy',
      description: 'Planning, prioritization, architecture direction, and the delivery habits that help teams ship with confidence.',
      parentId: null,
    },
    {
      key: 'team-growth',
      alias: 'team-growth',
      name: 'Team Growth',
      description: 'How teams hire, scale, and structure collaboration when the product roadmap starts to accelerate.',
      parentId: null,
    },
    {
      key: 'mobile-delivery',
      alias: 'mobile-delivery',
      name: 'Mobile Delivery',
      description: 'Mobile engineering practices, platform tradeoffs, and release management for reliable app delivery.',
      parentId: null,
    },
  ];

  const insertedRoots = await database.insert(category).values(rootCategories).$returningId();
  const categoryIds = new Map<string, number>();

  rootCategories.forEach((item, index) => {
    categoryIds.set(item.key, insertedRoots[index].id);
  });

  const childCategories: SeedCategory[] = [
    {
      key: 'startup-engineering',
      alias: 'startup-engineering',
      name: 'Startup Engineering',
      description: 'Guidance for MVP planning, launch sequencing, and engineering decisions that fit early-stage companies.',
      parentId: categoryIds.get('engineering-strategy'),
    },
    {
      key: 'product-engineering',
      alias: 'product-engineering',
      name: 'Product Engineering',
      description: 'Delivery patterns for teams building durable product foundations, not one-off project code.',
      parentId: categoryIds.get('engineering-strategy'),
    },
    {
      key: 'team-augmentation',
      alias: 'team-augmentation',
      name: 'Team Augmentation',
      description: 'Working models for extension teams, pod design, onboarding, and shared delivery ownership.',
      parentId: categoryIds.get('team-growth'),
    },
    {
      key: 'remote-hiring',
      alias: 'remote-hiring',
      name: 'Remote Hiring',
      description: 'Remote recruiting guides, evaluation patterns, and role design for distributed engineering teams.',
      parentId: categoryIds.get('team-growth'),
    },
    {
      key: 'android-development',
      alias: 'android-development',
      name: 'Android Development',
      description: 'Patterns, toolchains, and release practices for Android teams shipping customer-facing products.',
      parentId: categoryIds.get('mobile-delivery'),
    },
  ];

  const insertedChildren = await database.insert(category).values(childCategories).$returningId();
  childCategories.forEach((item, index) => {
    categoryIds.set(item.key, insertedChildren[index].id);
  });

  const drafts: SeedArticleDraft[] = [
    {
      alias: 'software-development-services-for-startups',
      title: 'Software Development Services for Startups',
      intro: 'A practical guide to choosing a delivery model that keeps startup teams fast without locking them into brittle architecture.',
      image: '/images/home/services.png',
      categoryKey: 'startup-engineering',
      authorKey: 'ana-crudu',
      timeToRead: 7,
      publishedAt: '2026-03-18T09:00:00.000Z',
      sections: [
        {
          heading: 'Start with a narrow delivery scope',
          paragraphs: [
            'The healthiest startup engagements start with one problem statement, one measurable outcome, and one release milestone.',
            'That framing helps engineering teams avoid overbuilding and gives founders a faster feedback loop with users.',
          ],
          bullets: [
            'Define one success metric for the first release.',
            'Separate must-have work from discovery work.',
            'Review architecture only in the context of the next 90 days.',
          ],
        },
        {
          heading: 'Favor operating rhythm over documentation volume',
          paragraphs: [
            'Weekly product checkpoints, decision logs, and explicit release readiness reviews create more leverage than oversized specifications.',
          ],
        },
      ],
    },
    {
      alias: 'saas-mvp-planning-guide',
      title: 'SaaS MVP Planning Guide',
      intro: 'A lightweight planning framework for turning an idea backlog into a launchable SaaS MVP with believable milestones.',
      image: '/images/home/expertise.png',
      categoryKey: 'startup-engineering',
      authorKey: 'ana-crudu',
      timeToRead: 6,
      publishedAt: '2026-03-07T09:00:00.000Z',
      sections: [
        {
          heading: 'Frame the MVP around a single buying decision',
          paragraphs: [
            'The MVP only needs enough surface area for a real customer to understand the offer, trust the workflow, and decide to continue.',
          ],
        },
        {
          heading: 'Reduce launch risk before you add more features',
          paragraphs: [
            'Authentication, billing boundaries, observability, and support handoff usually matter more than a fourth settings page.',
          ],
          bullets: [
            'Track onboarding completion.',
            'Instrument critical user flows.',
            'Prepare support responses for the first cohort.',
          ],
        },
      ],
    },
    {
      alias: 'enterprise-product-engineering-services-for-product-development',
      title: 'Enterprise Product Engineering Services for Product Development',
      intro: 'How product engineering teams balance platform consistency, release velocity, and long-lived domain complexity.',
      image: '/images/about-us/about-us.webp',
      categoryKey: 'product-engineering',
      authorKey: 'vasile-crudu',
      timeToRead: 8,
      publishedAt: '2026-03-26T09:00:00.000Z',
      sections: [
        {
          heading: 'Product engineering is a system, not a staffing line item',
          paragraphs: [
            'Strong product engineering teams align platform choices, release governance, and UX quality around the same roadmap priorities.',
            'That system view helps organizations avoid the churn that comes from isolated project handoffs.',
          ],
        },
        {
          heading: 'Design for maintainability from the first increment',
          paragraphs: [
            'Shared interfaces, contract testing, and product telemetry give teams the confidence to evolve safely instead of freezing architecture too early.',
          ],
        },
      ],
    },
    {
      alias: 'accessible-design-system-checklist',
      title: 'Accessible Design System Checklist',
      intro: 'A practical checklist for teams that want their design system to improve accessibility instead of repeating defects at scale.',
      image: '/images/home/values.png',
      categoryKey: 'product-engineering',
      authorKey: 'ana-crudu',
      timeToRead: 5,
      publishedAt: '2026-02-27T09:00:00.000Z',
      sections: [
        {
          heading: 'Bake accessibility into component ownership',
          paragraphs: [
            'A reusable component only creates leverage when semantic markup, keyboard behavior, and content guidance are documented together.',
          ],
          bullets: [
            'Document focus behavior.',
            'Ship content examples with contrast-safe tokens.',
            'Track accessibility defects per component, not per page.',
          ],
        },
      ],
    },
    {
      alias: 'team-extension-services-the-key-to-building-scalable-development-teams',
      title: 'Team Extension Services - The Key to Building Scalable Development Teams',
      intro: 'What successful extension teams do differently during onboarding, planning, and release execution.',
      image: '/images/home/main.png',
      categoryKey: 'team-augmentation',
      authorKey: 'vasile-crudu',
      timeToRead: 7,
      publishedAt: '2026-03-22T09:00:00.000Z',
      sections: [
        {
          heading: 'Extension teams need shared ownership from day one',
          paragraphs: [
            'The fastest augmentations pair local context with explicit delivery ownership instead of treating external engineers like overflow capacity.',
          ],
        },
        {
          heading: 'Give the team access to decisions, not just tickets',
          paragraphs: [
            'Roadmap context, architecture notes, and production observability make extension teams useful much sooner than task-only workflows.',
          ],
        },
      ],
    },
    {
      alias: 'remote-react-developer-hiring-guide',
      title: 'Remote React Developer Hiring Guide',
      intro: 'A focused hiring guide for teams evaluating remote React engineers across product thinking, frontend quality, and collaboration habits.',
      image: '/images/home/main-video-cover.webp',
      categoryKey: 'team-augmentation',
      authorKey: 'ana-crudu',
      timeToRead: 5,
      publishedAt: '2026-02-20T09:00:00.000Z',
      sections: [
        {
          heading: 'Assess delivery habits, not just framework trivia',
          paragraphs: [
            'Good remote React engineers explain tradeoffs, structure UI changes clearly, and keep accessibility and performance visible during implementation.',
          ],
          bullets: [
            'Ask for examples of UI state decomposition.',
            'Look for testing depth around edge cases.',
            'Review how candidates communicate constraints.',
          ],
        },
      ],
    },
    {
      alias: 'how-to-hire-remote-laravel-developers',
      title: 'How to Hire Remote Laravel Developers',
      intro: 'A hiring framework for backend-heavy product teams that need Laravel engineers who can own delivery beyond CRUD endpoints.',
      image: '/images/services/icon-keyboard.svg',
      categoryKey: 'remote-hiring',
      authorKey: 'vasile-crudu',
      timeToRead: 6,
      publishedAt: '2026-03-12T09:00:00.000Z',
      sections: [
        {
          heading: 'Look for systems thinking around backend change',
          paragraphs: [
            'Laravel experience matters, but the bigger signal is how candidates approach schema evolution, deployment safety, and API contracts.',
          ],
        },
        {
          heading: 'Use practical evaluation tasks',
          paragraphs: [
            'A short exercise around queues, validation, and migration safety reveals much more than generic framework quizzes.',
          ],
        },
      ],
    },
    {
      alias: 'technical-architect-roadmap',
      title: 'Technical Architect Roadmap',
      intro: 'A roadmap for engineers moving from feature delivery into architecture ownership, system tradeoffs, and cross-team decision making.',
      image: '/images/home/icon-code.svg',
      categoryKey: 'remote-hiring',
      authorKey: 'vasile-crudu',
      timeToRead: 7,
      publishedAt: '2026-02-11T09:00:00.000Z',
      sections: [
        {
          heading: 'Architecture starts with constraints',
          paragraphs: [
            'Technical architects create clarity by naming constraints, preserving optionality, and making hidden dependencies visible early.',
          ],
        },
        {
          heading: 'Decision quality comes from repeatable review loops',
          paragraphs: [
            'Architecture review gets better when teams compare a small set of options against operational cost, delivery speed, and business fit.',
          ],
        },
      ],
    },
    {
      alias: 'what-is-android-sdk',
      title: 'What Is Android SDK?',
      intro: 'A concise explanation of the Android SDK and how it fits into modern mobile app delivery for Android teams.',
      image: '/images/home/icon-mobile.svg',
      categoryKey: 'android-development',
      authorKey: 'ana-crudu',
      timeToRead: 4,
      publishedAt: '2026-03-01T09:00:00.000Z',
      sections: [
        {
          heading: 'The SDK is the baseline tooling layer',
          paragraphs: [
            'The Android SDK packages the build tools, platform APIs, emulators, and utilities teams need to compile, test, and ship Android apps.',
          ],
        },
        {
          heading: 'Use the SDK as part of a larger delivery setup',
          paragraphs: [
            'Reliable Android delivery also depends on CI, device coverage, release signing, and store-ready operational checks.',
          ],
        },
      ],
    },
    {
      alias: 'mobile-app-session-management',
      title: 'Mobile App Session Management',
      intro: 'How mobile teams design session handling that balances security, UX continuity, and low-friction reauthentication.',
      image: '/images/home/icon-security.svg',
      categoryKey: 'android-development',
      authorKey: 'vasile-crudu',
      timeToRead: 6,
      publishedAt: '2026-03-30T09:00:00.000Z',
      sections: [
        {
          heading: 'Session policies should reflect user risk',
          paragraphs: [
            'The right expiration rules depend on user intent, device trust, and the sensitivity of the underlying workflow.',
          ],
          bullets: [
            'Keep refresh logic observable.',
            'Separate inactivity timeout from hard session expiry.',
            'Plan reauthentication for high-risk actions.',
          ],
        },
        {
          heading: 'Design for broken network moments',
          paragraphs: [
            'Session refresh flows should fail gracefully so users can recover without losing local work or entering infinite login loops.',
          ],
        },
      ],
    },
  ];

  const articleRows: InsertArticle[] = drafts.map((draft) => {
    const publishedAt = new Date(draft.publishedAt);

    return {
      alias: draft.alias,
      title: draft.title,
      intro: draft.intro,
      content: buildContent(draft.title, draft.sections),
      image: draft.image,
      categoryId: categoryIds.get(draft.categoryKey),
      authorId: authorIds.get(draft.authorKey),
      status: ArticleStatus.published,
      timeToRead: draft.timeToRead,
      metaTitle: `${draft.title} | MoldStud`,
      metaDescription: draft.intro,
      publishedAt,
      createdAt: publishedAt,
      updatedAt: publishedAt,
    };
  });

  await database.insert(article).values(articleRows);
  await database.insert(latestArticle).values(articleRows);

  const articlesCount = await database.$count(article);
  const latestCount = await database.$count(latestArticle);

  console.log(`Seed complete: ${articlesCount} articles, ${latestCount} latest articles.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
