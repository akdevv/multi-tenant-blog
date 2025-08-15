import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const blogsTable = pgTable("blogs", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 80 }).notNull(),
  body: text().notNull(),
  orgId: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type CreateBlogType = typeof blogsTable.$inferInsert;
export type SelectBlogType = typeof blogsTable.$inferSelect;