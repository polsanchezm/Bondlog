import { deletePost } from "@/services/post";

export function useDeletePost() {
    const postDelete = async (id: string) => {
        try {
            return await deletePost(id);
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    };

    return { postDelete };
}
