"use server"

import { db } from "@/drizzle/db"
import { posts, TNewPost } from "@/drizzle/schema/posts"
import { revalidatePath } from "next/cache";

export const createPost = async (data: TNewPost) => {
    await db.insert(posts).values(data);
    revalidatePath("/posts");
};
