"use server"

import { db } from "@/drizzle/db";
import { categories, TNewCategory } from "@/drizzle/schema/categories";
import { revalidatePath } from "next/cache";

export const createCategory = async (data: TNewCategory) => {
    await db.insert(categories).values(data);
    revalidatePath("/categories");
};
