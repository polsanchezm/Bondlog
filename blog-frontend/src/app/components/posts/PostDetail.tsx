"use client";

import { useEffect } from "react";
import PostData from "@/components/posts/PostData";
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useParams } from "next/navigation";
import PostSkeleton from "@/components/ui/skeletons/post-detail";

export default function PostDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    postDetail,
    loadPostDetail,
    error: postError,
    loading: postLoading,
  } = usePostStore();
  const { session } = useAuthStore();
  const { user: userData, loadUser, loading: userLoading } = useUserStore();

  useEffect(() => {
    if (id) {
      // Solo carga el post si aún no se ha cargado o si el post cargado no coincide con el id actual.
      if (!postDetail || postDetail.id !== id) {
        loadPostDetail(id);
      }
      // Solo carga los datos del usuario si aún no están cargados.
      if (!userData) {
        loadUser();
      }
    }
  }, [id, postDetail, userData, loadPostDetail, loadUser]);

  const isLoggedIn = !!session?.userToken;
  const isLoading = postLoading || userLoading;

  if (postError) {
    return (
      <article className="flex justify-center items-center min-h-screen">
        <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
            <h5 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              Server Error
            </h5>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              There was an issue fetching the post. Please try again later.
            </p>
          </div>
        </div>
      </article>
    );
  }
  if (!id || isLoading || !postDetail) {
    return <PostSkeleton />;
  } else {
    return (
      <>
        <PostData post={postDetail} user={userData!} isLoggedIn={isLoggedIn} />
      </>
    );
  }
}
