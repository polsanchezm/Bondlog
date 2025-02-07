"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPosts } from "@/actions/posts";
import { fetchUserData } from "@/actions/user";
import { getSession } from "@/actions/auth";
import Posts from "@/components/posts/Posts";
import {
  APIError,
  PaginationProps,
  SessionPayload,
  User,
} from "@/lib/interfaces";
import { Skeleton } from "@/components/ui/skeleton";

function HomeContent() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState<PaginationProps | null>(null);
  const [error, setError] = useState<APIError | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState<APIError | null>(null);
  const [session, setSession] = useState<SessionPayload | null>(null);

  useEffect(() => {
    async function loadUserData() {
      const { data, error } = await fetchUserData();

      if (error) {
        setUserError(error);
      } else {
        setUser(data);
      }
    }

    async function loadSession() {
      const sessionData = await getSession();

      if (
        sessionData &&
        "userToken" in sessionData &&
        "expiresAt" in sessionData
      ) {
        setSession({
          userToken: sessionData.userToken as string,
          expiresAt: new Date(sessionData.expiresAt as string),
        });
      } else {
        setSession(null);
      }
    }

    async function loadPosts() {
      const { data, pagination, error } = await fetchPosts(currentPage);
      setPosts(data || []);
      setPagination(pagination);
      setError(error);
    }

    loadUserData();
    loadSession();
    loadPosts();
  }, [currentPage]);

  if (posts.length === 0) {
    return (
      <article className="flex justify-center my-10 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <div className="bg-gray-900 text-white dark:bg-gray-800 rounded-lg shadow-xl p-6 h-40 flex flex-col justify-between">
                <Skeleton className="w-2/3 h-6 mb-2" />
                <Skeleton className="w-1/2 h-4 mb-4" />
                <div>
                  <Skeleton className="w-1/4 h-4 mb-2" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
          <h5 className="mb-4 text-3xl font-semibold text-center text-gray-900 dark:text-white">
            Server Error
          </h5>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300">
            There was an issue fetching the posts. Please try again later.
          </p>
        </div>
      </article>
    );
  }

  return (
    <div>
      {userError && <div className="hidden">{userError.message}</div>}
      <Posts
        posts={posts}
        pagination={
          pagination || {
            current_page: 1,
            next_page_url: "",
            prev_page_url: "",
          }
        }
        user={user!}
        isLoggedIn={!!session?.userToken}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
