import PostsData from "@/components/posts/PostsData";
import PostsSkeleton from "@/components/ui/skeletons/posts";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";
import { useUserStore } from "@/stores/user";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function Posts() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;
  const {
    posts,
    pagination,
    loadPosts,
    error: postError,
    loading: postLoading,
  } = usePostStore();
  const { user, isAuth } = useAuthStore();
  const { checkAuth } = useAuthStore();
  const { loadUser } = useUserStore();

  useEffect(() => {
    loadPosts(currentPage);
    checkAuth();
    loadUser();
  }, [currentPage, loadPosts, checkAuth, loadUser]);

  if (postError) {
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

  if (postLoading || posts.length === 0) {
    return <PostsSkeleton />;
  }

  return (
    <PostsData
      posts={posts}
      pagination={
        pagination || {
          current_page: 1,
          next_page_url: "",
          prev_page_url: "",
        }
      }
      user={user!}
      isLoggedIn={isAuth}
    />
  );
}
