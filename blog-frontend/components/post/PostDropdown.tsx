"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PinPost } from "@/components/post/PinPost";
import { Post, User } from "@/lib/interfaces";
import { togglePin } from "@/services/post";
import { useState } from "react";
import Link from "next/link";
import { DeletePost } from "./DeletePost";
import { EllipsisVertical, SquarePen } from "lucide-react";

export function PostDropdown({
  post,
  initialIsPinned,
  user,
  isLoggedIn,
}: {
  post: Post;
  initialIsPinned: boolean;
  user: User | null;
  isLoggedIn: boolean;
}) {
  const [isPinned, setIsPinned] = useState(initialIsPinned);
  const postId = post.id;

  if (!user || !isLoggedIn) {
    return null;
  }

  const userId = user.id;
  const userRole = user.role;

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

        {userRole === "admin" && (
          <DropdownMenuItem>
            <PinPost
              postId={postId}
              isPinned={isPinned}
              onTogglePin={handleTogglePin}
            />
          </DropdownMenuItem>
        )}

        {userId === post.author_id && (
          <DropdownMenuItem>
            <Link
              href={`/post/${post.id}/edit`}
              className="flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all"
            >
              <SquarePen />
              <span className="hidden md:block">Edit Post</span>
            </Link>
          </DropdownMenuItem>
        )}

        {/* {(userRole === "admin" || userId === post.author_id) && (
          <DropdownMenuItem>
            <DeletePost postId={post.id} />
          </DropdownMenuItem>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
