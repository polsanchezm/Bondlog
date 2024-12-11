import AccountDetails from "@components/AccountDetails";
import AccountSkeleton from "@components/skeletons/AccountSkeleton";
import { fetchUserData } from "@lib/fetch-data";

export default async function Account() {
  const userData = await fetchUserData();

  if (!userData) {
    return <AccountSkeleton />;
  }

  return <AccountDetails userData={userData} />;
}
