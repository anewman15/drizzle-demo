import React from "react";
import { db } from "@/drizzle/db";
import Link from "next/link";
import CategoriesTable from "./CategoriesTable";

const Categories = async () => {
	const categoriesList = await db.query.categories.findMany({
		with: {
			posts: true,
		}
	});

	return (
		<div className="page">
			<div className="mt-12 mb-6 flex justify-between items-center">
				<h2 className="text-3xl mb-4">All Categories</h2>
				<Link href="/categories/new" className="btn btn-primary btn-sm">Create Category</Link>
				</div>
				<CategoriesTable categoriesList={categoriesList} />
			</div>
	  );
};

export default Categories;