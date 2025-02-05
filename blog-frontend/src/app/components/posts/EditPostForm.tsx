"use client";

import { useState, FormEvent } from "react";
import { updatePost } from "@actions/posts";
import { useRouter } from "next/navigation";
import { Post } from "@lib/interfaces";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { PostSchema } from "@/lib/form-schema";
import { Icon } from "@iconify/react";
import { FormField } from "@/components/ui/field";

export default function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [subtitle, setSubtitle] = useState(post.subtitle);
  const [body, setBody] = useState(post.body);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  async function handlePostUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = {
      title,
      subtitle,
      body,
      id: post.id,
      author_username: post.author_username,
      author_id: post.author_id,
      date: post.date,
      created_at: post.created_at,
      updated_at: post.updated_at,
    };

    const result = PostSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors as Record<
        string,
        string[]
      >;
      setErrors(
        Object.keys(fieldErrors).reduce<Record<string, string>>((acc, key) => {
          acc[key] = fieldErrors[key]?.[0] || "";
          return acc;
        }, {})
      );
      showToast("validationError", toast);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const { data, error } = await updatePost(formData, post.id);
      if (error)
        throw new Error(
          error.message || "An error occurred while updating the post."
        );

      showToast("successPostEdit", toast);
      router.push(`/blog/${data.post.id}`);
    } catch (error) {
      setError(
        "An error occurred while updating the post. Please try again later."
      );
      showToast("genericError", toast);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="dark:bg-gray-900 p-6 max-w-3xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
        Edit Post
      </h2>
      <form
        onSubmit={handlePostUpdate}
        className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            {error}
          </div>
        )}

        {/* Title */}
        <FormField
          label="Post Title"
          id="title"
          label_type="text"
          value={title}
          setValue={setTitle}
          error={errors.title}
        />

        {/* Subtitle */}
        <FormField
          label="Post Subtitle"
          id="subtitle"
          label_type="text"
          value={subtitle}
          setValue={setSubtitle}
          error={errors.subtitle}
        />

        {/* Body */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Post Body
          </label>
          <textarea
            id="body"
            rows={6}
            className="w-full p-3 mt-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
            placeholder="Write your post content..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
          {errors.body && (
            <p className="mt-1 text-red-500 text-sm">{errors.body}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center h-16 px-5 py-3 text-white font-medium text-sm rounded-lg bg-green-600 hover:bg-green-800 transition"
        >
          {loading ? (
            <Icon icon="line-md:loading-loop" className="w-6 h-6" />
          ) : (
            <Icon icon="material-symbols:check-rounded" className="w-9 h-9" />
          )}
        </button>
      </form>
    </section>
  );
}
