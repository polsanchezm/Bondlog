import { fetchUserData } from "@actions/user";
import { fetchPostDetail } from "@actions/posts";
import { Post } from "@lib/interfaces";
import BlogPostSkeleton from "@components/skeletons/PostDetailSkeleton";
import PostDetail from "@/components/posts/PostDetail";
import { getSession } from "@actions/auth";

// async function getData(id: string) {
//   const post: Post = await fetchPostDetail(id);
//   const session = await getSession();
//   const userData = await fetchUserData();

//   return { post, session, userData };
// }

async function getData(id: string, isLoggedIn: boolean) {
  const post: Post = await fetchPostDetail(id);

  // Solo obtener los datos del usuario si está logeado
  let userData = null;
  if (isLoggedIn) {
    userData = await fetchUserData();
  }

  return { post, userData };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const session = await getSession();

  const isLoggedIn = !!session?.userToken;
  const { post, userData } = await getData(params.id, isLoggedIn);

  if (!post) {
    return <BlogPostSkeleton />;
  }

  const userId = isLoggedIn ? userData?.id || "" : "";

  return <PostDetail post={post} userId={userId} isLoggedIn={isLoggedIn} />;
}
