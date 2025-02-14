"use server";

import axios from "@/lib/axios";
import { APIError, Register } from "@/lib/interfaces";
import { getSession } from "@/services/auth";

const fetchUserData = async () => {
  try {
    const session = await getSession();
    const response = await axios.get("/user/account", {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error fetching user data:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        status: (error as APIError).response?.status || 500,
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
  } catch (error: unknown) {
    console.error("Error updating user data:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        status: (error as APIError).response?.status || 500,
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
  } catch (error: unknown) {
    console.error("Error deleting user data:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        status: (error as APIError).response?.status || 500,
      },
    };
  }
};

export { updateUserData, deleteUserData, fetchUserData };
