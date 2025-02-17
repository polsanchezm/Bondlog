import { useState, useCallback } from "react";
import { Post } from "@/lib/interfaces";
import { updatePost } from "@/services/post";

export function useEditPost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const edit = useCallback(async (formData: Post, id: string) => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await updatePost({
                ...formData
            },
                id
            );
            setLoading(false);
            return { data, error };
        } catch (error: unknown) {
            setError((error as Error).message);
            setLoading(false);
            throw error;
        }
    }, []);

    return { edit, loading, error };
}

