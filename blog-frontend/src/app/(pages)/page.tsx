"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/actions/posts";
import Posts from "@/components/posts/Posts";
import { APIError, PaginationProps } from "@/lib/interfaces";
import { Skeleton } from "@/components/ui/skeleton";

function HomeContent() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState<PaginationProps | null>(null);
  const [error, setError] = useState<APIError | null>(null);

  useEffect(() => {
    async function loadPosts() {
      const { data, pagination, error } = await fetchPosts(currentPage);
      setPosts(data || []);
      setPagination(pagination);
      setError(error);
    }
    loadPosts();
  }, [currentPage]);

  if (posts.length === 0) {
    return (
      <article className="flex justify-center my-10 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 h-64">
                <Skeleton className="mb-2 h-10" />{" "}
                <Skeleton className="mb-2 w-3/4 h-4 mt-8" />{" "}
                <Skeleton className="mb-2 w-1/2 h-4 mt-8" />{" "}
                <Skeleton className="w-1/3 h-4 mt-8" />{" "}
              </div>
            </div>
          ))}
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
          <h5 className="mb-4 text-3xl font-semibold text-center text-gray-900 dark:text-white">
            {error?.response?.status === 500
              ? "Server Error"
              : "No posts found"}
          </h5>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300">
            {error?.response?.status === 500
              ? "There was an issue fetching the posts. Please try again later."
              : "No posts available at the moment."}
          </p>
        </div>
      </article>
    );
  }

  return (
    <Posts
      posts={posts}
      pagination={
        pagination || { current_page: 1, next_page_url: "", prev_page_url: "" }
      }
    />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
