import { Scalar } from "@scalar/hono-api-reference";

import { WorkerOpenAPI } from "@/types";

import packageJson from "../../package.json";
import { BASE_PATH } from "./constants";

export default function configureOpenAPI(app: WorkerOpenAPI): void {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "Nextplate (by CodeVille) - Cloudflare Template"
    }
  });

  app.get(
    "/reference",
    Scalar(() => {
      return {
        url: `${BASE_PATH}/doc`,
        theme: "default"
      };
    })
  );
}
