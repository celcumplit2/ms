import {article} from '@/modules/article/article.model';
import {type InferInsertModel, type InferSelectModel, relations} from 'drizzle-orm';
import {type AnyMySqlColumn, foreignKey, index, int, mysqlTable, text, timestamp, uniqueIndex, varchar} from 'drizzle-orm/mysql-core';

export const category = mysqlTable(
  'Categories',
  {
    id: int({unsigned: true}).autoincrement().primaryKey(),
    parentId: int({unsigned: true}).references((): AnyMySqlColumn => category.id),
    alias: varchar({length: 255}).notNull(),
    name: varchar({length: 255}).notNull(),
    description: text().notNull().default(''),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => ([
    uniqueIndex('IDX_Categories_alias').on(table.alias),
    index('IDX_Categories_parentId').on(table.name),
    index('IDX_Categories_name').on(table.name),
    index('IDX_Categories_createdAt').on(table.createdAt),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: 'FK_Categories_parentId',
    }),
  ]),
);

export const categoryRelations = relations(category, ({one, many}) => ({
  children: many(
    category,
    {
      relationName: 'categories_parentId_categories_id',
    },
  ),
  parent: one(
    category,
    {
      fields: [category.parentId],
      references: [category.id],
      relationName: 'categories_parentId_categories_id',
    },
  ),
  articles: many(article),
}));

export type SelectCategory = InferSelectModel<typeof category>;
export type InsertCategory = InferInsertModel<typeof category>;
