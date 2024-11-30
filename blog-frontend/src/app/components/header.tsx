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
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
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

// export function Header() {

//   return (
//     <Navbar className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
//       <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//         <a href="https://flowbite.com" className="flex items-center">
//           {/* <Image
//               src="https://flowbite.com/docs/images/logo.svg"
//               className="mr-3 h-6 sm:h-9"
//               alt="Flowbite Logo"
//               width={180}
//               height={38}
//             /> */}
//         </a>
//         <div className="flex items-center lg:order-2">
//           {isLoggedIn && (
//             <>
//               <button
//                 onClick={userLogout}
//                 className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
//               >
//                 Log Out
//               </button>
//             </>
//           )}
//           <button
//             data-collapse-toggle="mobile-menu-2"
//             type="button"
//             className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             aria-controls="mobile-menu-2"
//             aria-expanded="false"
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg
//               className="w-6 h-6"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                 clip-rule="evenodd"
//               ></path>
//             </svg>
//             <svg
//               className="hidden w-6 h-6"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clip-rule="evenodd"
//               ></path>
//             </svg>
//           </button>
//         </div>
//         {isLoggedIn && (
//           <>
//             <div
//               className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
//               id="mobile-menu-2"
//             >
//               <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//                 {routes.map((route) => (
//                   <li key={route.path}>
//                     <Link
//                       href={route.path}
//                       className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
//                       aria-current={route.path === "/" ? "page" : undefined}
//                     >
//                       {route.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </>
//         )}
//       </div>
//     </Navbar>
//   );
// }
