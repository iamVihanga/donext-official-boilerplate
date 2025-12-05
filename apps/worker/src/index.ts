import { WorkerEntrypoint } from "cloudflare:workers";

import { initDatabase } from "@repo/core/database/setup";
import { setAuth } from "@repo/core/auth/server";
import { registerRoutes } from "./registry";
import { setupWorker } from "./lib/setup-worker";
import configureOpenAPI from "./lib/open-api-config";

const app = registerRoutes(setupWorker());

configureOpenAPI(app);

export default class WorkerService extends WorkerEntrypoint<CloudflareBindings> {
  private initialized = false;

  fetch(request: Request) {
    if (!this.initialized) {
      // Initialize DB connection for each request
      const db = initDatabase(this.env.DB);

      // Initialize Auth for each request
      setAuth({
        adapter: {
          drizzleDb: db,
          provider: "sqlite"
        },
        secret: this.env.BETTER_AUTH_SECRET
      });

      this.initialized = true;
    }

    return app.fetch(request, this.env, this.ctx);
  }
}
