import CreatePostForm from "@/components/post/forms/create-post-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { PostSchema } from "@/lib/form-schema";
import { showToast } from "@/lib/helpers";
import { FormEvent, useCallback, useState } from "react";
import { Post } from "@/lib/interfaces";
import { useEditPost } from "@/components/hooks/use-edit-post";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const [formData, setFormData] = useState<Post>({
    title: "",
    subtitle: "",
    body: "",
    id: "",
    author_username: "",
    author_id: "",
    date: "",
    created_at: "",
    updated_at: "",
    is_pinned: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const { edit, loading, error } = useEditPost();
  const router = useRouter();

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = PostSchema.safeParse(formData);
      if (!result.success) {
        setErrors(
          Object.fromEntries(
            Object.entries(result.error.flatten().fieldErrors).map(
              ([key, value]) => [key, value[0]]
            )
          )
        );
        return;
      }

      setErrors({});
      try {
        const { data, error } = await edit(formData, id);
        console.log(data);
        if (error) throw new Error(error!.message);
        showToast("successPostEdit", toast);
        router.push("/");
      } catch (error: any) {
        showToast("genericError", toast);
        console.error("Edit Post Error:", error);
      }
    },
    [formData, edit, toast, router]
  );

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <CreatePostForm
          errors={errors}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}
