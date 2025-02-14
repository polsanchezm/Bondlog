import { checkUpdatedAt, formatDate } from "@/lib/helpers";
import { Post, User } from "@/lib/interfaces";
import { PostDropdown } from "@/components/post/PostDropdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <section className="flex justify-center px-6 mt-8 mb-20 overflow-x-auto whitespace-pre-wrap break-all">
      <Card className="max-w-3xl w-full shadow-lg border border-border dark:border-gray-700">
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

          <Separator />

          {post.body && (
            <div
              className="prose prose-neutral dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          )}

          <Separator />
          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 dark:text-gray-400">
            <p className="font-medium">{post.author_username}</p>
            <p>{formatDate(post.created_at)}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
