import { useState, useCallback } from "react";
import { Register } from "@/lib/interfaces";
import { updateUserData } from "@/services/user";

export function useUpdateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUser = useCallback(async (formData: Register) => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await updateUserData(formData);
            setLoading(false);
            return { data, error };
        } catch (error: unknown) {
            setError((error as Error).message);
            setLoading(false);
            throw error;
        }
    }, []);

    return { updateUser, loading, error };
}
