import {existsSync, mkdirSync, rmSync, createReadStream, writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, resolve} from 'node:path';
import {createInterface, Interface} from 'node:readline';

type SqlValue = number | string | null;

interface BuildOptions {
  dumpPath: string;
  identifiersPath: string;
  outPath: string;
  summaryPath: string;
}

interface ArticleIdentifier {
  articleId: number;
  alias: string;
  articleUrl: string;
  title: string;
  publishedAt: string;
}

interface SqliteStatement {
  run: (...params: unknown[]) => unknown;
}

interface SqliteDatabase {
  exec: (sql: string) => void;
  prepare: (sql: string) => SqliteStatement & {
    get: (...params: unknown[]) => unknown;
  };
  close: () => void;
}

interface BuildSummary {
  generatedAt: string;
  dumpPath: string;
  identifiersPath: string;
  sqlitePath: string;
  articlesIndexed: number;
  commentsWritten: number;
  publishedComments: number;
  draftComments: number;
  unpublishedComments: number;
  commentsWithoutArticleUrl: number;
  distinctArticleIdsInComments: number;
  outputFiles: {
    sqlite: string;
    summary: string;
  };
}

const COMMENTS_INSERT_PREFIX = 'INSERT INTO `Comments` VALUES';

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
  let dumpPath = resolve(repoRoot, 'bd', '202604030500.moldstud.sql');
  let identifiersPath = resolve(repoRoot, 'bd', 'extracted', 'legacy-blog', 'legacy-blog-identifiers.ndjson');
  let outPath = resolve(repoRoot, 'bd', 'extracted', 'legacy-blog', 'legacy-blog-comments.sqlite');
  let summaryPath = resolve(repoRoot, 'bd', 'extracted', 'legacy-blog', 'legacy-blog-comments-summary.json');

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];

    if ((arg === '--dump' || arg === '-d') && argv[index + 1]) {
      dumpPath = resolve(argv[++index]);
      continue;
    }

    if ((arg === '--identifiers' || arg === '-i') && argv[index + 1]) {
      identifiersPath = resolve(argv[++index]);
      continue;
    }

    if ((arg === '--out' || arg === '-o') && argv[index + 1]) {
      outPath = resolve(argv[++index]);
      continue;
    }

    if ((arg === '--summary' || arg === '-s') && argv[index + 1]) {
      summaryPath = resolve(argv[++index]);
      continue;
    }
  }

  return {
    dumpPath,
    identifiersPath,
    outPath,
    summaryPath,
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

    CREATE TABLE article_identifiers (
      article_id INTEGER PRIMARY KEY,
      alias TEXT NOT NULL,
      article_url TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      published_at TEXT
    );

    CREATE TABLE comments (
      comment_id INTEGER PRIMARY KEY,
      article_id INTEGER NOT NULL,
      article_url TEXT,
      article_alias TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      content TEXT NOT NULL,
      status_int INTEGER NOT NULL,
      status_label TEXT NOT NULL,
      published_at TEXT,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE VIEW published_comments AS
      SELECT *
      FROM comments
      WHERE status_int = 1;

    CREATE VIEW comment_counts_by_article AS
      SELECT
        article_id,
        article_url,
        COUNT(*) AS total_comments,
        SUM(CASE WHEN status_int = 1 THEN 1 ELSE 0 END) AS published_comments,
        SUM(CASE WHEN status_int = 2 THEN 1 ELSE 0 END) AS draft_comments,
        SUM(CASE WHEN status_int = 0 THEN 1 ELSE 0 END) AS unpublished_comments
      FROM comments
      GROUP BY article_id, article_url;

    CREATE INDEX idx_comments_article_id ON comments(article_id);
    CREATE INDEX idx_comments_article_url ON comments(article_url);
    CREATE INDEX idx_comments_status_int ON comments(status_int);
    CREATE INDEX idx_comments_published_at ON comments(published_at);
    CREATE INDEX idx_comments_email ON comments(email);
    CREATE INDEX idx_comments_article_alias ON comments(article_alias);
  `);
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

function statusLabelFromInt(status: number): string {
  switch (status) {
    case 1:
      return 'published';
    case 2:
      return 'draft';
    default:
      return 'unpublished';
  }
}

async function loadArticleIdentifiers(path: string): Promise<Map<number, ArticleIdentifier>> {
  const reader = createInterface({
    input: createReadStream(path, {encoding: 'utf8'}),
    crlfDelay: Infinity,
  });
  const identifiers = new Map<number, ArticleIdentifier>();

  for await (const line of reader) {
    if (!line.trim()) {
      continue;
    }

    const identifier = JSON.parse(line) as ArticleIdentifier;
    identifiers.set(identifier.articleId, identifier);
  }

  return identifiers;
}

async function processComments(
  reader: Interface,
  database: SqliteDatabase,
  identifiers: Map<number, ArticleIdentifier>,
  options: BuildOptions,
): Promise<BuildSummary> {
  const insertDatasetInfo = database.prepare('INSERT INTO dataset_info (key, value) VALUES (?, ?)');
  const insertArticleIdentifier = database.prepare(`
    INSERT INTO article_identifiers (
      article_id,
      alias,
      article_url,
      title,
      published_at
    ) VALUES (?, ?, ?, ?, ?)
  `);
  const insertComment = database.prepare(`
    INSERT INTO comments (
      comment_id,
      article_id,
      article_url,
      article_alias,
      name,
      email,
      content,
      status_int,
      status_label,
      published_at,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let inCommentsInsert = false;
  let commentsWritten = 0;
  let publishedComments = 0;
  let draftComments = 0;
  let unpublishedComments = 0;
  let commentsWithoutArticleUrl = 0;
  const distinctArticleIdsInComments = new Set<number>();

  database.exec('BEGIN');

  for (const identifier of identifiers.values()) {
    insertArticleIdentifier.run(
      identifier.articleId,
      identifier.alias,
      identifier.articleUrl,
      identifier.title,
      identifier.publishedAt,
    );
  }

  for await (const line of reader) {
    const trimmedLine = line.trim();

    if (!inCommentsInsert) {
      if (!trimmedLine.startsWith(COMMENTS_INSERT_PREFIX)) {
        continue;
      }

      inCommentsInsert = true;
      const remainder = trimmedLine.slice(COMMENTS_INSERT_PREFIX.length).trim();
      const tuples = extractTuplesFromChunk(remainder);

      for (const tuple of tuples) {
        const values = parseSqlTuple(tuple);

        if (values.length < 9) {
          continue;
        }

        const commentId = Number(values[0]);
        const articleId = Number(values[1]);
        const identifier = identifiers.get(articleId);
        const statusInt = typeof values[5] === 'number' ? values[5] : Number(values[5] ?? 0);
        const statusLabel = statusLabelFromInt(statusInt);

        insertComment.run(
          commentId,
          articleId,
          identifier?.articleUrl ?? null,
          identifier?.alias ?? null,
          typeof values[2] === 'string' ? values[2] : '',
          typeof values[3] === 'string' ? values[3] : '',
          typeof values[4] === 'string' ? values[4] : '',
          statusInt,
          statusLabel,
          typeof values[6] === 'string' ? values[6] : null,
          typeof values[7] === 'string' ? values[7] : null,
          typeof values[8] === 'string' ? values[8] : null,
        );

        commentsWritten++;
        distinctArticleIdsInComments.add(articleId);

        if (!identifier?.articleUrl) {
          commentsWithoutArticleUrl++;
        }

        if (statusInt === 1) {
          publishedComments++;
        } else if (statusInt === 2) {
          draftComments++;
        } else {
          unpublishedComments++;
        }

        if (commentsWritten % 5000 === 0) {
          database.exec('COMMIT');
          database.exec('BEGIN');
        }
      }

      if (trimmedLine.endsWith(';')) {
        inCommentsInsert = false;
      }

      continue;
    }

    const tuples = extractTuplesFromChunk(trimmedLine);

    for (const tuple of tuples) {
      const values = parseSqlTuple(tuple);

      if (values.length < 9) {
        continue;
      }

      const commentId = Number(values[0]);
      const articleId = Number(values[1]);
      const identifier = identifiers.get(articleId);
      const statusInt = typeof values[5] === 'number' ? values[5] : Number(values[5] ?? 0);
      const statusLabel = statusLabelFromInt(statusInt);

      insertComment.run(
        commentId,
        articleId,
        identifier?.articleUrl ?? null,
        identifier?.alias ?? null,
        typeof values[2] === 'string' ? values[2] : '',
        typeof values[3] === 'string' ? values[3] : '',
        typeof values[4] === 'string' ? values[4] : '',
        statusInt,
        statusLabel,
        typeof values[6] === 'string' ? values[6] : null,
        typeof values[7] === 'string' ? values[7] : null,
        typeof values[8] === 'string' ? values[8] : null,
      );

      commentsWritten++;
      distinctArticleIdsInComments.add(articleId);

      if (!identifier?.articleUrl) {
        commentsWithoutArticleUrl++;
      }

      if (statusInt === 1) {
        publishedComments++;
      } else if (statusInt === 2) {
        draftComments++;
      } else {
        unpublishedComments++;
      }

      if (commentsWritten % 5000 === 0) {
        database.exec('COMMIT');
        database.exec('BEGIN');
      }
    }

    if (trimmedLine.endsWith(';')) {
      inCommentsInsert = false;
    }
  }

  database.exec('COMMIT');
  database.exec('BEGIN');

  insertDatasetInfo.run('generated_at', new Date().toISOString());
  insertDatasetInfo.run('source_dump', options.dumpPath);
  insertDatasetInfo.run('source_identifiers', options.identifiersPath);
  insertDatasetInfo.run('articles_indexed', String(identifiers.size));
  insertDatasetInfo.run('comments_written', String(commentsWritten));
  insertDatasetInfo.run('comments_without_article_url', String(commentsWithoutArticleUrl));

  database.exec('COMMIT');

  return {
    generatedAt: new Date().toISOString(),
    dumpPath: options.dumpPath,
    identifiersPath: options.identifiersPath,
    sqlitePath: options.outPath,
    articlesIndexed: identifiers.size,
    commentsWritten,
    publishedComments,
    draftComments,
    unpublishedComments,
    commentsWithoutArticleUrl,
    distinctArticleIdsInComments: distinctArticleIdsInComments.size,
    outputFiles: {
      sqlite: options.outPath,
      summary: options.summaryPath,
    },
  };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));

  if (!existsSync(options.dumpPath)) {
    throw new Error(`SQL dump was not found: ${options.dumpPath}`);
  }

  if (!existsSync(options.identifiersPath)) {
    throw new Error(`Identifiers index was not found: ${options.identifiersPath}`);
  }

  mkdirSync(dirname(options.outPath), {recursive: true});
  mkdirSync(dirname(options.summaryPath), {recursive: true});

  if (existsSync(options.outPath)) {
    rmSync(options.outPath, {force: true});
  }

  const identifiers = await loadArticleIdentifiers(options.identifiersPath);
  const database = createDatabase(options.outPath);
  initializeSchema(database);

  const reader = createInterface({
    input: createReadStream(options.dumpPath, {encoding: 'utf8'}),
    crlfDelay: Infinity,
  });

  const summary = await processComments(reader, database, identifiers, options);

  writeFileSync(options.summaryPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  database.close();

  console.log(`Comments SQLite build complete: ${options.outPath}`);
  console.log(`Comments: ${summary.commentsWritten}`);
  console.log(`Published: ${summary.publishedComments}`);
  console.log(`Draft: ${summary.draftComments}`);
  console.log(`Unpublished: ${summary.unpublishedComments}`);
  console.log(`Comments without article_url: ${summary.commentsWithoutArticleUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
