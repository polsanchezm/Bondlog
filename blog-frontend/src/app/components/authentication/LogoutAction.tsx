"use client";

import { userLogout } from "@/actions/auth";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { useState, useCallback } from "react";

export default function LogoutAction() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      await userLogout();
      showToast("successLogout", toast);
      router.replace("/");
    } catch (error) {
      showToast("genericError", toast);
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  }, [router, toast]);

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center px-6 py-4 md:w-auto xl:w-auto gap-2 text-white text-sm font-medium rounded transition-all 
                 bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-500 
                 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed 
                 focus:ring focus:ring-red-300 dark:focus:ring-red-600 active:scale-95"
      aria-label="Log Out"
      aria-live="polite"
    >
      <Icon icon="lucide:log-out" className="w-5 h-5 md:w-6 md:h-6" />
      <span className="hidden md:inline ml-2">Log Out</span>
    </button>
  );
}
