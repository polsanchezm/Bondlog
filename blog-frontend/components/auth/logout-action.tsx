"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/lib/helpers";
import { userLogout } from "@/services/auth";
import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function LogoutAction() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      try {
        const { error } = await userLogout();
        if (error) {
          showToast("genericError", toast);
          console.error("Logout error:", error);
          return;
        }
        showToast("successLogout", toast);
        router.replace("/");
      } catch (err: unknown) {
        showToast("genericError", toast);
        console.error("Logout error:", err);
      }
    });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      aria-busy={isPending}
      className="flex items-center px-6 py-4 gap-2 text-white text-sm font-medium rounded-lg transition-all bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed active:scale-95"
      aria-label="Log Out"
    >
      <LogOut />
      <span className="hidden md:inline ml-2">
        {isPending ? "Logging Out..." : "Log Out"}
      </span>
    </Button>
  );
}
