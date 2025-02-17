"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PinPost } from "@/components/post/pin/pin-post";
import { Post, User } from "@/lib/interfaces";
import { togglePin } from "@/services/post";
import Link from "next/link";
import { DeletePost } from "@/components/post/delete/delete-post";
import { EllipsisVertical, SquarePen } from "lucide-react";
import { useState } from "react";

export function PostDropdown({
  post,
  isLoggedIn,
  user,
  initialIsPinned,
}: {
  post: Post;
  isLoggedIn: boolean;
  user: User | null;
  initialIsPinned: boolean;
}) {
  const [isPinned, setIsPinned] = useState(initialIsPinned);

  if (!user || !isLoggedIn) return null;

  const isAdmin = user.role === "admin";
  const isAuthor = user.id === post.author_id;

  const handleTogglePin = async (postId: string) => {
    try {
      const response = await togglePin(postId);
      setIsPinned(response?.data.is_pinned);
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Post Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isAdmin && (
          <DropdownMenuItem className="flex justify-center items-center text-base md:text-sm md:px-4 py-2 rounded-lg transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <PinPost
              postId={post.id}
              isPinned={isPinned}
              onTogglePin={handleTogglePin}
            />
          </DropdownMenuItem>
        )}

        {isAuthor && (
          <DropdownMenuItem className="flex justify-center items-center text-base md:text-sm py-2 rounded-lg transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <Link
              href={`/post/${post.id}/edit`}
              className="flex justify-center gap-4 items-center md:px-11 py-2 text-sm font-medium rounded-lg transition-all"
            >
              <SquarePen />
              <span className="hidden md:block">Edit Post</span>
            </Link>
          </DropdownMenuItem>
        )}

        {(isAdmin || isAuthor) && (
          <DropdownMenuItem className="flex justify-center items-center text-base md:text-sm md:px-4 py-2 rounded-lg transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <DeletePost postId={post.id} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
