import { BASE_PATH } from "@/lib/constants";
import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

import { getAuth } from "@repo/core/auth/server";

const auth = getAuth();

export interface WorkerBindings {
  Bindings: CloudflareBindings;
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

export type WorkerOpenAPI = OpenAPIHono<WorkerBindings, {}, typeof BASE_PATH>;

export type WorkerRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  WorkerBindings
>;
