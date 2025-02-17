import Posts from "@/components/post/detail/all-posts-detail";
import { fetchPosts } from "@/services/post";
import { fetchUserData } from "@/services/user";

export default async function Home(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const { data: posts, pagination } = await fetchPosts(currentPage);
  const { data: user } = await fetchUserData();

  return (
    <Posts
      posts={posts}
      pagination={pagination}
      user={user}
      isLoggedIn={!!user}
    />
  );
}
