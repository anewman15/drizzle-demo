"use client"

import React from "react";
import { TPost } from "@/drizzle/schema/posts";
import Link from "next/link";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deletePost, topThisPost } from "./actions";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

type TPostsTableProps = {
    postsList: TPost[];
};

const PostsTable = ({ postsList }: TPostsTableProps) => {
  const router = useRouter();
  
  const featurePost = async (id: number) => {
    await topThisPost(id);
    router.push("/tops");
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Content</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            postsList.map(post => (
              <tr >
                <td>{post?.id}</td>
                <td>{post?.title}</td>
                <td>{post?.subtitle}</td>
                <td>{post?.content}</td>
                <td className="flex gap-2 justify-center items-center">
                  <Link
                    href={`/posts/${post?.id}`}
                    className="btn btn-xs">
                    <EyeIcon height={16} width={16} />
                  </Link>
                  <button
                    onClick={() => featurePost(post?.id)}
                    className="btn btn-xs">
                    <DocumentArrowUpIcon
                      height={16}
                      width={16}
                    />
                  </button>
                  <button
                    onClick={() => deletePost(post?.id)}
                    className="btn btn-xs">
                    <TrashIcon
                      height={16}
                      width={16}
                    />
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

export default PostsTable;
