import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import LogoutAction from "@/components/auth/logout-action";
import Link from "next/link";
import { getSession } from "@/services/auth";
import { LogIn, UserPlus, SquarePen, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const session = await getSession();
  const isLoggedIn = !!session?.userToken;

  return (
    <nav className="px-2 py-2.5 dark:border-gray-700 sm:px-4 z-50 fixed bottom-0 left-0 w-full bg-gray-300 shadow-md dark:bg-gray-800 transition-all md:relative md:top-0 md:shadow-none">
      <NavigationMenu className="mx-auto flex flex-wrap items-center justify-between">
        <NavigationMenuList className="flex w-full justify-around md:justify-between items-center px-4 py-2 gap-6">
          <NavigationMenuItem className="mr-6">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={(navigationMenuTriggerStyle(), "bg-transparent")}
              >
                <Image
                  src="/images/logo.png"
                  priority
                  alt="logo"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {isLoggedIn ? <UserButtons /> : <AuthButtons />}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const AuthButtons = () => (
  <div className="flex items-center gap-3">
    <Link href="/login">
      <Button
        className="flex items-center px-6 py-4 gap-2 text-white text-sm font-medium rounded transition-all 
                 bg-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-500 
                 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed 
                 focus:ring focus:ring-gray-300 dark:focus:ring-gray-600 active:scale-95"
      >
        <LogIn />
        <span className="hidden md:inline ml-2">Log In</span>
      </Button>
    </Link>

    <Link href="/signup">
      <Button
        className="flex items-center px-6 py-4 gap-2 text-white text-sm font-medium rounded transition-all 
        bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-500 
        disabled:bg-blue-400 dark:disabled:bg-blue-600 disabled:cursor-not-allowed 
        focus:ring focus:ring-blue-300 dark:focus:ring-blue-600 active:scale-95"
      >
        <UserPlus />
        <span className="hidden md:inline ml-2">Sign Up</span>
      </Button>
    </Link>
  </div>
);

const UserButtons = () => (
  <div className="flex items-center gap-3">
    <Link href="/post/create">
      <Button
        className="flex items-center px-6 py-4 gap-2 text-white text-sm font-medium rounded transition-all 
                 bg-green-600 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-500 
                 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed 
                 focus:ring focus:ring-green-300 dark:focus:ring-green-600 active:scale-95"
      >
        <SquarePen />
        <span className="hidden md:inline ml-2">Create Post</span>
      </Button>
    </Link>

    <Link href="/account">
      <Button
        className="flex items-center px-6 py-4 gap-2 text-white text-sm font-medium rounded transition-all 
                 bg-gray-600 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-400 
                 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed 
                 focus:ring focus:ring-gray-300 dark:focus:ring-gray-600 active:scale-95"
      >
        <User />
        <span className="hidden md:inline ml-2">Account</span>
      </Button>
    </Link>
    <LogoutAction />
  </div>
);
