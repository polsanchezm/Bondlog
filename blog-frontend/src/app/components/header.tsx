import { routes } from "@/lib/routes";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { userLogout } from "@/lib/fetch-data";
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
  async function getSession() {
    const cookie = cookies().get("session")?.value;
    const session = cookie ? await decrypt(cookie) : null;
    return session;
  }

  const session = await getSession();
  const isLoggedIn = session?.userToken ? true : false;

  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
