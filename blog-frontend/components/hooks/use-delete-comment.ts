import { deleteComment } from "@/services/comment";

export function useDeleteComment() {
  const commentDelete = async (id: string) => {
    try {
      const { data, error } = await deleteComment(id);
      return { data, error };
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  };

  return { commentDelete };
}
