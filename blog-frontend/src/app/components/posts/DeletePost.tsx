import { deletePost } from "@services/post";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Icon } from "@iconify/react";

export function DeletePost({ postId }: { postId: string }) {
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      await deletePost(postId);
      showToast("successPostDelete", toast);
      router.replace("/");
    } catch (error) {
      setErrorMessage(
        "An error occurred while deleting the post. Please try again."
      );
      showToast("genericError", toast);
      console.error("Delete Error:", error);
    } finally {
      setLoading(false);
    }
  }, [postId, router, toast]);

  return (
    <div>
      <button
        className="flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all"
        onClick={handleDelete}
        disabled={loading}
        aria-label="Delete Post"
      >
        {loading ? (
          <Icon icon="line-md:loading-loop" className="w-6 h-6 animate-spin" />
        ) : (
          <>
            <Icon icon="mynaui:trash" className="w-6 h-6" />
            <span>Delete</span>
          </>
        )}
      </button>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
