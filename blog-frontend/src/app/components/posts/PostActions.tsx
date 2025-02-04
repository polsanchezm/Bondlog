"use client";

import { useState } from "react";
import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { deletePost } from "@actions/posts";
import { PostActionsProps } from "@lib/interfaces";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";

export default function PostActions({
  postId,
  userId,
  post,
}: PostActionsProps) {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const router = useRouter();
  const handleDelete = async () => {
    setError(null);
    try {
      await deletePost(postId);
      showToast("successPostDetele", toast);
      router.push("/");
    } catch (error) {
      setError(
        "An error occurred while creating the post. Please try again later."
      );
      if (error instanceof Error) {
        showToast("genericError", toast);
        console.error("Error:", error);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="flex items-center justify-between p-3 mb-4 text-sm text-red-200 bg-red-600 rounded-lg dark:bg-red-800 dark:text-red-200">
          <div className="flex items-center">
            <span>{error}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {userId === post?.author_id && (
          <Button
            className="w-full sm:w-1/2 flex items-center px-3 py-1.5 mt-4 sm:mt-0 dark:bg-black dark:text-white bg-black text-white text-sm font-medium rounded dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-700 hover:text-white"
            href={`/blog/${postId}/edit`}
          >
            <Icon icon="mynaui:pencil" className="w-4 h-4 flex-shrink-0" />
            <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
              Edit Post
            </span>
          </Button>
        )}
        <Button
          className="w-full sm:w-1/2 flex items-center px-3 py-1.5 mt-4 sm:mt-0 dark:bg-red-700 dark:text-white bg-red-700 text-white text-sm font-medium rounded dark:hover:bg-red-500 dark:hover:text-white hover:bg-red-500 hover:text-white"
          onClick={handleDelete}
        >
          <Icon icon="mynaui:trash" className="w-4 h-4 flex-shrink-0" />
          <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
            Delete Post
          </span>
        </Button>
      </div>
    </div>
  );
}
