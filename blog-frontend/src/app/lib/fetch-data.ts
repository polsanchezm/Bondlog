"use client";
import axios from "../utils/axios";
import { Post, FormState, Register } from "./interfaces";
import { deleteSession } from "./session";

const fetchPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

const fetchPostDetail = async (id: string) => {
  const response = await axios.get(`/posts/detail/${id}`);
  return response.data;
};

const createPost = async (formData: Post) => {
  const response = await axios.post("/posts/create", formData);
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

export {
  fetchPosts,
  fetchPostDetail,
  createPost,
  userLogin,
  userSignup,
  userLogout,
};
