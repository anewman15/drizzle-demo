import React from "react";
import Link from "next/link";
import { db } from "@/drizzle/db";
import { categories, posts, tops } from "@/drizzle/schema";
import { DocumentDuplicateIcon, TagIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const Navbar = async () => {    
  const postsCount = await db.$count(posts);
  const categoriesCount = await db.$count(categories);
  const topsCount = await db.$count(tops);

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 flex justify-between align-center">
        <div className="flex-none">
          <Link href="/" className="btn btn-ghost text-xl">DrizzleDemo</Link>
        </div>
        <div className="gap-2 p-2">
          <ul className="menu sm:menu-horizontal rounded-box flex justify-end items-center p-0 gap-2">
            <li>
                <Link href="/posts">
                <DocumentDuplicateIcon height={20} width={20} />
                Posts
                <span className="badge badge-sm">{postsCount <= 99 ? postsCount : "99+"}</span>
                </Link>
            </li>
            <li>
                <Link href="/categories">
                <TagIcon height={20} width={20} />
                Categories
                <span className="badge badge-sm">{categoriesCount <= 99 ? categoriesCount : "99+"}</span>
                </Link>
            </li>
            <li>
                <Link href="/tops">
                <DocumentTextIcon height={20} width={20} />
                Topped Posts
                <span className="badge badge-sm">{topsCount <= 99 ? topsCount : "99+"}</span>
                </Link>
            </li>
            <li>
              <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                      <a className="justify-between">
                        Profile
                      </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
              </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
