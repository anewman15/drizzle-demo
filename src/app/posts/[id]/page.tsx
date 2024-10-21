import React, { ReactNode } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";

const PostItem = async ({ params }: { params: { id: any } }) => {
  const postDetails = await db.select().from(posts).where(eq(posts.id, params?.id)).limit(1);
  const post = postDetails[0];
  
  return (
    <div className="page">
      <div>
        <h2 className="text-3xl font-bold">
          {post?.title}
        </h2>
        <p className="my-4 text-m">
          {post?.subtitle}
        </p>
      </div>
      <div className="flex justify-start gap-4 items-center">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm avatar">
        <div className="w-10 rounded-full">
          <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <span className="my-4 text-sm font-semibold">posted on</span>
        <span className="my-4 text-xs font-light">{new String(post?.createdAt) as ReactNode}</span>
      </div>
      <p className="my-10">
        {post?.content}
      </p>
    </div>

  );
};

export default PostItem;