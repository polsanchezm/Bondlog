import axios from "@/lib/axios";
import { APIError, Comment } from "@/lib/interfaces";
import { getSession } from "@/services/auth";

const fetchComments = async (page = 1, postId: string) => {
  try {
    const response = await axios.get(`/posts/comment/${postId}?page=${page}`);
    return {
      data: response.data.data,
      pagination: response.data.pagination,
      error: null,
    };
  } catch (error: unknown) {
    console.error("Error fetching comments:", error);

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

const fetchCommentDetail = async (id: string) => {
  try {
    const response = await axios.get(`/posts/comment/detail/${id}`);
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error fetching comment detail:", error);

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

const createComment = async (formData: Comment, postId: string) => {
  try {
    const session = await getSession();
    const response = await axios.post(
      `/posts/comment/create/${postId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.userToken}`,
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error creating the comment:", error);

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

const updateComment = async (formData: Comment, id: string) => {
  try {
    const session = await getSession();
    const response = await axios.put(`/posts/comment/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error updating the comment:", error);

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

const deleteComment = async (id: string) => {
  try {
    const session = await getSession();
    const response = await axios.delete(`/posts/comment/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.userToken}`,
      },
    });
    return { data: response.data, error: null };
  } catch (error: unknown) {
    console.error("Error deleting the comment:", error);

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

const togglePin = async (commentId: string) => {
  try {
    const session = await getSession();
    const response = await axios.patch(
      `/posts/comment/pin/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session?.userToken}`,
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error pinning/unpinning comment:", error);
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
  fetchComments,
  fetchCommentDetail,
  createComment,
  updateComment,
  deleteComment,
  togglePin,
};
