"use client";

import { Icon } from "@iconify/react";
import { User } from "@lib/interfaces";
import { formatDate, checkUpdatedAt } from "@utils/utils";
import { Button } from "flowbite-react";

export default function AccountDetails({ userData }: { userData: User }) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
        User Profile
      </h2>
      <div className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-2xl">
              {userData?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {userData?.username}
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
        {userData?.role !== "admin" && (
          <Button
            className="mt-6 w-full py-3 flex items-center rounded bg-green-600 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-800"
            href="/account/edit"
          >
            <Icon icon="mynaui:pencil" className="w-7 h-7" />
          </Button>
        )}
      </div>
    </div>
  );
}
