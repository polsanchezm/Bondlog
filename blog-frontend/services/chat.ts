import axios from "@/lib/axios";
import { getSession } from "@/services/auth";
import { APIError, Message } from "@/lib/interfaces";

const fetchChats = async () => {
  try {
    const session = await getSession();
    const response = await axios.get("/messages/chats", {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return {
      data: response.data.data,
      error: null,
    };
  } catch (error: unknown) {
    console.error("Error fetching chats:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        data: (error as APIError).response?.data?.message,
        status: (error as APIError).response?.status || 500,
      },
    };
  }
};

const fetchMessages = async () => {
  try {
    const session = await getSession();
    const response = await axios.get("/messages", {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return {
      data: response.data.data,
      error: null,
    };
  } catch (error: unknown) {
    console.error("Error fetching messages:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        data: (error as APIError).response?.data?.message,
        status: (error as APIError).response?.status || 500,
      },
    };
  }
};

const createMessage = async (formData: Message) => {
  try {
    const session = await getSession();
    const response = await axios.post("/messages/create", formData, {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error creating the message:", error);

    return {
      data: null,
      error: {
        message: (error as APIError).message,
        data: (error as APIError).response?.data?.message,
        status: (error as APIError).response?.status,
      },
    };
  }
};

export { fetchChats, fetchMessages, createMessage };
