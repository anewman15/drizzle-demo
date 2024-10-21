import React from "react";
import Link from "next/link";
import { db } from "@/drizzle/db";
import PostsTable from "./PostsTable";

const Posts = async () => {
	const postsList = await db.query.posts.findMany({
		with: {
			category: true,
		}
	});
  
  return (
    <div className="page">
			<div className="mt-12 mb-6 flex justify-between items-center">
				<h2 className="text-3xl mb-4">All Posts</h2>
				<Link href="/posts/new" className="btn btn-primary btn-sm">Create A Post</Link>
			</div>
			<PostsTable postsList={postsList} />
		</div>
  );
};

export default Posts;
