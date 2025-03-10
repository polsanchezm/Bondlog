import { useState, useCallback } from "react";
import { Message } from "@/lib/interfaces";
import { createMessage } from "@/services/chat";

export function useCreateMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (formData: Message) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await createMessage(formData);
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
