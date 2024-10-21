"use server"

import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { posts, tops } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

export const deletePost = async (id: number) => {
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath("/posts");
};

export const topThisPost = async (id: number) => {
    await db.insert(tops).values({ postId: id});
    revalidatePath("/tops");
};