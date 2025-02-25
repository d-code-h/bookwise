import config from '@/lib/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const {
  env: { databaseUrl },
} = config;

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql });
