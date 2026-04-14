import {database} from '@/database';
import {InsertArticle, latestArticle, SelectArticle} from '@/modules/article/article.model';
import {ArticleRepository} from '@/modules/article/article.repository';
import {eq} from 'drizzle-orm';
import {readFile, readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {z} from 'zod';

const REWRITEGEN_PAYLOAD_VERSION = 'moldstud.article-replace.v1' as const;

const runtimeFlagsSchema = z.object({
  has_rewritegen_blocks: z.boolean().optional(),
  has_charts: z.boolean().optional(),
  has_matrix: z.boolean().optional(),
  has_textblocks: z.boolean().optional(),
  has_decision_simulator: z.boolean().optional(),
  block_kinds: z.array(z.string()).optional(),
}).passthrough();

const rewritegenPayloadSchema = z.object({
  version: z.literal(REWRITEGEN_PAYLOAD_VERSION),
  source: z.object({
    system: z.string().min(1),
    url: z.string().optional().default(''),
    slug: z.string().min(1),
    run_id: z.string().optional().default(''),
    profile_id: z.string().optional().default(''),
    content_sha256: z.string().optional().default(''),
    final_html_sha256: z.string().optional().default(''),
    article_body_sha256: z.string().optional().default(''),
  }).passthrough(),
  target: z.object({
    alias: z.string().min(1),
    fallback_aliases: z.array(z.string().min(1)).optional().default([]),
  }).passthrough(),
  article: z.object({
    title: z.string().min(1),
    intro: z.string().min(1),
    meta_title: z.string().min(1),
    meta_description: z.string().min(1),
    time_to_read: z.number().int().positive(),
    image: z.string().optional().default(''),
    article_body_html: z.string().min(1),
  }),
  runtime: z.object({
    payload_charts: z.record(z.string(), z.unknown()).nullable().optional(),
    run_meta: z.record(z.string(), z.unknown()).optional().default({}),
    flags: runtimeFlagsSchema.optional(),
  }).passthrough(),
  diagnostics: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

export type RewritegenArticlePayload = z.infer<typeof rewritegenPayloadSchema>;

export type RewritegenImportOptions = {
  dryRun?: boolean;
};

export type RewritegenImportResult = {
  articleId?: number;
  changed: boolean;
  dryRun: boolean;
  matchedAlias?: string;
  sourceSlug: string;
  status: 'updated' | 'dry_run' | 'missing_target' | 'unchanged';
  targetAlias: string;
  title: string;
};

const articleRepository = new ArticleRepository(database);

function trimTo(value: string, max: number): string {
  const text = `${value || ''}`.trim();
  if (text.length <= max) {
    return text;
  }

  return `${text.slice(0, Math.max(0, max - 3)).trimEnd()}...`;
}

function stripPayloadScripts(articleBodyHtml: string): string {
  return articleBodyHtml
    .replace(/<script\b[^>]*id=["']payloadCharts["'][\s\S]*?<\/script>/gi, '')
    .replace(/<script\b[^>]*id=["']runMeta["'][\s\S]*?<\/script>/gi, '')
    .trim();
}

function renderJsonScript(id: string, payload: unknown): string {
  const content = JSON.stringify(payload).replace(/<\/script/gi, '<\\/script');

  return `<script type="application/json" id="${id}">${content}</script>`;
}

export function buildRewritegenStoredContent(payload: RewritegenArticlePayload): string {
  const parts = [stripPayloadScripts(payload.article.article_body_html)];

  if (payload.runtime.payload_charts) {
    parts.push(renderJsonScript('payloadCharts', payload.runtime.payload_charts));
  }
  if (payload.runtime.run_meta && Object.keys(payload.runtime.run_meta).length > 0) {
    parts.push(renderJsonScript('runMeta', payload.runtime.run_meta));
  }

  return parts.filter(Boolean).join('\n\n');
}

function buildReplacementEntity(existing: SelectArticle, payload: RewritegenArticlePayload): InsertArticle {
  return {
    alias: existing.alias,
    title: trimTo(payload.article.title, 255),
    image: payload.article.image || existing.image,
    authorId: existing.authorId,
    categoryId: existing.categoryId,
    intro: payload.article.intro,
    content: buildRewritegenStoredContent(payload),
    status: existing.status,
    timeToRead: payload.article.time_to_read,
    metaTitle: trimTo(payload.article.meta_title, 255),
    metaDescription: payload.article.meta_description,
    publishedAt: existing.publishedAt,
    createdAt: existing.createdAt,
    updatedAt: new Date(),
  };
}

function isEntityChanged(existing: SelectArticle, next: InsertArticle): boolean {
  return (
    existing.title !== next.title ||
    existing.image !== next.image ||
    existing.intro !== next.intro ||
    existing.content !== next.content ||
    existing.timeToRead !== next.timeToRead ||
    existing.metaTitle !== next.metaTitle ||
    existing.metaDescription !== next.metaDescription
  );
}

async function syncLatestArticle(alias: string, entity: InsertArticle): Promise<void> {
  await database.delete(latestArticle).where(eq(latestArticle.alias, alias));
  await articleRepository.saveLatest({entity});
}

export function parseRewritegenArticlePayload(input: unknown): RewritegenArticlePayload {
  return rewritegenPayloadSchema.parse(input);
}

export async function importRewritegenArticlePayload(
  input: unknown,
  options: RewritegenImportOptions = {},
): Promise<RewritegenImportResult> {
  const payload = parseRewritegenArticlePayload(input);
  const candidateAliases = [payload.target.alias, ...payload.target.fallback_aliases];
  let existing: SelectArticle | undefined;
  let matchedAlias: string | undefined;

  for (const candidateAlias of candidateAliases) {
    existing = await articleRepository.oneByAlias({alias: candidateAlias});
    if (existing) {
      matchedAlias = candidateAlias;
      break;
    }
  }

  if (!existing) {
    return {
      changed: false,
      dryRun: Boolean(options.dryRun),
      sourceSlug: payload.source.slug,
      status: 'missing_target',
      targetAlias: payload.target.alias,
      title: payload.article.title,
    };
  }

  const entity = buildReplacementEntity(existing, payload);
  const changed = isEntityChanged(existing, entity);

  if (options.dryRun) {
    return {
      articleId: existing.id,
      changed,
      dryRun: true,
      matchedAlias,
      sourceSlug: payload.source.slug,
      status: changed ? 'dry_run' : 'unchanged',
      targetAlias: payload.target.alias,
      title: payload.article.title,
    };
  }

  if (!changed) {
    return {
      articleId: existing.id,
      changed: false,
      dryRun: false,
      matchedAlias,
      sourceSlug: payload.source.slug,
      status: 'unchanged',
      targetAlias: payload.target.alias,
      title: payload.article.title,
    };
  }

  await articleRepository.save({
    id: existing.id,
    entity,
  });
  await syncLatestArticle(existing.alias, entity);

  return {
    articleId: existing.id,
    changed: true,
    dryRun: false,
    matchedAlias,
    sourceSlug: payload.source.slug,
    status: 'updated',
    targetAlias: payload.target.alias,
    title: payload.article.title,
  };
}

export async function importRewritegenPayloadFile(
  filePath: string,
  options: RewritegenImportOptions = {},
): Promise<RewritegenImportResult> {
  const absolutePath = resolve(filePath);
  const raw = await readFile(absolutePath, 'utf8');

  return importRewritegenArticlePayload(JSON.parse(raw), options);
}

export async function collectRewritegenPayloadFiles(directoryPath: string): Promise<string[]> {
  const root = resolve(directoryPath);
  const entries = await readdir(root, {withFileTypes: true});
  const files: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === '__finals') {
      continue;
    }

    files.push(resolve(root, entry.name, 'article.payload.json'));
  }

  return files;
}

export async function importRewritegenPayloadDirectory(
  directoryPath: string,
  options: RewritegenImportOptions = {},
): Promise<RewritegenImportResult[]> {
  const payloadFiles = await collectRewritegenPayloadFiles(directoryPath);
  const results: RewritegenImportResult[] = [];

  for (const filePath of payloadFiles) {
    results.push(await importRewritegenPayloadFile(filePath, options));
  }

  return results;
}
