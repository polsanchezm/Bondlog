import { fetchPostDetail, fetchUserData, getSession } from "@lib/fetch-data";
import { Post } from "@lib/interfaces";
import BlogPostSkeleton from "@components/skeletons/PostDetailSkeleton";
import PostDetail from "@components/PostDetail";

async function getData(id: string) {
  const post: Post = await fetchPostDetail(id);
  const session = await getSession();
  const userData = await fetchUserData();

  return { post, session, userData };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { post, session, userData } = await getData(params.id);
  const isLoggedIn = !!session?.userToken;

  if (!post) {
    return <BlogPostSkeleton />;
  }

  return (
    <PostDetail
      post={post}
      userId={userData?.id || ""}
      isLoggedIn={isLoggedIn}
    />
  );
}
