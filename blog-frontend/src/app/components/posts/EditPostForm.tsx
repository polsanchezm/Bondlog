"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { updatePost } from "@actions/posts";
import { useRouter } from "next/navigation";
import { Post } from "@lib/interfaces";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { PostSchema } from "@/lib/form-schema";
import { Icon } from "@iconify/react";
import { FormField } from "@/components/ui/field";

// Importa BodyEditor de forma dinámica para evitar problemas de SSR y recreaciones
const BodyEditor = dynamic(() => import("@/components/tiptap/BodyEditor"), {
  ssr: false,
});

export default function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: post.title,
    subtitle: post.subtitle,
    body: post.body,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handlePostUpdate = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setErrorMessage(null);
      setLoading(true);

      const result = PostSchema.safeParse(formData);
      if (!result.success) {
        setErrors(
          Object.fromEntries(
            Object.entries(result.error.flatten().fieldErrors).map(
              ([key, value]) => [key, value[0]]
            )
          )
        );
        showToast("validationError", toast);
        setLoading(false);
        return;
      }

      setErrors({});

      try {
        const { data, error } = await updatePost(
          { ...post, ...formData },
          post.id
        );
        if (error) throw new Error(error.message || "Error updating post");

        showToast("successPostEdit", toast);
        router.replace(`/blog/${data.post.id}`);
      } catch (error) {
        setErrorMessage((error as Error)?.message);
        showToast("genericError", toast);
      } finally {
        setLoading(false);
      }
    },
    [formData, post, router, toast]
  );

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <div
        className="p-3 mb-8 text-lg text-yellow-800 bg-yellow-100 rounded-lg dark:bg-yellow-800 dark:text-yellow-200"
        role="alert"
      >
        <strong className="font-semibold">Beta Notice: </strong>
        The <em>body</em> field is in BETA and may behave unexpectedly. Please
        back up your content elsewhere to avoid any data loss.
      </div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
        Edit Post
      </h2>

      {errorMessage && (
        <div
          className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
          aria-live="polite"
        >
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handlePostUpdate}
        className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        <fieldset className="space-y-4">
          <legend className="sr-only">Edit Post Form</legend>

          {/* Title */}
          <FormField
            label="Post Title"
            id="title"
            label_type="text"
            value={formData.title}
            setValue={(val) => handleInputChange("title", val)}
            error={errors.title}
          />

          {/* Subtitle */}
          <FormField
            label="Post Subtitle"
            id="subtitle"
            label_type="text"
            value={formData.subtitle}
            setValue={(val) => handleInputChange("subtitle", val)}
            error={errors.subtitle}
          />

          {/* Body */}
          <FormField
            label="Post Body"
            id="body"
            label_type="textarea"
            error={errors.body}
          >
            <BodyEditor
              value={formData.body}
              onChange={(content) => handleInputChange("body", content)}
            />
          </FormField>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 h-14 px-5 py-3 text-white font-medium text-sm rounded-lg bg-green-600 hover:bg-green-700 focus:ring focus:ring-green-300 dark:focus:ring-green-700 transition transform active:scale-95 disabled:bg-gray-400 dark:disabled:bg-gray-600"
        >
          {loading ? (
            <span>Updating Post...</span>
          ) : (
            <>
              <Icon icon="material-symbols:check-rounded" className="w-6 h-6" />
              <span className="hidden md:inline ml-2">Update Post</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}
