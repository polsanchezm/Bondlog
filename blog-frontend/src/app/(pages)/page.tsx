import { fetchPosts } from "@lib/fetch-data";
import Posts from "@components/Posts";
import { Post } from "@lib/interfaces";

export default async function Home() {
  const posts: Post[] = await fetchPosts();

  if (!posts || posts.length === 0) {
    return (
      <article className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h5 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              No posts found
            </h5>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              It looks like there are no posts available at the moment. Please
              check back later or create new content.
            </p>
          </div>
        </div>
      </article>
    );
  }

  return <Posts posts={posts} />;
}
