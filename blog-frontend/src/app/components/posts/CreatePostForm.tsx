"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@actions/posts";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { PostSchema } from "@/lib/form-schema";
import { Icon } from "@iconify/react";
import { FormField } from "@/components/ui/field";

// Importa BodyEditor de forma dinámica para evitar problemas de SSR y recreaciones
const BodyEditor = dynamic(() => import("@/components/tiptap/BodyEditor"), {
  ssr: false,
});

export default function CreatePostForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    body: "",
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

  const handlePostCreation = useCallback(
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
        const { data, error } = await createPost({
          ...formData,
          id: "",
          author_username: "",
          author_id: "",
          date: "",
          created_at: "",
          updated_at: "",
          is_pinned: false,
        });

        if (error) throw new Error(error?.data);

        showToast("successPost", toast);
        router.replace(`/blog/${data.post.id}`);
      } catch (error) {
        setErrorMessage((error as Error)?.message);
        showToast("genericError", toast);
      } finally {
        setLoading(false);
      }
    },
    [formData, router, toast]
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
        Create a New Post
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
        onSubmit={handlePostCreation}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        <fieldset className="space-y-4">
          <legend className="sr-only">Create Post Form</legend>

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

          {/* Body usando BodyEditor */}
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
            <span>Creating Post...</span>
          ) : (
            <>
              <Icon icon="material-symbols:check-rounded" className="w-6 h-6" />
              <span className="hidden md:inline ml-2">Create Post</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}
