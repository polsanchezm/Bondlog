"use client";

import { PaginationProps, Post } from "@lib/interfaces";
import { checkUpdatedAt } from "@utils/utils";
import Link from "next/link";
import { Pagination } from "../ui/pagination";

export default function Posts({
  posts,
  pagination,
}: {
  posts: Post[];
  pagination: PaginationProps;
}) {
  return (
    <article className="flex flex-col items-center my-10 px-10 w-full min-h-screen">
      <div className="max-w-7xl w-full flex flex-col">
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {posts.map((item) => (
            <div key={item.id} className="flex flex-col">
              <Link
                href={`/blog/${item.id}`}
                className="block p-10 bg-white rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-xl"
              >
                <h5
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                  className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {item.title}
                </h5>
                <p
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                  className="mb-6 font-normal text-gray-700 dark:text-gray-400 text-xl"
                >
                  {item.subtitle}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-4 text-lg">
                  {item.author_username}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
                  <span className="font-bold">Last update:</span>{" "}
                  {checkUpdatedAt(item)}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <Pagination pagination={pagination} />
      </div>
    </article>
  );
}
