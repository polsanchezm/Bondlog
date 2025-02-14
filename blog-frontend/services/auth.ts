"use server";
import axios from "@/lib/axios";
import { cookies } from "next/headers";
import { decrypt, deleteSession, deleteUserCookie } from "@/lib/session";
import { APIError, Login, Register } from "@/lib/interfaces";
import { signIn } from "@/auth";

const getSession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  return session;
};

const userLogin = async (userData: Login) => {
  try {
    const response = await axios.post("/auth/login", userData);

    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error logging in:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        status: (error as APIError).response?.status || 500,
      },
    };
  }
};

const userSignup = async (formData: Register) => {
  try {
    const response = await axios.post("/auth/register", formData);

    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error signing in:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        status: (error as APIError).response?.status || 500,
      },
    };
  }
};

const userLogout = async () => {
  try {
    const session = await getSession();
    const response = await axios.post("/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    if (response.status === 200) {
      deleteSession();
      deleteUserCookie();
    }
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error logging out:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        status: (error as APIError).response?.status || 500,
      },
    };
  }
};

const isAuthenticated = async () => {
  const session = await getSession();
  return !!session;
};

const githubLogin = async () => {
  await signIn("github", { redirectTo: "/" })
}

export { getSession, userLogin, userSignup, userLogout, isAuthenticated, githubLogin };
