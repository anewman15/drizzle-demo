import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as zod from "zod";
import { posts } from "@/drizzle/schema";
import { PostSchema } from "@/drizzle/schema/posts";

export const categories = pgTable("categories", {
	id: serial("id").primaryKey().notNull().unique(),
	name: varchar("name", { length: 90, }).notNull().unique(),
	description: text("description"),
	
	createdAt: timestamp("created_at", { mode: "string"}).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    posts: many(posts),
}));

export const CategorySchema = createSelectSchema(categories);

export const NewCategorySchema = createInsertSchema(categories).pick({
	name: true,
	description: true,
});

export const CategorySchemaWithPosts = zod.object({
	id: CategorySchema.shape.id,
	name: CategorySchema.shape.name,
	description: CategorySchema.shape.description,
	posts: zod.array(PostSchema),
});

export type TCategory = zod.infer<typeof CategorySchema>;
export type TCategoryWithPosts = zod.infer<typeof CategorySchemaWithPosts>;
export type TNewCategory = zod.infer<typeof NewCategorySchema>;
