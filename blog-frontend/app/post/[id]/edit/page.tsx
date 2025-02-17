import EditPostForm from "@/components/post/edit/edit-post-form";
import { fetchPostDetail } from "@/services/post";

export default async function EditPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const { data: postDetail } = await fetchPostDetail(id);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <EditPostForm postData={postDetail} />
      </div>
    </div>
  );
}
