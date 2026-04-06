import './drizzle/envConfig';
import {defineConfig} from 'drizzle-kit';
import process from 'process';

export default defineConfig({
  out: './drizzle',
  schema: './modules/**/*.model.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  },
  migrations: {
    prefix: 'timestamp',
    table: 'migrations',
    schema: 'public',
  },
  breakpoints: true,
  verbose: true,
  strict: true,
});
