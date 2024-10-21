import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { relations } from "drizzle-orm";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import * as zod from "zod";

export const tops = pgTable("tops", {
    id: serial("id").primaryKey().unique().notNull(),
    postId: integer("post_id").references(() => posts.id, { onDelete: "cascade" }).unique(),
    
    startDate: timestamp("start_date").notNull().defaultNow(),
    expiryDate: timestamp("expiry_date"),
    
    createdAt: timestamp("created_at", { mode: "string"}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const topsRelations = relations(tops, ({ one }) => ({
    post: one(posts, {
        fields: [tops.postId],
        references: [posts.id,],
    }),
}));

export const TopSchema = createSelectSchema(tops);
export const NewTopSchema = createInsertSchema(tops);

export type TTop = zod.infer<typeof TopSchema>;
export type TNewTop = zod.infer<typeof NewTopSchema>;
