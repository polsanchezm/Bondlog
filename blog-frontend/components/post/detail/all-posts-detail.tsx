"use client";

import PostsData from "@/components/post/view/all-posts-data";
import PostsSkeleton from "@/components/ui/skeletons/posts";
import { PaginationType, Post } from "@/lib/interfaces";

export default function PostsComponent({
  posts,
  pagination,
}: {
  posts: Post[];
  pagination: PaginationType;
}) {
  if (posts.length === 0) {
    return <PostsSkeleton />;
  }

  return <PostsData posts={posts} pagination={pagination} />;
}
