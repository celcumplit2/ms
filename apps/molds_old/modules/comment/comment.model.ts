import {article} from '@/modules/article/article.model';
import {InferInsertModel, InferSelectModel, relations} from 'drizzle-orm';
import {AnyMySqlColumn, customType, index, int, mysqlTable, text, timestamp, varchar} from 'drizzle-orm/mysql-core';
import {invert} from 'lodash';

export enum CommentStatus {
  unpublished = 'unpublished',
  published = 'published',
  draft = 'draft',
}

const STATUS_MAP: Record<number, CommentStatus> = {
  0: CommentStatus.unpublished,
  1: CommentStatus.published,
  2: CommentStatus.draft,
};

const commentStatus = customType<{
  data: CommentStatus,
  driverData: number,
}>({
  dataType() {
    return 'tinyint';
  },
  toDriver(value: CommentStatus): number {
    return Number(invert(STATUS_MAP)[value]);
  },
  fromDriver(value: number): CommentStatus {
    return STATUS_MAP[value];
  },
});

export const comment = mysqlTable(
  'Comments',
  {
    id: int({unsigned: true}).autoincrement().primaryKey(),
    articleId: int({unsigned: true}).references((): AnyMySqlColumn => article.id),
    name: varchar({length: 255}).notNull(),
    email: varchar({length: 254}).notNull(),
    content: text().notNull(),
    status: commentStatus().notNull(),
    publishedAt: timestamp().defaultNow().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => ([
    index('IDX_Comments_name').on(table.name),
    index('IDX_Comments_email').on(table.email),
    index('IDX_Comments_status').on(table.status),
    index('IDX_Comments_publishedAt').on(table.publishedAt),
    index('IDX_Comments_createdAt').on(table.createdAt),
  ]),
);

export const commentRelations = relations(comment, ({one}) => ({
  article: one(article, {fields: [comment.articleId], references: [article.id]}),
}));

export type SelectComment = InferSelectModel<typeof comment>;
export type InsertComment = InferInsertModel<typeof comment>;
