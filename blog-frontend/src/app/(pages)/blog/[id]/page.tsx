"use client";
import { useEffect, useState } from "react";
import { fetchPostDetail } from "@/lib/fetch-data";
import { Post } from "@/lib/interfaces";
import BlogPostSkeleton from "@/components/skeletons/PostDetailSkeleton";

export default function BlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const postData: Post = await fetchPostDetail(id);
      setPost(postData);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <BlogPostSkeleton />;
  }

  return (
    <article className="p-6 flex justify-center">
      <div className="p-6 max-w-3xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-4xl text-gray-800 dark:text-white font-bold mb-4">
          {post?.title}
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
          {post?.subtitle}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{post?.body}</p>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>{post?.authorName}</p>
          <p>{post?.date}</p>
        </div>
      </div>
    </article>
  );
}
