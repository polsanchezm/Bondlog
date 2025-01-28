import EditPostForm from "@components/posts/EditPostForm";
import { fetchPostDetail } from "@actions/posts";
import { Post } from "@lib/interfaces";
import { isAuthenticated } from "@actions/auth";
import { redirect } from "next/navigation";

async function getData(id: string) {
  const post: Post = await fetchPostDetail(id);
  return post;
}

export default async function EditPost({ params }: { params: { id: string } }) {
  const authCheck = await isAuthenticated();
  if (!authCheck) {
    redirect("/login");
  } else {
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
}
