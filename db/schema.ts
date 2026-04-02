import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const folders = sqliteTable("folders", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().default(""),
  color: text().notNull().default("blue"),
  parentId: int().references((): any => folders.id, { onDelete: "cascade" }),
  deletedAt: int({ mode: "timestamp" }),
  createdAt: int({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: int({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const notes = sqliteTable("notes", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text({ mode: "json" }),
  folderId: int().references(() => folders.id, { onDelete: "set null" }),
  deletedAt: int({ mode: "timestamp" }),
  createdAt: int({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: int({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;