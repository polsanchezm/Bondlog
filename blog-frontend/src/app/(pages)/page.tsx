"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/interfaces";
import { fetchPosts } from "@/lib/fetch-data";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";
import { checkUpdatedAt } from "@/utils/utils";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return <PostsSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <article className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h5 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              No posts found
            </h5>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              It looks like there are no posts available at the moment. Please
              check back later or create new content.
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex justify-center my-10 px-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl w-full">
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
                {item.authorName}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
                <span className="font-bold">Last update:</span>{" "}
                {checkUpdatedAt(item)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
}
