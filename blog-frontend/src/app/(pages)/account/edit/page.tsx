"use client";

import { useEffect } from "react";
import EditAccountForm from "@/components/account/EditAccountForm";
import { useUserStore } from "@/stores/user";

export default function EditAccount() {
  const { user, loadUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user, loadUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <EditAccountForm userData={user} />;
}
