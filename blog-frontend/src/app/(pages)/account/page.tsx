import AccountDetails from "@/components/account/AccountDetails";
import AccountSkeleton from "@components/skeletons/AccountSkeleton";
import { fetchUserData } from "@/actions/user";
import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Account() {
  const authCheck = await isAuthenticated();
  if (!authCheck) {
    redirect("/login");
  } else {
    const userData = await fetchUserData();

    if (!userData) {
      return <AccountSkeleton />;
    }

    return <AccountDetails userData={userData} />;
  }
}
