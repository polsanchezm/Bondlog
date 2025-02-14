import axios from "@/lib/axios";
import { APIError, Post } from "@/lib/interfaces";
import { getSession } from "./auth";

const fetchPosts = async (page = 1) => {
  try {
    const response = await axios.get(`/posts?page=${page}`);
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      error: null,
    };
  } catch (error: unknown) {
    console.error("Error fetching posts:", error);

    return {
      data: null,
      pagination: null,
      error: {
        message: (error as APIError).message || "Something went wrong",
        data: (error as APIError).response?.data?.message,
        status: (error as APIError).response?.status || 500,
      },
    };
  }
};

const fetchPostDetail = async (id: string) => {
  try {
    const response = await axios.get(`/posts/detail/${id}`);
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error fetching post detail:", error);

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

const createPost = async (formData: Post) => {
  try {
    const session = await getSession();
    const response = await axios.post("/posts/create", formData, {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error creating the post:", error);

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

const updatePost = async (formData: Post, id: string) => {
  try {
    const session = await getSession();
    const response = await axios.put(`/posts/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error updating the post:", error);

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

const deletePost = async (id: string) => {
  try {
    const session = await getSession();
    const response = await axios.delete(`/posts/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error deleting the post:", error);

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

const togglePin = async (postId: string) => {
  try {
    const session = await getSession();
    const response = await axios.patch(
      `/posts/pin/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session?.userToken}`,
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error al fijar/desfijar el post:", error);
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

export {
  fetchPosts,
  fetchPostDetail,
  createPost,
  updatePost,
  deletePost,
  togglePin,
};
