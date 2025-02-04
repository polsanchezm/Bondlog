import EditAccountForm from "@/components/account/EditAccountForm";
import { fetchUserData } from "@/actions/user";
import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function EditAccount() {
  const authCheck = await isAuthenticated();
  const userData = await fetchUserData();
  if (!authCheck) {
    redirect("/login");
  } else if (userData.data.role == "admin") {
    redirect("/account");
  } else {
    const { data, error } = await fetchUserData();
    if (error) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
            <h5 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              Error
            </h5>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              {
                "There was an issue fetching your account details. Please try again later."
              }
            </p>
          </div>
        </div>
      );
    }
    return <EditAccountForm userData={data} />;
  }
}
