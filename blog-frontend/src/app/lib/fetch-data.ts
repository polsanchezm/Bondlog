"use server";
import axios from "../utils/axios";
import { Post, FormState, Register } from "./interfaces";
import { cookies } from "next/headers";
import { decrypt, deleteSession } from "./session";

const getSession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  return session;
};

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

const userLogin = async (userData: FormState) => {
  const response = await axios.post("/auth/login", userData);
  return response.data;
};

const userSignup = async (userData: Register) => {
  const response = await axios.post("/auth/register", userData);
  return response.data;
};

const userLogout = async () => {
  const response = await axios.post("/auth/logout");
  if (response.status === 200) deleteSession();
  return response.data;
};

const fetchUserData = async () => {
  const session = await getSession();
  const response = await axios.get("/auth/account", {
    headers: {
      Authorization: `Bearer ${session?.userToken}`,
    },
  });
  return response.data;
};

export {
  fetchPosts,
  fetchPostDetail,
  createPost,
  updatePost,
  deletePost,
  userLogin,
  userSignup,
  userLogout,
  fetchUserData,
  getSession,
};
