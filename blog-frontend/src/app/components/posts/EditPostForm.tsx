"use client";

import { useState, FormEvent } from "react";
import { updatePost } from "@actions/posts";
import { useRouter } from "next/navigation";
import { Post } from "@lib/interfaces";
import { useToast } from "@/components/hooks/use-toast";
import { showToast } from "@/utils/utils";
import { PostSchema } from "@/lib/form-schema";

export default function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [subtitle, setSubtitle] = useState(post.subtitle);
  const [body, setBody] = useState(post.body);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const router = useRouter();

  async function handlePostUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

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
      return;
    }

    setErrors({});

    try {
      const { data, error } = await updatePost(formData, post.id);

      if (error) {
        throw new Error(
          error.message ||
            "An error occurred while creating the post. Please try again later."
        );
      }
      showToast("successPostEdit", toast);

      router.push(`/blog/${data.post.id}`);
    } catch (error: unknown) {
      setError(
        "An error occurred while creating the post. Please try again later."
      );
      if (error instanceof Error) {
        showToast("genericError", toast);
        console.error("Error:", error);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  }

  return (
    <form onSubmit={handlePostUpdate}>
      {error && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          {error}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Post title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type post title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        <div className="sm:col-span-2">
          <label
            htmlFor="subtitle"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Post subtitle
          </label>
          <input
            type="text"
            name="subtitle"
            id="subtitle"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type post subtitle"
            onChange={(e) => setSubtitle(e.target.value)}
            value={subtitle}
            required
          />
        </div>
        {errors.subtitle && (
          <p className="text-red-500 text-sm">{errors.subtitle}</p>
        )}
        <div className="sm:col-span-2">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Post body
          </label>
          <textarea
            id="body"
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type post body"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </div>
        {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Edit post
      </button>
    </form>
  );
}
