import EditAccountForm from "@/components/account/EditAccountForm";
import { fetchUserData } from "@/actions/user";
import { Register } from "@lib/interfaces";

export default async function EditAccount() {
  const userData: Register = await fetchUserData();

  return <EditAccountForm userData={userData} />;
}
