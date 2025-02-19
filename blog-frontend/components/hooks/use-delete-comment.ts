import { deleteComment } from "@/services/comment";

export function useDeleteComment() {
  const commentDelete = async (id: string) => {
    try {
      return await deleteComment(id);
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  };

  return { commentDelete };
}
