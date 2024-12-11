import { checkUpdatedAt, formatDate } from "@/utils/utils";
import { PostDetailProps } from "@/lib/interfaces";
import PostActions from "./PostActions";

export default function PostDetail({
  post,
  isLoggedIn,
  userId,
}: PostDetailProps) {
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
          {checkUpdatedAt(post)}
        </p>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          {post?.subtitle}
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-6">{post?.body}</p>

        <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
          <p className="sm:text-left">{post?.authorName}</p>
          <p className="sm:text-right">{formatDate(post?.created_at || "")}</p>
        </div>

        {isLoggedIn && userId == post?.authorId && (
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <PostActions postId={post?.id} />{" "}
          </div>
        )}
      </div>
    </article>
  );
}
