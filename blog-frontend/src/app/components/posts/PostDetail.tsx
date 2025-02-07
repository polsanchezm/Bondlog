import { checkUpdatedAt, formatDate } from "@utils/utils";
import { Post, User } from "@lib/interfaces";
import { PostDropdown } from "@components/posts/PostDropdown";

export default function PostDetail({
  post,
  user,
  isLoggedIn,
}: {
  post: Post;
  user: User;
  isLoggedIn: boolean;
}) {
  return (
    <article className="p-6 flex justify-center mb-20 overflow-x-auto break-words">
      <div className="p-6 max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="prose dark:prose-dark text-3xl sm:text-4xl text-gray-800 dark:text-white font-bold">
            {post?.title}
          </h1>
          {isLoggedIn && (
            <PostDropdown
              post={post}
              initialIsPinned={post.is_pinned}
              user={user}
              isLoggedIn={isLoggedIn}
            />
          )}
        </div>

        <p className="prose dark:prose-dark text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="font-bold">Last updated:</span>{" "}
          {checkUpdatedAt(post)}
        </p>

        <p className="prose dark:prose-dark text-xl text-gray-800 dark:text-white mb-6">
          {post?.subtitle}
        </p>

        <div
          className="prose prose-neutral dark:prose-invert mb-6 overflow-x-auto break-words"
          dangerouslySetInnerHTML={{ __html: post?.body }}
        ></div>

        <div className="flex flex-col sm:flex-row justify-between text-sm mb-6">
          <p className="prose dark:prose-dark sm:text-left text-gray-500 dark:text-gray-400">
            {post?.author_username}
          </p>
          <p className="prose dark:prose-dark sm:text-right text-gray-500 dark:text-gray-400">
            {formatDate(post?.created_at || "")}
          </p>
        </div>
      </div>
    </article>
  );
}
