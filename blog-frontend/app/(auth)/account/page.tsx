import AccountDetails from "@/components/account/account-details";
import { fetchUserData } from "@/services/user";

export default async function Account() {
  const { data: userData } = await fetchUserData();

  return <AccountDetails userData={userData} />;
}
