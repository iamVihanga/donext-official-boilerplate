import { createRouter } from "@/lib/setup-worker";
import { WorkerOpenAPI } from "@/types";

import { BASE_PATH } from "@/lib/constants";

import index from "../routes/index.route";
import tasks from "./tasks.registry";

export function registerRoutes(app: WorkerOpenAPI) {
  return app.route("/", index).route("/tasks", tasks);
}

// Standalone router instance and type export for RPC
export const router = registerRoutes(createRouter().basePath(BASE_PATH));

export type Router = typeof router;
