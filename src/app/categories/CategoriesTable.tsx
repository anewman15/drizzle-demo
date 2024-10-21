"use client"

import React from "react";
import Link from "next/link";
import { TCategoryWithPosts } from "@/drizzle/schema/categories";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteCategory } from "./actions";

type CategoriesTableProps = {
	categoriesList: TCategoryWithPosts[];
};

const CategoriesTable = ({ categoriesList }: CategoriesTableProps) => {
  return (
    <div className="overflow-x-auto">
			<table className="table table-zebra">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Posts</th>
						<th className="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						categoriesList.map((category: TCategoryWithPosts) => (
							<tr >
								<td>{category?.id}</td>
								<td>{category?.name}</td>
								<td>{category?.posts?.length}</td>
								<td className="flex gap-2 justify-center items-center">
									<Link
										href={`/categories/${category?.id}`}
										className="btn btn-xs">
										<EyeIcon height={16} width={16} />
									</Link>
									<button
										onClick={() => deleteCategory(category?.id)}
										className="btn btn-xs">
										<TrashIcon height={16} width={16} />
									</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
  );
};

export default CategoriesTable;
