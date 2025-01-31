import { fetchPosts } from "@/actions/posts";
import Posts from "@/components/posts/Posts";
import { Post } from "@lib/interfaces";

export default async function Home() {
  const { data: posts, error } = await fetchPosts();

  if (error || !posts || posts.length === 0) {
    const isServerError = error?.status === 500;
    return (
      <article className="flex justify-center items-center min-h-screen">
        <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-lg shadow-lg p-8 bg-white dark:bg-gray-800">
            <h5 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              {isServerError ? "Server Error" : "No posts found"}
            </h5>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              {isServerError
                ? "There was an issue fetching the posts. Please try again later."
                : "It looks like there are no posts available at the moment. Please check back later or create new content."}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return <Posts posts={posts} />;
}
