import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

import { id, timestamps } from "./helpers";

export const tasks = sqliteTable("tasks", {
  id,
  name: text("name").notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false).notNull(),
  ...timestamps
});
