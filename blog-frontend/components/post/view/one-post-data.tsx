import { checkUpdatedAt, formatDate } from "@/lib/helpers";
import { Post, User } from "@/lib/interfaces";
import { PostDropdown } from "@/components/post/dropdown/post-dropdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PostComments from "@/components/comment/view/all-comment-data";

export default function PostData({
  post,
  user,
  isLoggedIn,
}: {
  post: Post;
  user?: User;
  isLoggedIn: boolean;
}) {
  return (
    <section className="flex flex-col items-center px-6 mt-8 mb-28">
      <Card className="max-w-3xl w-full shadow-lg border border-border bg-gray-100 dark:bg-gray-800">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-3xl sm:text-4xl font-bold">
            {post.title}
          </CardTitle>
          {isLoggedIn && user && (
            <PostDropdown
              post={post}
              initialIsPinned={post.is_pinned}
              user={user}
              isLoggedIn={isLoggedIn}
            />
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              <span className="font-bold">Last updated:</span>{" "}
              {checkUpdatedAt(post)}
            </p>
          </div>

          <p className="text-lg text-gray-800 dark:text-white">
            {post.subtitle}
          </p>

          <Separator className="border-t border-gray-300 dark:border-gray-600" />

          {post.body && (
            <div
              className="prose prose-neutral dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          )}

          <Separator className="border-t border-gray-300 dark:border-gray-600" />

          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 dark:text-gray-400">
            <p className="font-medium">{post.author_username}</p>
            <p>{formatDate(post.created_at)}</p>
          </div>
        </CardContent>
      </Card>
      <div className="w-full max-w-3xl mt-6">
        <span className="pl-1 text-md sm:text-xl font-bold">
          Comment section
        </span>
        <PostComments post_id={post.id} user={user} isLoggedIn={isLoggedIn} />
      </div>
    </section>
  );
}
