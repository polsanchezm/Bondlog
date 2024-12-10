"use client";
import { useState, useEffect } from "react";
import { userLogout, getSession } from "@/lib/fetch-data";
import { Button, Navbar, NavbarBrand, DarkThemeToggle } from "flowbite-react";
import { Icon } from "@iconify/react";
import Image from "next/image";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setIsLoggedIn(!!session?.userToken);
    };

    fetchSession();
  }, []);

  return (
    <Navbar fluid className="p-4 bg-gray-100 dark:bg-gray-700">
      <NavbarBrand href="/">
        <Image src="/logo.png" alt="logo" width={60} height={60}></Image>
      </NavbarBrand>
      <div className="flex md:order-2 gap-4">
        {!isLoggedIn && (
          <div className="flex items-center gap-3">
            <Button
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800"
              href="/login"
            >
              <Icon icon="lucide:log-in" className="w-4 h-4 flex-shrink-0" />
              <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
                Log In
              </span>
            </Button>
            <Button
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 dark:bg-green-700 dark:text-white dark:hover:bg-green-800"
              href="/signup"
            >
              <Icon
                icon="ion:person-add-outline"
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
                Sign Up
              </span>
            </Button>
          </div>
        )}

        {isLoggedIn && (
          <div className="flex items-center gap-3">
            <Button
              className="flex items-center gap-2 px-3 py-1.5 dark:bg-black dark:text-white bg-black text-white text-sm font-medium rounded dark:hover:bg-gray-800 dark:hover:text-white hover:bg-gray-800 hover:text-white"
              href="/blog/create"
            >
              <Icon icon="lucide:plus" className="w-4 h-4 flex-shrink-0" />
              <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
                Create a Post
              </span>
            </Button>
            <Button
              className="flex items-center gap-2 px-3 py-1.5 dark:bg-black dark:text-white bg-black text-white text-sm font-medium rounded dark:hover:bg-gray-800 dark:hover:text-white hover:bg-gray-800 hover:text-white"
              href="/account"
            >
              <Icon icon="lucide:user" className="w-4 h-4 flex-shrink-0" />
              <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
                Account
              </span>
            </Button>
            <Button
              className="flex items-center gap-2 px-3 py-1.5 dark:bg-red-700 dark:text-white bg-red-700 text-white text-sm font-medium rounded dark:hover:bg-red-500 dark:hover:text-white hover:bg-red-500 hover:text-white"
              onClick={() => userLogout()}
            >
              <Icon icon="lucide:log-out" className="w-4 h-4 flex-shrink-0" />
              <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
                Log Out
              </span>
            </Button>
          </div>
        )}
        <DarkThemeToggle />
      </div>
    </Navbar>
  );
}
