import Link from 'next/link';
import React from 'react'

const Card = ({ post, width }: any) => {
  const postCategory = post?.category?.name;

  return (
    <div className={`card glass w-${width} bg-white`}>
      {
        <div key={post?.id}>
          <Link href={`/posts/${post?.id}`}>
            <figure>
              <img
                src="https://images.pexels.com/photos/21492/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="car!"
              />
            </figure>
          </Link>
          <div className="flex gap-4 justify-between items-center">
            {
              postCategory && (
                <div className="badge badge-neutral my-2">{postCategory}</div>
              )
            }
          </div>
          <div className="card-body">
            <h2 className="card-title">
              <Link href={`/posts/${post?.id}`}>
                {post?.title}
              </Link>
            </h2>
            <p>{post?.subtitle}</p>
            <div className="card-actions justify-end">
              <Link
                href={`/posts/${post?.id}`}
                className="btn btn-ghost font-light text-blue-900"
              >
                Read more...
              </Link>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Card;
