import axios from "@utils/axios";
import { Post } from "@lib/interfaces";
import { getSession } from "./auth";

const fetchPosts = async () => {
  try {
    const response = await axios.get("/posts");
    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("Error fetching posts:", error);

    return {
      data: null,
      error: {
        message: error.message || "Something went wrong",
        status: error.response?.status || 500,
      },
    };
  }
};

const fetchPostDetail = async (id: string) => {
  try {
    const response = await axios.get(`/posts/detail/${id}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("Error fetching post detail:", error);

    return {
      data: null,
      error: {
        message: error.message || "Something went wrong",
        status: error.response?.status || 500,
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
  } catch (error: any) {
    console.error("Error creating the post:", error);

    return {
      data: null,
      error: {
        message: error.message || "Something went wrong",
        status: error.response?.status || 500,
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
  } catch (error: any) {
    console.error("Error updating the post:", error);

    return {
      data: null,
      error: {
        message: error.message || "Something went wrong",
        status: error.response?.status || 500,
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
  } catch (error: any) {
    console.error("Error deleting the post:", error);

    return {
      data: null,
      error: {
        message: error.message || "Something went wrong",
        status: error.response?.status || 500,
      },
    };
  }
};

export { fetchPosts, fetchPostDetail, createPost, updatePost, deletePost };
