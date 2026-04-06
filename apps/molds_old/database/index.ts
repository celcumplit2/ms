import {schema} from '@/database/schema';
import {drizzle} from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import process from 'process';
import '@/helpers/env-config';

const globalForDrizzle = globalThis as unknown as {
  database: ReturnType<typeof drizzle<typeof schema>> | undefined;
  pool: ReturnType<typeof mysql.createPool> | undefined;
};

const pool = globalForDrizzle.pool || mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const database = globalForDrizzle.database || drizzle({
  mode: 'default',
  client: pool,
  schema,
});

if (process.env.NODE_ENV !== 'production') {
  globalForDrizzle.pool = pool;
  globalForDrizzle.database = database;
}

export type Database = typeof database;
