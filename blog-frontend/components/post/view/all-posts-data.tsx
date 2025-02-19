import { PaginationType, Post } from "@/lib/interfaces";
import { checkUpdatedAt } from "@/lib/helpers";
import Link from "next/link";
import { PostPaginationComponent } from "@/components/ui/post-pagination";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PostsData({
  posts,
  pagination,
}: {
  posts: Post[];
  pagination: PaginationType;
}) {
  return (
    <section className="flex flex-col items-center my-10 px-6 w-full min-h-screen">
      <div className="max-w-7xl w-full">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col transition-shadow duration-300 p-2 hover:shadow-xl border border-border bg-gray-100 dark:bg-gray-800"
            >
              <CardHeader className="min-h-[60px] flex justify-between items-start">
                <CardTitle className="text-2xl font-bold line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow space-y-4 min-h-[150px]">
                <p className="text-lg text-gray-700 dark:text-gray-400 line-clamp-2">
                  {post.subtitle}
                </p>

                <Separator className="border-t border-gray-300 dark:border-gray-600" />

                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-bold">Written by:</span>{" "}
                    {post.author_username}
                  </p>
                  <p>
                    <span className="font-bold">Last update:</span>{" "}
                    {checkUpdatedAt(post)}
                  </p>
                </div>
                <Separator className="border-t border-gray-300 dark:border-gray-600" />
              </CardContent>

              <CardFooter className="mt-auto">
                <Link
                  href={`/post/${post.id}`}
                  className="w-full text-center font-semibold text-primary hover:underline"
                >
                  Read More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <footer className="mt-10">
          <PostPaginationComponent pagination={pagination} />
        </footer>
      </div>
    </section>
  );
}
