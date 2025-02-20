import { useState, useCallback } from "react";
import { Comment } from "@/lib/interfaces";
import { createComment } from "@/services/comment";

export function useCreateComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (formData: Comment, postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await createComment(formData, postId);
      setLoading(false);
      return { data, error };
    } catch (error: unknown) {
      setError((error as Error).message);
      setLoading(false);
      throw error;
    }
  }, []);

  return { create, loading, error };
}
