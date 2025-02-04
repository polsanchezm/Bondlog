import { fetchUserData } from "@actions/user";
import { fetchPostDetail } from "@actions/posts";
import PostDetail from "@/components/posts/PostDetail";
import { getSession } from "@actions/auth";
import { APIError } from "@/lib/interfaces";

async function getData(id: string, isLoggedIn: boolean) {
  try {
    const { data: post } = await fetchPostDetail(id);
    let userData = null;
    if (isLoggedIn) {
      userData = await fetchUserData();
    }
    return { post, userData };
  } catch (error: unknown) {
    return { post: null, userData: null, error };
  }
}

type Params = Promise<{ id: string }>;

export default async function BlogPost({ params }: { params: Params }) {
  const { id } = await params;
  
  if (!id) {
    return <div>Post not found</div>;
  }

  const session = await getSession();
  const isLoggedIn = !!session?.userToken;
  const { post, userData, error } = await getData(id, isLoggedIn);

  if (error || !post) {
    const isServerError = (error as APIError)?.response?.status === 500;
    return (
      <article className="flex justify-center items-center min-h-screen">
        <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
            <h5 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              {isServerError ? "Server Error" : "Post not found"}
            </h5>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              {isServerError
                ? "There was an issue fetching the post. Please try again later."
                : "It looks like this post is not available at the moment. Please check back later or create new content."}
            </p>
          </div>
        </div>
      </article>
    );
  }

  const userId = isLoggedIn && userData?.data ? userData.data.id : "";

  return (
    <PostDetail
      post={post}
      userRole={userData?.data?.role}
      userId={userId}
      isLoggedIn={isLoggedIn}
    />
  );
}
