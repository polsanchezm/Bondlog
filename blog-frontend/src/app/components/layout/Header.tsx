import { getSession } from "@services/auth";
import { Navbar, NavbarBrand, DarkThemeToggle } from "flowbite-react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import LogoutAction from "@components/authentication/LogoutAction";
import Link from "next/link";

export default async function Header() {
  const session = await getSession();
  const isLoggedIn = !!session?.userToken;

  return (
    <Navbar
      fluid
      className="z-50 fixed bottom-0 left-0 w-full bg-gray-100 shadow-md dark:bg-gray-700 transition-all md:relative md:top-0 md:shadow-none"
    >
      <div className="flex w-full justify-around md:justify-between items-center px-4 py-2">
        <NavbarBrand href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            priority
            alt="logo"
            width={32}
            height={32}
            className="dark:invert"
          />
        </NavbarBrand>

        <div className="flex items-center gap-4 md:ml-auto">
          {isLoggedIn ? renderUserButtons() : renderAuthButtons()}
          <DarkThemeToggle />
        </div>
      </div>
    </Navbar>
  );
}

const renderAuthButtons = () => (
  <div className="flex items-center gap-3">
    <NavButton href="/login" icon="lucide:log-in" label="Log In" color="blue" />
    <NavButton
      href="/signup"
      icon="ion:person-add-outline"
      label="Sign Up"
      color="green"
    />
  </div>
);

const renderUserButtons = () => (
  <div className="flex items-center gap-3">
    <NavButton href="/post/create" icon="lucide:plus" label="Create a Post" />
    <NavButton href="/account" icon="lucide:user" label="Account" />
    <LogoutAction />
  </div>
);

const NavButton = ({
  href,
  icon,
  label,
  color = "black",
}: {
  href: string;
  icon: string;
  label: string;
  color?: string;
}) => {
  const baseColor =
    color === "blue"
      ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
      : color === "green"
      ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
      : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600";

  return (
    <Link href={href}>
      <button
        className={`flex flex-col items-center justify-center px-6 py-4 md:w-auto xl:w-auto text-white text-xs font-medium rounded transition-all md:flex-row md:text-sm ${baseColor} focus:ring focus:ring-opacity-50 active:scale-95`}
        aria-label={label}
      >
        <Icon icon={icon} className="w-5 h-5 md:w-6 md:h-6" />
        <span className="hidden md:inline ml-2">{label}</span>
      </button>
    </Link>
  );
};
