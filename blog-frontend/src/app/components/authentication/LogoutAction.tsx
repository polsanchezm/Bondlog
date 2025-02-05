"use client";

import { userLogout } from "@/actions/auth";
import { Icon } from "@iconify/react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { useState } from "react";

export default function LogoutAction() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await userLogout();
      showToast("successLogout", toast);
      router.push("/");
    } catch (error) {
      showToast("genericError", toast);
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      className="flex w-16 md:w-auto xl:w-auto items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded transition-all bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-500 disabled:bg-gray-400 dark:disabled:bg-gray-600"
      aria-label="Log Out"
    >
      {loading ? (
        <Icon
          icon="eos-icons:loading"
          className="w-3 h-3 md:w-5 md:h-5 xl:w-5 xl:h-5 animate-spin"
        />
      ) : (
        <Icon
          icon="lucide:log-out"
          className="w-4 h-4 md:w-5 md:h-5 xl:w-5 xl:h-5"
        />
      )}
    </Button>
  );
}
