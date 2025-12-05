import { betterAuth, type BetterAuthOptions } from "better-auth";
import { admin as adminPlugin } from "better-auth/plugins";

export const createBetterAuth = (config: {
  database: BetterAuthOptions["database"];
  secret?: BetterAuthOptions["secret"];
  socialProviders?: BetterAuthOptions["socialProviders"];
  plugins?: BetterAuthOptions["plugins"];
}): ReturnType<typeof betterAuth> => {
  return betterAuth({
    database: config.database,
    secret: config.secret,
    emailAndPassword: {
      enabled: true
    },
    socialProviders: config.socialProviders,

    // Always include plugins that required database schema changes in here,
    // Instead of placing server.ts file
    // Ex: Admin, Organization etc.
    plugins: [adminPlugin(), ...(config.plugins ?? [])]
  });
};
