"use client";

import { userLogout } from "@/actions/auth";
import { Icon } from "@iconify/react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";

export default function LogoutAction() {
  const { toast } = useToast();
  const router = useRouter();
  async function handleLogout() {
    try {
      await userLogout();
      showToast("successLogout", toast);
      router.push("/");
    } catch (error: unknown) {
      showToast("genericError", toast);
      console.error("Error:", error);
    }
  }

  return (
    <Button
      className="flex items-center gap-2 px-3 py-1.5 dark:bg-red-700 dark:text-white bg-red-700 text-white text-sm font-medium rounded dark:hover:bg-red-500 dark:hover:text-white hover:bg-red-500 hover:text-white"
      onClick={() => handleLogout()}
    >
      <Icon icon="lucide:log-out" className="w-4 h-4 flex-shrink-0" />
      <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
        Log Out
      </span>
    </Button>
  );
}
