import AccountDetails from "@/app/components/AccountDetails";
import AccountSkeleton from "@/app/components/skeletons/AccountSkeleton";
import { fetchUserData } from "@/app/lib/fetch-data";

export default async function Account() {
  const userData = await fetchUserData();

  if (!userData) {
    return <AccountSkeleton />;
  }

  return <AccountDetails userData={userData} />;
}
