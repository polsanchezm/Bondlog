import { routes } from "@/lib/routes";
import { userLogout, getSession } from "@/lib/fetch-data";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  DarkThemeToggle,
} from "flowbite-react";

export async function Header() {
  const session = await getSession();
  const isLoggedIn = session?.userToken ? true : false;

  return (
    <Navbar fluid className="p-4 bg-gray-100 dark:bg-gray-700">
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
          Home
        </span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-4">
        {!isLoggedIn && (
          <>
            <Button href="/login">Log In</Button>
            <Button href="/signup">Sign Up</Button>
          </>
        )}
        <NavbarToggle />
        {isLoggedIn && (
          <>
            <Button onClick={userLogout}>Log Out</Button>
          </>
        )}
        <DarkThemeToggle />
      </div>
      {isLoggedIn && (
        <>
          <NavbarCollapse>
            {routes.map((route) => (
              <NavbarLink
                key={route.path}
                href={route.path}
                aria-current={route.path === "/" ? "page" : undefined}
              >
                {route.name}
              </NavbarLink>
            ))}
          </NavbarCollapse>
        </>
      )}
    </Navbar>
  );
}
