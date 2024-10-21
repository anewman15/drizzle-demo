import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categories } from "@/drizzle/schema";
import * as zod from "zod";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey().unique(),
    title: varchar("title", { length: 255, }).notNull(),
    subtitle: varchar("subtitle", { length: 500, }),
    content: text("content").notNull(),
    categoryId: integer("category_id").references(() => categories.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at", { mode: "string"}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});


export const postsRelations = relations(posts, ({ one }) => ({
    category: one(categories, {
        fields: [posts.categoryId],
        references: [categories.id],
    }),
}));

export const PostSchema = createSelectSchema(posts);
export const NewPostSchema = createInsertSchema(posts).pick({
    title: true,
    subtitle: true,
    content: true,
    categoryId: true,
});

export type TPost = zod.infer<typeof PostSchema>;
export type TNewPost = zod.infer<typeof NewPostSchema>;
