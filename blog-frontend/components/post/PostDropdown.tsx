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
    return null; // Si no hay usuario o no está logueado, no se renderiza nada
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
        {/* <Icon icon="tabler:dots" width="24" height="24" /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Post Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Pin Post (solo para admin) */}
        {userRole === "admin" && (
          <DropdownMenuItem>
            <PinPost
              postId={postId}
              isPinned={isPinned}
              onTogglePin={handleTogglePin}
            />
          </DropdownMenuItem>
        )}

        {/* Edit Post */}
        {userId === post.author_id && (
          <DropdownMenuItem>
            <Link
              href={`/post/${post.id}/edit`}
              className="flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all"
            >
              {/* <Icon icon="mynaui:pencil" className="w-5 h-5" /> */}
              Edit Post
            </Link>
          </DropdownMenuItem>
        )}

        {/* Delete Post */}
        {(userRole === "admin" || userId === post.author_id) && (
          <DropdownMenuItem>
            <DeletePost postId={post.id} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
