import EditAccountForm from "@/components/account/edit-account-form";
import { fetchUserData } from "@/services/user";

export default async function EditAccountPage() {
  const { data: userData } = await fetchUserData();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <EditAccountForm userData={userData} />
      </div>
    </div>
  );
}
