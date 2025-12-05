import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { createBetterAuth } from "@/auth/setup";
import { getDb } from "@/database/setup";
import * as schema from "@/database/schemas";

let betterAuth: ReturnType<typeof createBetterAuth>;

export function setAuth(
  config: Omit<Parameters<typeof createBetterAuth>[0], "database"> & {
    adapter: {
      drizzleDb: ReturnType<typeof getDb>;
      provider: Parameters<typeof drizzleAdapter>[1]["provider"];
    };
  }
) {
  betterAuth = createBetterAuth({
    database: drizzleAdapter(config.adapter.drizzleDb, {
      provider: config.adapter.provider,
      schema,
      usePlural: true
    }),
    plugins: [openAPI()],
    ...config
  });

  return betterAuth;
}

export function getAuth() {
  if (!betterAuth) {
    throw new Error("Auth not initialized");
  }
  return betterAuth;
}
