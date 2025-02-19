"use client";

import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useDeleteComment } from "@/components/hooks/use-delete-comment";

export function DeleteComment({ commentId }: { commentId: string }) {
  const { commentDelete } = useDeleteComment();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeleteComment = () => {
    startTransition(async () => {
      try {
        const { error } = await commentDelete(commentId);
        if (error) throw new Error(error.message);
        showToast("successCommentDelete", toast);
        router.refresh();
      } catch (error: unknown) {
        showToast("genericError", toast);
        console.error("Delete Post Error:", error);
      }
    });
  };

  return (
    <button
      onClick={handleDeleteComment}
      disabled={isPending}
      aria-label="Delete Post"
      aria-busy={isPending}
      className="flex justify-center gap-4 items-center px-11 py-2 text-sm font-medium rounded-lg transition-all"
    >
      <Trash2 />
      {isPending ? (
        <span className="hidden md:block">Deleting...</span>
      ) : (
        <span className="hidden md:block">Delete</span>
      )}
    </button>
  );
}
