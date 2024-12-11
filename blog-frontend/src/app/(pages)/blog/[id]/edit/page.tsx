import EditPostForm from "@/components/EditPostForm";
import { fetchPostDetail } from "@/lib/fetch-data";
import { Post } from "@/lib/interfaces";

async function getData(id: string) {
  const post: Post = await fetchPostDetail(id);
  return post;
}

export default async function EditPost({ params }: { params: { id: string } }) {
  const post = await getData(params.id);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit post
        </h2>
        <EditPostForm post={post} />
      </div>
    </section>
  );
}
