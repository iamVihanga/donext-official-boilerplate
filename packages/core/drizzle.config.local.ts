import type { Config } from "drizzle-kit";
import path from "path";
import fs from "fs";

// Function to find the local D1 database file
function findLocalD1Database(): string {
  const d1Dir = path.resolve(
    "../../apps/worker/.wrangler/state/v3/d1/miniflare-D1DatabaseObject"
  );

  if (!fs.existsSync(d1Dir)) {
    throw new Error(
      `D1 database directory not found: ${d1Dir}. Make sure you have run 'pnpm dev:local' in the worker app first.`
    );
  }

  const files = fs
    .readdirSync(d1Dir)
    .filter((file) => file.endsWith(".sqlite"));

  if (files.length === 0) {
    throw new Error(
      `No SQLite database files found in ${d1Dir}. Make sure you have run 'pnpm dev:local' in the worker app first.`
    );
  }

  // Use the first .sqlite file found (there should only be one)
  const dbFile = path.join(d1Dir, files[0]);
  return `file:${dbFile}`;
}

const config: Config = {
  out: "./src/drizzle",
  schema: "./src/database/schemas/index.ts",
  dialect: "turso",
  dbCredentials: {
    url: findLocalD1Database()
  },
  tablesFilter: ["!_cf_KV", "!auth_*"]
};

export default config satisfies Config;
