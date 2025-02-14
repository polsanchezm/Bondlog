import { useState, useCallback } from "react";
import { Post } from "@/lib/interfaces";
import { createPost } from "@/services/post";

export function useCreatePost() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(async (formData: Post) => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await createPost({
                ...formData,
            });
            setLoading(false);
            return { data, error };
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            throw error;
        }
    }, []);

    return { create, loading, error };
}

