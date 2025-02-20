"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PinComment } from "@/components/comment/pin/pin-comment";
import { Comment, User } from "@/lib/interfaces";
import { togglePin } from "@/services/comment";
import { useState } from "react";
import { DeleteComment } from "@/components/comment/delete/delete-comment";
import { EllipsisVertical, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommentDropdownProps {
  comment: Comment;
  isLoggedIn: boolean;
  user?: User;
  initialIsPinned: boolean;
  isPending: boolean;
  onEdit: (commentId: string) => void;
  handleDeleteComment: (commentId: string) => void;
}

export function CommentDropdown({
  comment,
  isLoggedIn,
  user,
  initialIsPinned,
  isPending,
  onEdit,
  handleDeleteComment,
}: CommentDropdownProps) {
  const [isPinned, setIsPinned] = useState(initialIsPinned);
  const router = useRouter();

  if (!user || !isLoggedIn) return null;

  const isAdmin = user.role === "admin";
  const isAuthor = user.id === comment.author_id;

  const handleTogglePin = async (commentId: string) => {
    try {
      const response = await togglePin(commentId);
      setIsPinned(response?.data.is_pinned);
      router.refresh();
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
        <DropdownMenuLabel>Comment Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isAdmin && (
          <DropdownMenuItem className="flex justify-center items-center text-base md:text-sm md:px-4 py-2 rounded-lg transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <PinComment
              commentId={comment.id}
              isPinned={isPinned}
              onTogglePin={handleTogglePin}
            />
          </DropdownMenuItem>
        )}

        {isAuthor && (
          <DropdownMenuItem className="flex justify-center items-center text-base md:text-sm py-2 rounded-lg transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <button
              onClick={() => onEdit(comment.id)}
              className="flex justify-center gap-4 items-center px-11 py-2 text-sm font-medium rounded-lg transition-all"
            >
              <SquarePen />
              <span className="hidden md:block">Edit</span>
            </button>
          </DropdownMenuItem>
        )}

        {(isAdmin || isAuthor) && (
          <DropdownMenuItem className="flex justify-center items-center text-base md:text-sm md:px-4 py-2 rounded-lg transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <DeleteComment
              handleDeleteComment={() => handleDeleteComment(comment.id)}
              disabled={isPending}
            />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
