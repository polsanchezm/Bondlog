"use client";

import PostsData from "@/components/post/data/all-posts-data";
import PostsSkeleton from "@/components/ui/skeletons/posts";
import { PaginationType, Post, User } from "@/lib/interfaces";

export default function PostsComponent({
  posts,
  pagination,
  user,
  isLoggedIn,
}: {
  posts: Post[];
  pagination: PaginationType;
  user: User;
  isLoggedIn: boolean;
}) {
  if (posts.length === 0) {
    return <PostsSkeleton />;
  }

  return (
    <PostsData
      posts={posts}
      pagination={pagination}
      user={user}
      isLoggedIn={isLoggedIn}
    />
  );
}
