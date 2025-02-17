import { useState, useCallback } from "react";
import { userLogin } from "@/services/auth";
import { Login } from "@/lib/interfaces";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (formData: Login) => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await userLogin(formData);
            setLoading(false);
            return { data, error };
        } catch (error: unknown) {
            setError((error as Error).message);
            setLoading(false);
            throw error;
        }
    }, []);

    return { login, loading, error };
}
