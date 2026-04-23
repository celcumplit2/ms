import {existsSync, mkdirSync, rmSync, createReadStream} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, resolve} from 'node:path';
import {createInterface} from 'node:readline';

interface BuildOptions {
  sourcePath: string;
  outPath: string;
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

interface SqliteStatement {
  run: (...params: unknown[]) => unknown;
}

interface SqliteDatabase {
  exec: (sql: string) => void;
  prepare: (sql: string) => SqliteStatement;
  close: () => void;
}

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

function parseArgs(argv: string[]): BuildOptions {
  const repoRoot = findRepoRoot(process.cwd());
  let sourcePath = resolve(repoRoot, 'bd', 'extracted', 'legacy-blog', 'legacy-blog-articles.ndjson');
  let outPath = resolve(repoRoot, 'bd', 'extracted', 'legacy-blog', 'legacy-blog-extract.sqlite');

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];

    if ((arg === '--source' || arg === '-s') && argv[index + 1]) {
      sourcePath = resolve(argv[++index]);
      continue;
    }

    if ((arg === '--out' || arg === '-o') && argv[index + 1]) {
      outPath = resolve(argv[++index]);
      continue;
    }
  }

  return {
    sourcePath,
    outPath,
  };
}

function createDatabase(outPath: string): SqliteDatabase {
  const require = createRequire(import.meta.url);
  const sqliteModule = require('node:sqlite') as {
    DatabaseSync: new (path: string) => SqliteDatabase;
  };

  return new sqliteModule.DatabaseSync(outPath);
}

function initializeSchema(database: SqliteDatabase): void {
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = OFF;
    PRAGMA temp_store = MEMORY;
    PRAGMA foreign_keys = OFF;

    CREATE TABLE dataset_info (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE articles (
      article_id INTEGER PRIMARY KEY,
      category_id INTEGER,
      author_id INTEGER,
      alias TEXT NOT NULL,
      article_url TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      image_raw TEXT,
      image_url TEXT,
      intro TEXT,
      meta_title TEXT,
      meta_description TEXT,
      published_at TEXT,
      time_to_read INTEGER NOT NULL,
      internal_links_count INTEGER NOT NULL,
      statistical_paragraphs_count INTEGER NOT NULL
    );

    CREATE TABLE article_internal_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL,
      article_url TEXT NOT NULL,
      link_url TEXT NOT NULL,
      UNIQUE(article_id, link_url)
    );

    CREATE TABLE article_statistical_paragraphs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER NOT NULL,
      article_url TEXT NOT NULL,
      paragraph_index INTEGER NOT NULL,
      text TEXT NOT NULL,
      html TEXT NOT NULL
    );

    CREATE INDEX idx_articles_alias ON articles(alias);
    CREATE INDEX idx_articles_article_url ON articles(article_url);
    CREATE INDEX idx_article_internal_links_article_id ON article_internal_links(article_id);
    CREATE INDEX idx_article_internal_links_link_url ON article_internal_links(link_url);
    CREATE INDEX idx_article_statistical_paragraphs_article_id ON article_statistical_paragraphs(article_id);
  `);
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));

  if (!existsSync(options.sourcePath)) {
    throw new Error(`Source extract was not found: ${options.sourcePath}`);
  }

  mkdirSync(dirname(options.outPath), {recursive: true});

  if (existsSync(options.outPath)) {
    rmSync(options.outPath, {force: true});
  }

  const database = createDatabase(options.outPath);
  initializeSchema(database);

  const insertDatasetInfo = database.prepare('INSERT INTO dataset_info (key, value) VALUES (?, ?)');
  const insertArticle = database.prepare(`
    INSERT INTO articles (
      article_id,
      category_id,
      author_id,
      alias,
      article_url,
      title,
      image_raw,
      image_url,
      intro,
      meta_title,
      meta_description,
      published_at,
      time_to_read,
      internal_links_count,
      statistical_paragraphs_count
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertInternalLink = database.prepare(`
    INSERT OR IGNORE INTO article_internal_links (
      article_id,
      article_url,
      link_url
    ) VALUES (?, ?, ?)
  `);
  const insertStatisticalParagraph = database.prepare(`
    INSERT INTO article_statistical_paragraphs (
      article_id,
      article_url,
      paragraph_index,
      text,
      html
    ) VALUES (?, ?, ?, ?, ?)
  `);

  const reader = createInterface({
    input: createReadStream(options.sourcePath, {encoding: 'utf8'}),
    crlfDelay: Infinity,
  });

  let articlesCount = 0;
  let internalLinksCount = 0;
  let statisticalParagraphsCount = 0;

  database.exec('BEGIN');

  for await (const line of reader) {
    if (!line.trim()) {
      continue;
    }

    const article = JSON.parse(line) as ExtractedArticle;

    insertArticle.run(
      article.articleId,
      article.categoryId,
      article.authorId,
      article.alias,
      article.articleUrl,
      article.title,
      article.image.raw,
      article.image.url,
      article.intro,
      article.meta.title,
      article.meta.description,
      article.publishedAt,
      article.timeToRead,
      article.internalLinks.length,
      article.statisticalParagraphs.length,
    );

    for (const link of article.internalLinks) {
      insertInternalLink.run(article.articleId, article.articleUrl, link);
      internalLinksCount++;
    }

    article.statisticalParagraphs.forEach((paragraph, index) => {
      insertStatisticalParagraph.run(
        article.articleId,
        article.articleUrl,
        index,
        paragraph.text,
        paragraph.html,
      );
      statisticalParagraphsCount++;
    });

    articlesCount++;

    if (articlesCount % 250 === 0) {
      database.exec('COMMIT');
      database.exec('BEGIN');
    }
  }

  database.exec('COMMIT');
  database.exec('BEGIN');

  insertDatasetInfo.run('generated_at', new Date().toISOString());
  insertDatasetInfo.run('source_ndjson', options.sourcePath);
  insertDatasetInfo.run('articles_count', String(articlesCount));
  insertDatasetInfo.run('internal_links_count', String(internalLinksCount));
  insertDatasetInfo.run('statistical_paragraphs_count', String(statisticalParagraphsCount));

  database.exec('COMMIT');
  database.close();

  console.log(`SQLite build complete: ${options.outPath}`);
  console.log(`Articles: ${articlesCount}`);
  console.log(`Internal links: ${internalLinksCount}`);
  console.log(`Statistical paragraphs: ${statisticalParagraphsCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
