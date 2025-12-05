import { integer, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
};

export const id = text("id")
  .primaryKey()
  .$defaultFn(() => createId());
