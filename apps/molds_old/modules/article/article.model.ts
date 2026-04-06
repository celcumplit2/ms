import {author} from '@/modules/author/author.model';
import {category} from '@/modules/category/category.model';
import {comment} from '@/modules/comment/comment.model';
import {InferInsertModel, InferSelectModel, relations} from 'drizzle-orm';
import {AnyMySqlColumn, customType, index, int, mediumtext, mysqlTable, text, timestamp, unique, varchar} from 'drizzle-orm/mysql-core';
import {invert} from 'lodash';

export enum ArticleStatus {
  unpublished = 'unpublished',
  published = 'published',
  draft = 'draft',
}

const STATUS_MAP: Record<number, ArticleStatus> = {
  0: ArticleStatus.unpublished,
  1: ArticleStatus.published,
  2: ArticleStatus.draft,
};

const articleStatus = customType<{
  data: ArticleStatus,
  driverData: number,
}>({
  dataType() {
    return 'tinyint';
  },
  toDriver(value: ArticleStatus): number {
    return Number(invert(STATUS_MAP)[value]);
  },
  fromDriver(value: number): ArticleStatus {
    return STATUS_MAP[value];
  },
});

const columns = {
  id: int({unsigned: true}).autoincrement().primaryKey(),
  categoryId: int({unsigned: true}).references((): AnyMySqlColumn => category.id),
  authorId: int({unsigned: true}).references((): AnyMySqlColumn => author.id),
  alias: varchar({length: 255}).notNull(),
  title: varchar({length: 255}).notNull(),
  image: varchar({length: 255}).notNull(),
  intro: text().notNull(),
  content: mediumtext().notNull(),
  status: articleStatus().notNull(),
  timeToRead: int().notNull(),
  metaTitle: varchar({length: 255}).notNull(),
  metaDescription: text().notNull(),
  publishedAt: timestamp().defaultNow().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
};

export const article = mysqlTable(
  'Articles',
  columns,
  (table) => ([
    unique('IDX_Articles_alias').on(table.alias),
    index('IDX_Articles_categoryId').on(table.categoryId),
    index('IDX_Articles_authorId').on(table.authorId),
    index('IDX_Articles_title').on(table.title),
    index('IDX_Articles_image').on(table.image),
    index('IDX_Articles_status').on(table.status),
    index('IDX_Articles_intro').on(table.intro),
    index('IDX_Articles_content').on(table.content),
    index('IDX_Articles_publishedAt').on(table.publishedAt),
    index('IDX_Articles_createdAt').on(table.createdAt),
  ]),
);
export const latestArticle = mysqlTable(
  'LatestArticles',
  columns,
  (table) => ([
    unique('IDX_LatestArticles_alias').on(table.alias),
    index('IDX_LatestArticles_categoryId').on(table.categoryId),
    index('IDX_LatestArticles_authorId').on(table.authorId),
    index('IDX_LatestArticles_status').on(table.status),
    index('IDX_LatestArticles_publishedAt').on(table.publishedAt),
    index('IDX_LatestArticles_createdAt').on(table.createdAt),
  ]),
);

export const articleRelations = relations(article, ({one, many}) => ({
  category: one(category, {fields: [article.categoryId], references: [category.id]}),
  author: one(author, {fields: [article.authorId], references: [author.id]}),
  comments: many(comment),
}));

export const latestArticleRelations = relations(latestArticle, ({one, many}) => ({
  category: one(category, {fields: [latestArticle.categoryId], references: [category.id]}),
  author: one(author, {fields: [latestArticle.authorId], references: [author.id]}),
  comments: many(comment),
}));

export type SelectArticle = InferSelectModel<typeof article>;
export type InsertArticle = InferInsertModel<typeof article>;
export type SelectLatestArticle = InferSelectModel<typeof latestArticle>;
export type InsertLatestArticle = InferInsertModel<typeof latestArticle>;
