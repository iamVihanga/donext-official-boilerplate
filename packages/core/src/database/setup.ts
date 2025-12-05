import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "./schemas";

let db: DrizzleD1Database<typeof schema> & {
  $client: D1Database;
};

export function initDatabase(d1Db: D1Database) {
  if (db) {
    return db;
  }

  db = drizzle(d1Db, { schema });
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}
