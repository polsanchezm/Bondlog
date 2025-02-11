"use client";

import { useEffect } from "react";
import EditPostFormContent from "@/components/posts/EditPostFormContent";
import { usePostStore } from "@/stores/post";

interface EditPostFormProps {
  id: string;
}

export default function EditPostForm({ id }: EditPostFormProps) {
  const { postDetail, loadPostDetail, error: postError } = usePostStore();

  useEffect(() => {
    if (id) {
      loadPostDetail(id);
    }
  }, [id, loadPostDetail]);

  if (postError || !postDetail) {
    const isServerError = postError?.response?.status === 500;
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
