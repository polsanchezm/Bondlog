"use client";

import { PaginationProps, Post, User } from "@lib/interfaces";
import { checkUpdatedAt } from "@utils/utils";
import Link from "next/link";
import { Pagination } from "../ui/pagination";
import { PostDropdown } from "@components/posts/PostDropdown";
import { useCallback } from "react";

export default function Posts({
  posts,
  pagination,
  user,
  isLoggedIn,
}: {
  posts: Post[];
  pagination: PaginationProps;
  user: User;
  isLoggedIn: boolean;
}) {
  const renderPostCard = useCallback(
    (post: Post) => (
      <article
        key={post.id}
        className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <header className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-2">
            {post.title}
          </h2>
          <PostDropdown
            post={post}
            initialIsPinned={post.is_pinned}
            user={user}
            isLoggedIn={isLoggedIn}
          />
        </header>

        <Link href={`/blog/${post.id}`} className="flex flex-col flex-grow">
          <p className="text-gray-700 dark:text-gray-400 text-lg mt-2 line-clamp-2">
            {post.subtitle}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
            Written by:{" "}
            <span className="font-semibold">{post.author_username}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            <span className="font-bold">Last update:</span>{" "}
            {checkUpdatedAt(post)}
          </p>
        </Link>
      </article>
    ),
    [posts]
  );

  return (
    <section className="flex flex-col items-center my-10 px-6 w-full min-h-screen">
      <div className="max-w-7xl w-full">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts.map(renderPostCard)}
        </div>

        <footer className="mt-10">
          <Pagination pagination={pagination} />
        </footer>
      </div>
    </section>
  );
}
