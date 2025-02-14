"use client";

import { useEffect, useState } from "react";
import EditPostFormContent from "@/components/post/forms/EditPostFormContent";
import { fetchPostDetail } from "@/services/post";
import { Post } from "@/lib/interfaces";

interface EditPostFormProps {
  id: string;
}

export default function EditPostForm({ id }: EditPostFormProps) {
  const [postDetail, setPostDetail] = useState<Post | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const { data, error } = await fetchPostDetail(id);
  }, [id]);

  if (loading) {
    return (
      <article className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </article>
    );
  }

  if (error || !postDetail) {
    const isServerError = error?.response?.status === 500;
    return (
      <article className="flex justify-center items-center min-h-screen">
        <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
            <h5 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              {isServerError ? "Server Error" : "Post not found"}
            </h5>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              {isServerError
                ? "There was an issue fetching the post. Please try again later."
                : "It looks like this post is not available at the moment. Please check back later or create new content."}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return <EditPostFormContent post={postDetail} />;
}
