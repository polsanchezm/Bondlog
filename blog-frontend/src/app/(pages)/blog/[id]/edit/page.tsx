import EditPostForm from "@components/posts/EditPostForm";
import { fetchPostDetail } from "@actions/posts";
import { isAuthenticated } from "@actions/auth";
import { redirect } from "next/navigation";
import { fetchUserData } from "@/actions/user";

async function getPostData(id: string) {
  const { data: post, error } = await fetchPostDetail(id);
  if (error) {
    return { post: null, userData: null, error };
  }
  return { post, error: null };
}

async function getUserData() {
  const { data: userData, error } = await fetchUserData();
  if (error) {
    return { userData: null, error };
  }
  return { userData, error: null };
}

type Params = Promise<{ id: string }>;

export default async function EditPost({ params }: { params: Params }) {
  const authCheck = await isAuthenticated();
  const { id } = await params;
  const user = await getUserData();
  const { post, error } = await getPostData(id);

  if (!authCheck) {
    redirect("/login");
  } else if (user.userData?.id !== post.author_id) {
    redirect("/");
  } else {
    if (error || !post) {
      const isServerError = error?.status === 500;
      return (
        <article className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
              <h5 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                {isServerError ? "Server Error" : "Post not found"}
              </h5>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                {isServerError
                  ? "There was an issue fetching the posts. Please try again later."
                  : "It looks like this post is not available at the moment. Please check back later or create new content."}
              </p>
            </div>
          </div>
        </article>
      );
    }
    return <EditPostForm post={post} authCheck={authCheck} />;
  }
}
