"use client";

import { useEffect } from "react";
import AccountDetails from "@/components/account/AccountDetails";
import { useUserStore } from "@/stores/user";

export default function Account() {
  const { user, error, loadUser } = useUserStore();
  
  useEffect(() => {
    if (!user && !error) {
      loadUser();
    }
  }, [user, error, loadUser]);

  return <AccountDetails userData={user!} userError={error!} />;
}
