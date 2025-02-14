import { useState, useCallback } from "react";
import { userSignup } from "@/services/auth";
import { Register } from "@/lib/interfaces";

export function useSignup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = useCallback(async (formData: Register) => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await userSignup(formData);
            setLoading(false);
            return { data, error };
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            throw error;
        }
    }, []);

    return { signup, loading, error };
}
