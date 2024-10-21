"use server"

import { eq } from "drizzle-orm"
import { categories } from "@/drizzle/schema"
import { db } from "@/drizzle/db";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: number) => {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath("/categories");
};