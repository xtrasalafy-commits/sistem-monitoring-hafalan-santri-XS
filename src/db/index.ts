import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlClient?: ReturnType<typeof postgres>;
};

export const sql =
  globalForDb.__arenaNextJsPostgresqlClient ??
  postgres(databaseUrl, {
    prepare: true,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlClient = sql;
}

export const db = drizzle(sql);
