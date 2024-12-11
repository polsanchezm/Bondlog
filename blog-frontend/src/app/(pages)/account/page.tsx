"use client";
import { useEffect, useState } from "react";
import { User } from "@/lib/interfaces";
import { fetchUserData } from "@/lib/fetch-data";
import AccountSkeleton from "@/components/skeletons/AccountSkeleton";
import { formatDate, checkUpdatedAt } from "@/utils/utils";
import { Button } from "flowbite-react";
export default function Account() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
      setLoading(false);
    };

    loadUserData();
  }, []);

  if (loading) {
    return <AccountSkeleton />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          User Profile
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-2xl">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {userData?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {userData?.email}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                Joined on {formatDate(userData?.created_at || "")}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                Last updated {checkUpdatedAt(userData!)}
              </p>
            </div>
          </div>
        </div>
        <Button
          className="mt-6 w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
          href="/account/edit"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
