"use server";
import axios from "@utils/axios";
import { cookies } from "next/headers";
import { decrypt, deleteSession } from "@/lib/session";
import { FormState, Register } from "@/lib/interfaces";

const getSession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  return session;
};

const userLogin = async (userData: FormState) => {
  const response = await axios.post("/auth/login", userData);
  return response.data;
};

const userSignup = async (formData: Register) => {
  const response = await axios.post("/auth/register", formData);
  return response.data;
};

const userLogout = async () => {
  const session = await getSession();
  const response = await axios.post("/auth/logout", null, {
    headers: {
      Authorization: `Bearer ${session?.userToken}`,
    },
  });
  if (response.status === 200) deleteSession();
  return response.data;
};

export { getSession, userLogin, userSignup, userLogout };
