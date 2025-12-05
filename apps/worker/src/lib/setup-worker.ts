import { OpenAPIHono } from "@hono/zod-openapi";
import { defaultHook } from "stoker/openapi";

import type { WorkerBindings, WorkerOpenAPI } from "@/types";
import { BASE_PATH } from "@/lib/constants";
import { cors } from "hono/cors";
import { getAuth } from "@repo/core/auth/server";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { env } from "cloudflare:workers";

// Create a new OpenAPIHono instance with WorkerBindings
export function createRouter(): OpenAPIHono<WorkerBindings> {
  return new OpenAPIHono<WorkerBindings>({
    strict: false,
    defaultHook
  });
}

export function setupWorker(): OpenAPIHono<WorkerBindings> {
  const worker = createRouter().basePath(BASE_PATH) as WorkerOpenAPI;

  // Middlewares
  worker.use(serveEmojiFavicon("🔥"));

  // CORS Middleware
  worker.use(
    "*",
    cors({
      origin: [env.CLIENT_APP_URL],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true
    })
  );

  // [BetterAuth] Authentication Middlewares
  worker.use("*", async (c, next) => {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("session", null);
      c.set("user", null);
      return next();
    }

    c.set("session", session.session);
    c.set("user", session.user);
    return next();
  });

  worker.on(["POST", "GET"], "/auth/*", (c) => {
    const auth = getAuth();
    return auth.handler(c.req.raw);
  });

  // Error Handling Middleware
  worker.onError(onError);

  // Not Found Middleware
  worker.notFound(notFound);

  return worker;
}
