import {database} from '@/database';
import {
  ArticleStatus,
  InsertArticle,
} from '@/modules/article/article.model';
import {ArticleRepository} from '@/modules/article/article.repository';
import {
  collectRewritegenPayloadFiles,
  parseRewritegenArticlePayload,
} from '@/modules/article/rewritegen-import.service';
import {author} from '@/modules/author/author.model';
import {category} from '@/modules/category/category.model';
import {eq} from 'drizzle-orm';
import {readFile} from 'node:fs/promises';

import {resolveRewritegenSolutionsRoot} from './rewritegen-paths';

const FALLBACK_IMAGE = 'https://moldstud.com/uploads/images/implementing-data-management-solutions-boost-your-business-growth.webp';

const CATEGORY_TREE = [
  {
    rootAlias: 'engineering-strategy',
    rootName: 'Engineering Strategy',
    childAlias: 'startup-engineering',
    childName: 'Startup Engineering',
  },
  {
    rootAlias: 'engineering-strategy',
    rootName: 'Engineering Strategy',
    childAlias: 'product-engineering',
    childName: 'Product Engineering',
  },
  {
    rootAlias: 'team-growth',
    rootName: 'Team Growth',
    childAlias: 'team-augmentation',
    childName: 'Team Augmentation',
  },
  {
    rootAlias: 'team-growth',
    rootName: 'Team Growth',
    childAlias: 'remote-hiring',
    childName: 'Remote Hiring',
  },
  {
    rootAlias: 'mobile-delivery',
    rootName: 'Mobile Delivery',
    childAlias: 'android-development',
    childName: 'Android Development',
  },
] as const;

type ParsedPayload = ReturnType<typeof parseRewritegenArticlePayload>;

const articleRepository = new ArticleRepository(database);

function trimTo(value: string, max: number): string {
  const text = `${value || ''}`.trim();

  if (text.length <= max) {
    return text;
  }

  return `${text.slice(0, Math.max(0, max - 3)).trimEnd()}...`;
}

function buildBootstrapContent(title: string): string {
  return `<p>Local bootstrap target for ${title}. This content is replaced in-place by the Bela payload import step.</p>`;
}

function chooseCategoryAlias(alias: string): string {
  if (/zoom|apple|mobile/.test(alias)) {
    return 'android-development';
  }

  if (/designer|design/.test(alias)) {
    return 'product-engineering';
  }

  if (/staff-augmentation|outsourcing|indian-app-developers/.test(alias)) {
    return 'team-augmentation';
  }

  if (/hiring|developers/.test(alias)) {
    return 'remote-hiring';
  }

  return 'startup-engineering';
}

async function ensureAuthorId(): Promise<number> {
  const existingPreferred = await database.query.author.findFirst({
    where: eq(author.alias, 'ana-crudu'),
  });

  if (existingPreferred) {
    return existingPreferred.id;
  }

  const existingAny = await database.query.author.findFirst();

  if (existingAny) {
    return existingAny.id;
  }

  const now = new Date();
  const inserted = await database.insert(author).values({
    alias: 'rewritegen-local',
    fullName: 'Rewritegen Local',
    position: 'Content Systems',
    photo: null,
    bio: 'Local fallback author used to restore Rewritegen/Bela article targets when the original MoldStud author dataset is missing.',
    expertise: ['rewritegen', 'content operations', 'local recovery'],
    education: {
      institution: 'Local Workspace',
      field: 'Content Operations',
      degree: 'Internal',
    },
    socials: [],
    metaTitle: 'Rewritegen Local',
    metaDescription: 'Local fallback author for Rewritegen/Bela article imports.',
    createdAt: now,
    updatedAt: now,
  }).$returningId();

  return inserted[0].id;
}

async function ensureCategory(alias: string, name: string, parentId?: number): Promise<number> {
  const existing = await database.query.category.findFirst({
    where: eq(category.alias, alias),
  });

  if (existing) {
    return existing.id;
  }

  const now = new Date();
  const inserted = await database.insert(category).values({
    alias,
    name,
    description: '',
    parentId: parentId ?? null,
    createdAt: now,
    updatedAt: now,
  }).$returningId();

  return inserted[0].id;
}

async function ensureCategoryIds(): Promise<Map<string, number>> {
  const ids = new Map<string, number>();

  for (const item of CATEGORY_TREE) {
    let rootId = ids.get(item.rootAlias);
    if (!rootId) {
      rootId = await ensureCategory(item.rootAlias, item.rootName);
      ids.set(item.rootAlias, rootId);
    }

    const childId = await ensureCategory(item.childAlias, item.childName, rootId);
    ids.set(item.childAlias, childId);
  }

  return ids;
}

async function readPayloads(): Promise<Awaited<ParsedPayload>[]> {
  const root = await resolveRewritegenSolutionsRoot();
  const files = await collectRewritegenPayloadFiles(root);
  const payloads = [];

  for (const file of files) {
    const raw = await readFile(file, 'utf8');
    payloads.push(parseRewritegenArticlePayload(JSON.parse(raw)));
  }

  return payloads;
}

async function fetchOgImage(url: string): Promise<string> {
  if (!url) {
    return FALLBACK_IMAGE;
  }

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'user-agent': 'MS Local Recovery/1.0',
      },
    });

    if (!response.ok) {
      return FALLBACK_IMAGE;
    }

    const html = await response.text();
    const directMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    const reverseMatch = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    const image = directMatch?.[1] || reverseMatch?.[1];

    return image || FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
}

async function createArticleShell({
  payload,
  authorId,
  categoryId,
  image,
  publishedAt,
}: {
  payload: Awaited<ParsedPayload>;
  authorId: number;
  categoryId: number;
  image: string;
  publishedAt: Date;
}): Promise<void> {
  const entity: InsertArticle = {
    alias: payload.target.alias,
    title: trimTo(payload.article.title, 255),
    image,
    authorId,
    categoryId,
    intro: trimTo(payload.article.intro, 2500),
    content: buildBootstrapContent(payload.article.title),
    status: ArticleStatus.published,
    timeToRead: Math.max(1, payload.article.time_to_read),
    metaTitle: trimTo(payload.article.meta_title, 255),
    metaDescription: payload.article.meta_description,
    publishedAt,
    createdAt: publishedAt,
    updatedAt: publishedAt,
  };

  await articleRepository.save({entity});
  await articleRepository.saveLatest({entity});
}

async function handle() {
  const payloads = await readPayloads();
  const authorId = await ensureAuthorId();
  const categoryIds = await ensureCategoryIds();

  let created = 0;
  let existing = 0;

  for (const [index, payload] of payloads.entries()) {
    const alreadyExists = await articleRepository.oneByAlias({alias: payload.target.alias});

    if (alreadyExists) {
      existing += 1;
      console.log(`EXISTS alias=${payload.target.alias}`);
      continue;
    }

    const categoryAlias = chooseCategoryAlias(payload.target.alias);
    const categoryId = categoryIds.get(categoryAlias);

    if (!categoryId) {
      throw new Error(`Missing category mapping for ${categoryAlias}`);
    }

    const image = await fetchOgImage(payload.source.url);
    const publishedAt = new Date(Date.now() - index * 60_000);

    await createArticleShell({
      payload,
      authorId,
      categoryId,
      image,
      publishedAt,
    });

    created += 1;
    console.log(`CREATED alias=${payload.target.alias} category=${categoryAlias}`);
  }

  console.log(`Bootstrap complete. created=${created} existing=${existing}`);
}

handle()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
