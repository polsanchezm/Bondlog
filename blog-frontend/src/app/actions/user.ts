"use server";

import axios from "@utils/axios";
import { Register } from "@/lib/interfaces";
import { getSession } from "@/actions/auth";

const fetchUserData = async () => {
  const session = await getSession();
  const response = await axios.get("/user/account", {
    headers: {
      Authorization: `Bearer ${session?.userToken}`,
    },
  });
  return response.data;
};

const updateUserData = async (userData: Register) => {
  const session = await getSession();
  const response = await axios.put("/user/edit", userData, {
    headers: {
      Authorization: `Bearer ${session?.userToken}`,
    },
  });
  return response.data;
};

const deleteUserData = async () => {
  const session = await getSession();
  const response = await axios.delete("/user/delete", {
    headers: {
      Authorization: `Bearer ${session?.userToken}`,
    },
  });
  return response.data;
};

export { updateUserData, deleteUserData, fetchUserData };
