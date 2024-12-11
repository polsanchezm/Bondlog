import EditAccountForm from "@/components/EditAccountForm";
import { fetchUserData } from "@/lib/fetch-data";
import { Register } from "@/lib/interfaces";

export default async function EditAccount() {
  const userData: Register = await fetchUserData();

  return <EditAccountForm userData={userData} />;
}
