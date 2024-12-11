"use client";

import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/lib/fetch-data";
import { PostActionsProps } from "@/app/lib/interfaces";

export default function PostActions({ postId }: PostActionsProps) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deletePost(postId);
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <Button
        className="w-full sm:w-1/2 flex items-center px-3 py-1.5 mt-4 sm:mt-0 dark:bg-black dark:text-white bg-black text-white text-sm font-medium rounded dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-700 hover:text-white"
        href={`/blog/${postId}/edit`}
      >
        <Icon icon="mynaui:pencil" className="w-4 h-4 flex-shrink-0" />
        <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
          Edit Post
        </span>
      </Button>

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
  );
}
