import Posts from "@/components/post/detail/all-posts-detail";
import { fetchPosts } from "@/services/post";
import { fetchUserData } from "@/services/user";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const { data: posts, pagination } = await fetchPosts(currentPage);
  const { data: user } = await fetchUserData();

  return (
    <Posts
      posts={posts}
      pagination={{
        current_page: 1,
        next_page_url: "",
        prev_page_url: "",
      }}
      user={user}
      isLoggedIn={!!user}
    />
  );
}
