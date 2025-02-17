"use client";

import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useDeletePost } from "@/components/hooks/use-delete-post";
import { useTransition } from "react";

export function DeletePost({ postId }: { postId: string }) {
  const { postDelete } = useDeletePost();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeletePost = () => {
    startTransition(async () => {
      try {
        const { error } = await postDelete(postId);
        if (error) throw new Error(error.message);
        showToast("successPostDelete", toast);
        router.replace("/");
      } catch (error: unknown) {
        showToast("genericError", toast);
        console.error("Delete Post Error:", error);
      }
    });
  };

  return (
    <button
      onClick={handleDeletePost}
      disabled={isPending}
      aria-label="Delete Post"
      aria-busy={isPending}
      className="flex justify-center gap-4 items-center md:px-11 py-2 text-sm font-medium rounded-lg transition-all"
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
