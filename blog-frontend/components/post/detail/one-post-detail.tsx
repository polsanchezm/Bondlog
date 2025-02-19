"use client";

import PostData from "@/components/post/view/one-post-data";
import PostSkeleton from "@/components/ui/skeletons/post-detail";
import { Post, User } from "@/lib/interfaces";

interface PostDetailProps {
  post: Post;
  user: User;
  isLoggedIn: boolean;
}

export default function PostDetail({
  post,
  user,
  isLoggedIn,
}: PostDetailProps) {
  if (!post) {
    return <PostSkeleton />;
  }

  return <PostData post={post} user={user} isLoggedIn={isLoggedIn} />;
}
