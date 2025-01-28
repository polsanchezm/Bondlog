import EditAccountForm from "@/components/account/EditAccountForm";
import { fetchUserData } from "@/actions/user";
import { Register } from "@lib/interfaces";
import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function EditAccount() {
  const authCheck = await isAuthenticated();
  if (!authCheck) {
    redirect("/login");
  } else {
    const userData: Register = await fetchUserData();

    return <EditAccountForm userData={userData} />;
  }
}
