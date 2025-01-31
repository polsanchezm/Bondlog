import EditPostForm from "@components/posts/EditPostForm";
import { fetchPostDetail } from "@actions/posts";
import { isAuthenticated } from "@actions/auth";
import { redirect } from "next/navigation";

async function getData(id: string) {
  const { data: post, error } = await fetchPostDetail(id);
  if (error) {
    return { post: null, userData: null, error };
  }
  return { post, error: null };
}

type Params = Promise<{ id: string }>;

export default async function EditPost({ params }: { params: Params }) {
  const authCheck = await isAuthenticated();
  if (!authCheck) {
    redirect("/login");
  } else {
    const { id } = await params;
    const { post, error } = await getData(id);

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
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit post
          </h2>
          <EditPostForm post={post} />
        </div>
      </section>
    );
  }
}
