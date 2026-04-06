import type {InferInsertModel, InferSelectModel} from 'drizzle-orm';
import {customType, index, int, json, mysqlTable, timestamp, uniqueIndex, varchar} from 'drizzle-orm/mysql-core';
import {invert} from 'lodash';

export enum UserRole {
  admin = 'admin',
  manager = 'manager',
}

const ROLE_MAP: Record<number, UserRole> = {
  0: UserRole.admin,
  1: UserRole.manager,
};

const userRole = customType<{
  data: UserRole,
  driverData: number,
}>({
  dataType() {
    return 'tinyint';
  },
  toDriver(value: UserRole): number {
    return Number(invert(ROLE_MAP)[value]);
  },
  fromDriver(value: number): UserRole {
    return ROLE_MAP[value];
  },
});

export const user = mysqlTable(
  'Users',
  {
    id: int({unsigned: true}).autoincrement().primaryKey(),
    email: varchar({length: 254}).notNull().unique(),
    passwordHash: varchar({length: 255}).notNull(),
    role: userRole().notNull(),
    permissions: json().notNull().$type<string[]>(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => ([
    uniqueIndex('IDX_Users_email').on(table.email),
    index('IDX_Users_role').on(table.role),
    index('IDX_Users_createdAt').on(table.createdAt),
  ]),
);

export type SelectUser = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;
