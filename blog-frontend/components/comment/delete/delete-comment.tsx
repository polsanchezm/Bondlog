"use client";

import { Trash2 } from "lucide-react";

interface DeleteCommentProps {
  handleDeleteComment: () => void;
  disabled: boolean;
}

export function DeleteComment({
  handleDeleteComment,
  disabled,
}: DeleteCommentProps) {
  return (
    <button
      onClick={handleDeleteComment}
      disabled={disabled}
      aria-label="Delete Post"
      aria-busy={disabled}
      className="flex justify-center gap-4 items-center px-11 py-2 text-sm font-medium rounded-lg transition-all"
    >
      <Trash2 />
      {disabled ? (
        <span className="hidden md:block">Deleting...</span>
      ) : (
        <span className="hidden md:block">Delete</span>
      )}
    </button>
  );
}
