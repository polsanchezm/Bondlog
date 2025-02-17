import Posts from "@/components/post/detail/all-posts-detail";
import { fetchPosts } from "@/services/post";

export default async function Home(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const { data: posts, pagination } = await fetchPosts(currentPage);

  return <Posts posts={posts} pagination={pagination} />;
}
