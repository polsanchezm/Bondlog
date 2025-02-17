"use client";

import CreatePostForm from "@/components/post/create/create-post-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { PostSchema } from "@/lib/form-schema";
import { showToast } from "@/lib/helpers";
import { FormEvent, useState } from "react";
import { Post } from "@/lib/interfaces";
import { useCreatePost } from "@/components/hooks/use-create-post";

export default function CreatePostPage() {
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
  const { create } = useCreatePost();
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
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
      const { error } = await create(formData);
      if (error) throw new Error(error!.message);
      showToast("successPostCreate", toast);
      router.push("/");
    } catch (error: unknown) {
      showToast("genericError", toast);
      console.error("Create Post Error:", error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
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
