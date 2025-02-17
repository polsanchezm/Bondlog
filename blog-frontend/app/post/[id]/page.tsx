import PostDetail from "@/components/post/detail/one-post-detail";
import { fetchPostDetail } from "@/services/post";
import { fetchUserData } from "@/services/user";
import { getSession } from "@/services/auth";

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const { data: postDetail } = await fetchPostDetail(id);
  const { data: user } = await fetchUserData();
  const session = await getSession();
  const isLoggedIn = !!session?.userToken;

  return <PostDetail post={postDetail} user={user} isLoggedIn={isLoggedIn} />;
}
