import React from "react";
import { desc } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema/posts";
import { tops } from "@/drizzle/schema/tops";
import Card from "./Card";

const Home = async () => {
	const featuredPosts = await db.query.tops.findMany({
		limit: 3,
		with: {
			post: true,
		},
		orderBy: desc(tops.createdAt),
	});

	const postsList = await db.query.posts.findMany(
		{
			with: {
				category: {
					columns: {
						name: true,
					}
				},
			},
			orderBy: desc(posts.createdAt),
		},
	);
  
  return (
    <div className="mx-auto">
			<h2 className="text-4xl mb-16 text-center">
				Welcome to Drizzle Demo Blog
			</h2>

			<div>
				<div>
					<h2 className="text-3xl mb-4">
						Featured Posts
					</h2>
					<div className="flex justify-start gap-6">
						{
							featuredPosts?.map((top) =>(
								<Card post={top?.post} width={96}/>
							))
						}
					</div>
				</div>
				<div className="mt-12 mb-6">
					<h2 className="text-3xl mb-4">All Posts</h2>
					<div className="flex flex-wrap justify-start gap-6">
						{
							postsList?.map((post) =>(
								<Card post={post} width={80}/>
							))
						}
					</div>
				</div>
			</div>
		</div>
  );
};

export default Home;
