"use server";

import axios from "@utils/axios";
import { Post } from "@lib/interfaces";
import { getSession } from "./auth";

const fetchPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

const fetchPostDetail = async (id: string) => {
  const response = await axios.get(`/posts/detail/${id}`);
  return response.data;
};

const createPost = async (formData: Post) => {
  const session = await getSession();
  const response = await axios.post("/posts/create", formData, {
    headers: {
      Authorization: `Bearer ${session?.userToken}`,
    },
  });
  return response.data;
};

const updatePost = async (formData: Post, id: string) => {
  const session = await getSession();
  const response = await axios.put(`/posts/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${session?.userToken}`,
    },
  });
  return response.data;
};

const deletePost = async (id: string) => {
  const session = await getSession();
  const response = await axios.delete(`/posts/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.userToken}`,
    },
  });
  return response.data;
};

export { fetchPosts, fetchPostDetail, createPost, updatePost, deletePost };
