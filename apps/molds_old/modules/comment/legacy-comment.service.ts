import 'server-only';

import {existsSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {ArticleComment} from '@/modules/comment/article-comment';

interface LegacyCommentRow {
  comment_id: number;
  name: string;
  content: string;
  published_at: string | null;
}

interface SqliteStatement {
  all: (...params: unknown[]) => LegacyCommentRow[];
}

interface SqliteDatabase {
  prepare: (sql: string) => SqliteStatement;
}

const globalForLegacyComments = globalThis as typeof globalThis & {
  legacyCommentsDatabasePromise?: Promise<SqliteDatabase | null>;
};

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

function getLegacyCommentsDatabasePath(): string {
  const repoRoot = findRepoRoot(process.cwd());

  return resolve(repoRoot, 'bd', 'extracted', 'legacy-blog', 'legacy-blog-comments.sqlite');
}

async function getLegacyCommentsDatabase(): Promise<SqliteDatabase | null> {
  if (!globalForLegacyComments.legacyCommentsDatabasePromise) {
    globalForLegacyComments.legacyCommentsDatabasePromise = (async () => {
      const databasePath = getLegacyCommentsDatabasePath();

      if (!existsSync(databasePath)) {
        return null;
      }

      const sqliteModule = await import('node:sqlite') as unknown as {
        DatabaseSync: new (path: string) => SqliteDatabase;
      };

      return new sqliteModule.DatabaseSync(databasePath);
    })();
  }

  return globalForLegacyComments.legacyCommentsDatabasePromise;
}

export function getLegacyArticleUrl(alias: string): string {
  const slug = alias.startsWith('p-') ? alias : `p-${alias}`;

  return `https://moldstud.com/articles/${slug}`;
}

export async function readLegacyPublishedCommentsByArticleUrl(articleUrl: string): Promise<ArticleComment[]> {
  const database = await getLegacyCommentsDatabase();

  if (!database) {
    return [];
  }

  const rows = database
    .prepare(`
      SELECT
        comment_id,
        name,
        content,
        published_at
      FROM published_comments
      WHERE article_url = ?
      ORDER BY published_at ASC, comment_id ASC
    `)
    .all(articleUrl);

  return rows.map((row) => ({
    id: `legacy-${row.comment_id}`,
    name: row.name,
    content: row.content,
    publishedAt: row.published_at ? new Date(row.published_at) : new Date(0),
    source: 'legacy',
  }));
}
