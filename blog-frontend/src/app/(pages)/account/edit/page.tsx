import EditAccountForm from "@/app/components/EditAccountForm";
import { fetchUserData } from "@/app/lib/fetch-data";
import { Register } from "@/app/lib/interfaces";

export default async function EditAccount() {
  const userData: Register = await fetchUserData();

  return <EditAccountForm userData={userData} />;
}
