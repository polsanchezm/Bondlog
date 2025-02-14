import PostDetail from "@/components/post/detail/one-post-detail";
import { fetchPostDetail } from "@/services/post";
import { fetchUserData } from "@/services/user";
import { getSession } from "@/services/auth";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { data: postDetail } = await fetchPostDetail(params.id);
  const { data: user } = await fetchUserData();
  const session = await getSession();
  const isLoggedIn = !!session?.userToken;

  return <PostDetail post={postDetail} user={user} isLoggedIn={isLoggedIn} />;
}
