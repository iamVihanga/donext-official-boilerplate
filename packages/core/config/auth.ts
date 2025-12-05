import Database from "better-sqlite3";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { createBetterAuth } from "../src/auth/setup";

// For CLI use - uses dummy SQLite database
function getDummyDatabase() {
  const sqlite = new Database("sqlite.db");
  const db = drizzle({ client: sqlite });

  return db;
}

export const auth = createBetterAuth({
  database: drizzleAdapter(getDummyDatabase, {
    provider: "sqlite",
    usePlural: true
  })
});
