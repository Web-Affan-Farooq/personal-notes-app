import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const note = pgTable("notes",{
	id:uuid("id").primaryKey().defaultRandom().notNull(),
	title:text("title").notNull(),
	description:text("description").notNull(),
	date:timestamp("date").defaultNow().notNull()
})

export type Note = InferSelectModel<typeof note>