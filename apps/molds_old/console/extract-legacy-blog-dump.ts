import {createReadStream, createWriteStream, existsSync, mkdirSync} from 'node:fs';
import {writeFile} from 'node:fs/promises';
import {Interface, createInterface} from 'node:readline';
import {dirname, resolve} from 'node:path';

type SqlValue = number | string | null;

interface ScriptOptions {
  sourcePath: string;
  outDir: string;
  limit?: number;
}

interface ExtractedArticle {
  articleId: number;
  categoryId: number | null;
  authorId: number | null;
  alias: string;
  articleUrl: string;
  title: string;
  image: {
    raw: string;
    url: string | null;
  };
  intro: string;
  meta: {
    title: string;
    description: string;
  };
  publishedAt: string;
  timeToRead: number;
  internalLinks: string[];
  statisticalParagraphs: Array<{
    text: string;
    html: string;
  }>;
}

interface Summary {
  generatedAt: string;
  sourcePath: string;
  outDir: string;
  limit: number | null;
  tuplesSeen: number;
  publishedArticlesSeen: number;
  articlesWritten: number;
  articlesWithInternalLinks: number;
  articlesWithStatisticalParagraphs: number;
  totalInternalLinks: number;
  uniqueInternalLinks: number;
  totalStatisticalParagraphs: number;
  outputFiles: {
    articles: string;
    identifiers: string;
    summary: string;
  };
}

const ARTICLE_INSERT_PREFIX = 'INSERT INTO `Articles` VALUES';
const STATS_PATTERN = /\b(according to|survey|surveys|report|reports|research|study|studies|statistics?|statistical|market data|gartner|forrester|mckinsey|deloitte|idc)\b|\b\d+(?:\.\d+)?\s?%|\bpercent(?:age)?\b/i;
const INTERNAL_LINK_HOST_PATTERN = /^(?:www\.)?moldstud\.com$/i;

function findRepoRoot(startDir: string): string {
  let currentDir = resolve(startDir);

  while (true) {
    if (existsSync(resolve(currentDir, '.git')) && existsSync(resolve(currentDir, 'bd'))) {
      return currentDir;
    }

    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) {
      throw new Error(`Could not determine repo root from ${startDir}`);
    }

    currentDir = parentDir;
  }
}

function parseArgs(argv: string[]): ScriptOptions {
  const repoRoot = findRepoRoot(process.cwd());
  let sourcePath = resolve(repoRoot, 'bd', '202604030500.moldstud.sql');
  let outDir = resolve(repoRoot, 'bd', 'extracted', 'legacy-blog');
  let limit: number | undefined;

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];

    if ((arg === '--source' || arg === '-s') && argv[index + 1]) {
      sourcePath = resolve(argv[++index]);
      continue;
    }

    if ((arg === '--out-dir' || arg === '-o') && argv[index + 1]) {
      outDir = resolve(argv[++index]);
      continue;
    }

    if ((arg === '--limit' || arg === '-l') && argv[index + 1]) {
      const parsed = Number.parseInt(argv[++index], 10);

      if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error(`Invalid --limit value: ${argv[index]}`);
      }

      limit = parsed;
      continue;
    }
  }

  return {
    sourcePath,
    outDir,
    limit,
  };
}

function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, '\'')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function stripHtml(input: string): string {
  return normalizeWhitespace(
    decodeHtmlEntities(
      input
        .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' '),
    ),
  );
}

function normalizeArticleUrl(alias: string): string {
  const slug = alias.startsWith('p-') ? alias : `p-${alias}`;

  return `https://moldstud.com/articles/${slug}`;
}

function normalizeImageUrl(image: string): string | null {
  const trimmed = image.trim();

  if (!trimmed) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  if (trimmed.startsWith('/')) {
    return `https://moldstud.com${trimmed}`;
  }

  if (/^(uploads|images)\//i.test(trimmed)) {
    return `https://moldstud.com/${trimmed}`;
  }

  return `https://moldstud.com/uploads/images/${trimmed}`;
}

function normalizeInternalLink(href: string): string | null {
  const trimmed = href.trim();

  if (!trimmed) {
    return null;
  }

  let candidate = trimmed;

  if (candidate.startsWith('//')) {
    candidate = `https:${candidate}`;
  } else if (candidate.startsWith('/')) {
    candidate = `https://moldstud.com${candidate}`;
  }

  try {
    const url = new URL(candidate);

    if (!INTERNAL_LINK_HOST_PATTERN.test(url.hostname)) {
      return null;
    }

    if (!url.pathname.startsWith('/articles/')) {
      return null;
    }

    return `https://moldstud.com${url.pathname}`;
  } catch {
    return null;
  }
}

function extractInternalLinks(content: string): string[] {
  const hrefPattern = /href\s*=\s*(["'])(.*?)\1/gi;
  const seen = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = hrefPattern.exec(content)) !== null) {
    const normalized = normalizeInternalLink(match[2]);

    if (normalized) {
      seen.add(normalized);
    }
  }

  return [...seen];
}

function extractStatisticalParagraphs(content: string): ExtractedArticle['statisticalParagraphs'] {
  const paragraphPattern = /<p\b[^>]*>[\s\S]*?<\/p>/gi;
  const paragraphs: ExtractedArticle['statisticalParagraphs'] = [];
  let match: RegExpExecArray | null;

  while ((match = paragraphPattern.exec(content)) !== null) {
    const html = match[0];
    const text = stripHtml(html);

    if (!text || !STATS_PATTERN.test(text)) {
      continue;
    }

    paragraphs.push({html, text});
  }

  return paragraphs;
}

function mapEscapedCharacter(character: string): string {
  switch (character) {
    case '0':
      return '\0';
    case 'b':
      return '\b';
    case 'n':
      return '\n';
    case 'r':
      return '\r';
    case 't':
      return '\t';
    case 'Z':
      return '\u001A';
    default:
      return character;
  }
}

function parseBareSqlValue(token: string): SqlValue {
  const trimmed = token.trim();

  if (!trimmed || trimmed.toUpperCase() === 'NULL') {
    return null;
  }

  const numericValue = Number(trimmed);

  if (!Number.isNaN(numericValue)) {
    return numericValue;
  }

  return trimmed;
}

function parseSqlTuple(tuple: string): SqlValue[] {
  const values: SqlValue[] = [];
  let current = '';
  let inString = false;
  let escaped = false;

  for (let index = 1; index < tuple.length; index++) {
    const character = tuple[index];

    if (inString) {
      if (escaped) {
        current += mapEscapedCharacter(character);
        escaped = false;
        continue;
      }

      if (character === '\\') {
        escaped = true;
        continue;
      }

      if (character === '\'') {
        if (tuple[index + 1] === '\'') {
          current += '\'';
          index++;
          continue;
        }

        inString = false;
        continue;
      }

      current += character;
      continue;
    }

    if (character === '\'') {
      inString = true;
      continue;
    }

    if (character === ',' || character === ')') {
      values.push(parseBareSqlValue(current));
      current = '';

      if (character === ')') {
        break;
      }

      continue;
    }

    current += character;
  }

  return values;
}

function extractTuplesFromChunk(chunk: string): string[] {
  const tuples: string[] = [];
  let inString = false;
  let escaped = false;
  let depth = 0;
  let tupleStart = -1;

  for (let index = 0; index < chunk.length; index++) {
    const character = chunk[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (character === '\\') {
        escaped = true;
        continue;
      }

      if (character === '\'') {
        if (chunk[index + 1] === '\'') {
          index++;
          continue;
        }

        inString = false;
      }

      continue;
    }

    if (character === '\'') {
      inString = true;
      continue;
    }

    if (character === '(') {
      if (depth === 0) {
        tupleStart = index;
      }

      depth++;
      continue;
    }

    if (character === ')') {
      depth--;

      if (depth === 0 && tupleStart !== -1) {
        tuples.push(chunk.slice(tupleStart, index + 1));
        tupleStart = -1;
      }
    }
  }

  return tuples;
}

function buildExtractedArticle(values: SqlValue[]): ExtractedArticle | null {
  if (values.length < 15) {
    return null;
  }

  const status = values[8];

  if (status !== 1) {
    return null;
  }

  const articleId = Number(values[0]);
  const categoryId = typeof values[1] === 'number' ? values[1] : null;
  const authorId = typeof values[2] === 'number' ? values[2] : null;
  const title = typeof values[3] === 'string' ? values[3] : '';
  const alias = typeof values[4] === 'string' ? values[4] : '';
  const imageRaw = typeof values[5] === 'string' ? values[5] : '';
  const intro = typeof values[6] === 'string' ? normalizeWhitespace(values[6]) : '';
  const content = typeof values[7] === 'string' ? values[7] : '';
  const timeToRead = typeof values[9] === 'number' ? values[9] : Number(values[9] ?? 0);
  const metaTitle = typeof values[10] === 'string' ? values[10] : '';
  const metaDescription = typeof values[11] === 'string' ? normalizeWhitespace(values[11]) : '';
  const publishedAt = typeof values[12] === 'string' ? values[12] : '';
  const internalLinks = extractInternalLinks(content);
  const statisticalParagraphs = extractStatisticalParagraphs(content);

  return {
    articleId,
    categoryId,
    authorId,
    alias,
    articleUrl: normalizeArticleUrl(alias),
    title,
    image: {
      raw: imageRaw,
      url: normalizeImageUrl(imageRaw),
    },
    intro,
    meta: {
      title: metaTitle,
      description: metaDescription,
    },
    publishedAt,
    timeToRead,
    internalLinks,
    statisticalParagraphs,
  };
}

async function processArticles(
  reader: Interface,
  options: ScriptOptions,
  articlesPath: string,
  identifiersPath: string,
): Promise<Summary> {
  const articlesWriter = createWriteStream(articlesPath, {encoding: 'utf8'});
  const identifiersWriter = createWriteStream(identifiersPath, {encoding: 'utf8'});

  let inArticlesInsert = false;
  let tuplesSeen = 0;
  let publishedArticlesSeen = 0;
  let articlesWritten = 0;
  let articlesWithInternalLinks = 0;
  let articlesWithStatisticalParagraphs = 0;
  let totalInternalLinks = 0;
  let totalStatisticalParagraphs = 0;
  const uniqueInternalLinks = new Set<string>();

  function writeArticle(article: ExtractedArticle): void {
    articlesWriter.write(`${JSON.stringify(article)}\n`);
    identifiersWriter.write(`${JSON.stringify({
      articleId: article.articleId,
      alias: article.alias,
      articleUrl: article.articleUrl,
      title: article.title,
      publishedAt: article.publishedAt,
    })}\n`);

    articlesWritten++;

    if (article.internalLinks.length > 0) {
      articlesWithInternalLinks++;
      totalInternalLinks += article.internalLinks.length;

      for (const link of article.internalLinks) {
        uniqueInternalLinks.add(link);
      }
    }

    if (article.statisticalParagraphs.length > 0) {
      articlesWithStatisticalParagraphs++;
      totalStatisticalParagraphs += article.statisticalParagraphs.length;
    }
  }

  for await (const line of reader) {
    const trimmedLine = line.trim();

    if (!inArticlesInsert) {
      if (!trimmedLine.startsWith(ARTICLE_INSERT_PREFIX)) {
        continue;
      }

      inArticlesInsert = true;
      const remainder = trimmedLine.slice(ARTICLE_INSERT_PREFIX.length).trim();
      const tuples = extractTuplesFromChunk(remainder);

      for (const tuple of tuples) {
        tuplesSeen++;
        const article = buildExtractedArticle(parseSqlTuple(tuple));

        if (!article) {
          continue;
        }

        publishedArticlesSeen++;
        writeArticle(article);

        if (options.limit && articlesWritten >= options.limit) {
          inArticlesInsert = false;
          break;
        }
      }

      if (options.limit && articlesWritten >= options.limit) {
        break;
      }

      if (trimmedLine.endsWith(';')) {
        inArticlesInsert = false;
      }

      continue;
    }

    const tuples = extractTuplesFromChunk(trimmedLine);

    for (const tuple of tuples) {
      tuplesSeen++;
      const article = buildExtractedArticle(parseSqlTuple(tuple));

      if (!article) {
        continue;
      }

      publishedArticlesSeen++;
      writeArticle(article);

      if (options.limit && articlesWritten >= options.limit) {
        inArticlesInsert = false;
        break;
      }
    }

    if (options.limit && articlesWritten >= options.limit) {
      break;
    }

    if (trimmedLine.endsWith(';')) {
      inArticlesInsert = false;
    }
  }

  await Promise.all([
    new Promise<void>((resolvePromise, rejectPromise) => {
      articlesWriter.end((error?: Error | null) => {
        if (error) {
          rejectPromise(error);
          return;
        }

        resolvePromise();
      });
    }),
    new Promise<void>((resolvePromise, rejectPromise) => {
      identifiersWriter.end((error?: Error | null) => {
        if (error) {
          rejectPromise(error);
          return;
        }

        resolvePromise();
      });
    }),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    sourcePath: options.sourcePath,
    outDir: options.outDir,
    limit: options.limit ?? null,
    tuplesSeen,
    publishedArticlesSeen,
    articlesWritten,
    articlesWithInternalLinks,
    articlesWithStatisticalParagraphs,
    totalInternalLinks,
    uniqueInternalLinks: uniqueInternalLinks.size,
    totalStatisticalParagraphs,
    outputFiles: {
      articles: articlesPath,
      identifiers: identifiersPath,
      summary: resolve(options.outDir, 'legacy-blog-summary.json'),
    },
  };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));

  if (!existsSync(options.sourcePath)) {
    throw new Error(`SQL dump was not found: ${options.sourcePath}`);
  }

  mkdirSync(options.outDir, {recursive: true});

  const articlesPath = resolve(options.outDir, 'legacy-blog-articles.ndjson');
  const identifiersPath = resolve(options.outDir, 'legacy-blog-identifiers.ndjson');
  const summaryPath = resolve(options.outDir, 'legacy-blog-summary.json');

  const reader = createInterface({
    input: createReadStream(options.sourcePath, {encoding: 'utf8'}),
    crlfDelay: Infinity,
  });

  const summary = await processArticles(reader, options, articlesPath, identifiersPath);

  await writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

  console.log(`Legacy blog extraction complete: ${summary.articlesWritten} published articles.`);
  console.log(`Articles file: ${articlesPath}`);
  console.log(`Identifiers file: ${identifiersPath}`);
  console.log(`Summary file: ${summaryPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
