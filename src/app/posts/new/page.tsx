import React from "react";
import { db } from "@/drizzle/db";
import CreatePostForm from "./createPostForm";

const CreatePost = async () => {
  const categories = await db.query.categories.findMany();

  return (
    <div className="mx-auto page">
      <h2 className="text-3xl mb-4 text-center">
        Create a New Post
      </h2>
      <div className="mx-auto md: w-1/2">
        <CreatePostForm categories={categories} />
      </div>
    </div>
  );
};

export default CreatePost;
