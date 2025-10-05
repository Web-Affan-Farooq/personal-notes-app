import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const note = pgTable("notes",{
	id:uuid("id").primaryKey().defaultRandom().notNull(),
	title:text("title").notNull(),
	description:text("description").notNull(),
	date:timestamp("date").defaultNow().notNull()
})

export const topic = pgTable("topics",{
	id:uuid("id").primaryKey().defaultRandom().notNull(),
	title:text("title").notNull(),
	markdown_roadmap:text("markdown_roadmap").notNull(),
	date:timestamp("date").defaultNow().notNull()
});

export type Note = InferSelectModel<typeof note>
export type Topic = InferSelectModel<typeof topic>