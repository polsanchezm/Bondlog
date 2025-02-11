"use client";

import { Icon } from "@iconify/react";
import { User } from "@lib/interfaces";
import { formatDate, checkUpdatedAt } from "@utils/utils";
import Link from "next/link";
import { useMemo } from "react";

export default function AccountDetails({
  userData,
  userError,
}: {
  userData: User;
  userError: string;
}) {

  const initialLetter = useMemo(
    () => userData?.username?.charAt(0).toUpperCase(),
    [userData.username]
  );

  if (userError) {
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

  return (
    <section className="flex flex-col items-center justify-center p-6">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Profile
        </h2>
      </header>

      <article className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          {/* Avatar con inicial */}
          <div className="h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-2xl">
            {initialLetter}
          </div>

          {/* Información del usuario */}
          <div>
            <p className="text-lg font-medium text-gray-800 dark:text-white">
              {userData.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {userData.email}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-400">
              Joined on {formatDate(userData.created_at || "")}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-400">
              Last updated {checkUpdatedAt(userData)}
            </p>
          </div>
        </div>

        {/* Botón de edición (solo si no es admin) */}
        {userData.role !== "admin" && (
          <Link href="/account/edit" passHref>
            <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-white bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg transition duration-300">
              <Icon icon="mynaui:pencil" className="w-6 h-6" />
              <span className="hidden md:inline ml-2">Edit Profile</span>
            </button>
          </Link>
        )}
      </article>
    </section>
  );
}
