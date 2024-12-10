"use client";
import { useEffect, useState } from "react";
import {
  deletePost,
  fetchPostDetail,
  fetchUserData,
  getSession,
} from "@/lib/fetch-data";
import { Post, User } from "@/lib/interfaces";
import BlogPostSkeleton from "@/components/skeletons/PostDetailSkeleton";
import { Button } from "flowbite-react";
import { Icon } from "@iconify/react";
import { checkUpdatedAt, formatDate } from "@/utils/utils";
import { useRouter } from "next/navigation";
export default function BlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const id = params.id;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const postData: Post = await fetchPostDetail(id);
      setPost(postData);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setIsLoggedIn(!!session?.userToken);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
      setLoading(false);
    };

    loadUserData();
  }, []);

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
    router.push("/");
  };

  if (loading) {
    return <BlogPostSkeleton />;
  }

  return (
    <article className="p-6 flex justify-center">
      <div className="p-6 max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-white font-bold mb-2 sm:mb-0">
            {post?.title}
          </h1>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="font-bold">Last updated:</span>{" "}
          {checkUpdatedAt(post!)}
        </p>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          {post?.subtitle}
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-6">{post?.body}</p>

        <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
          <p className="sm:text-left">{post?.authorName}</p>
          <p className="sm:text-right">{formatDate(post?.created_at || "")}</p>
        </div>

        {isLoggedIn && userData?.id == post?.authorId && (
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              className="w-full sm:w-1/2 flex items-center px-3 py-1.5 mt-4 sm:mt-0 dark:bg-black dark:text-white bg-black text-white text-sm font-medium rounded dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-700 hover:text-white"
              href={`/blog/${post?.id}/edit`}
            >
              <Icon icon="mynaui:pencil" className="w-4 h-4 flex-shrink-0" />
              <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
                Edit Post
              </span>
            </Button>
            <Button
              className="w-full sm:w-1/2 flex items-center px-3 py-1.5 mt-4 sm:mt-0 dark:bg-red-700 dark:text-white bg-red-700 text-white text-sm font-medium rounded dark:hover:bg-red-500 dark:hover:text-white hover:bg-red-500 hover:text-white"
              onClick={() => handleDelete(post?.id || "")}
            >
              <Icon icon="mynaui:trash" className="w-4 h-4 flex-shrink-0" />
              <span className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
                Delete Post
              </span>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
