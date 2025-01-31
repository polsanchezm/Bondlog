"use server";

import axios from "@utils/axios";
import { Register } from "@/lib/interfaces";
import { getSession } from "@/actions/auth";

const fetchUserData = async () => {
  try {
    const session = await getSession();
    const response = await axios.get("/user/account", {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("Error fetching user data:", error);

    return {
      data: null,
      error: {
        message: error.message || "Something went wrong",
        status: error.response?.status || 500,
      },
    };
  }
};

const updateUserData = async (userData: Register) => {
  try {
    const session = await getSession();
    const response = await axios.put("/user/edit", userData, {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("Error updating user data:", error);

    return {
      data: null,
      error: {
        message: error.message || "Something went wrong",
        status: error.response?.status || 500,
      },
    };
  }
};

const deleteUserData = async () => {
  try {
    const session = await getSession();
    const response = await axios.delete("/user/delete", {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("Error deleting user data:", error);

    return {
      data: null,
      error: {
        message: error.message || "Something went wrong",
        status: error.response?.status || 500,
      },
    };
  }
};

export { updateUserData, deleteUserData, fetchUserData };
