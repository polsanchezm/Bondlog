import AccountDetails from "@/components/account/AccountDetails";
import AccountSkeleton from "@components/skeletons/AccountSkeleton";
import { fetchUserData } from "@/actions/user";

export default async function Account() {
  const userData = await fetchUserData();

  if (!userData) {
    return <AccountSkeleton />;
  }

  return <AccountDetails userData={userData} />;
}
