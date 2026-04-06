import {article} from '@/modules/article/article.model';
import {InferInsertModel, InferSelectModel, relations} from 'drizzle-orm';
import {index, int, json, mysqlTable, text, timestamp, unique, varchar} from 'drizzle-orm/mysql-core';

interface AuthorEducation {
  institution: string,
  field: string | null;
  degree: string | null;
}

interface AuthorSocial {
  type: 'instagram' | 'facebook' | 'linkedin' | 'x' | 'github';
  url: string;
}

export const author = mysqlTable(
  'Authors',
  {
    id: int({unsigned: true}).autoincrement().primaryKey(),
    alias: varchar({length: 255}).notNull().unique(),
    fullName: varchar({length: 255}).notNull(),
    position: varchar({length: 255}).notNull(),
    photo: varchar({length: 255}),
    bio: text().notNull(),
    expertise: json().notNull().$type<string[]>(),
    education: json().notNull().$type<AuthorEducation>(),
    socials: json().notNull().$type<AuthorSocial[]>(),
    metaTitle: varchar({length: 255}).notNull(),
    metaDescription: varchar({length: 255}).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => ([
    unique('IDX_Authors_alias').on(table.alias),
    index('IDX_Authors_fullName').on(table.fullName),
    index('IDX_Authors_createdAt').on(table.createdAt),
  ]),
);

export const authorRelations = relations(author, ({many}) => ({
  articles: many(article),
}));

export type SelectAuthor = InferSelectModel<typeof author>;
export type InsertAuthor = InferInsertModel<typeof author>;
