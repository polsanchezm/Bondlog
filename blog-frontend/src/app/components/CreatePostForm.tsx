"use client";

import { createPost } from "@/app/lib/fetch-data";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreatePostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  async function handlePostCreation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      title,
      subtitle,
      body,
      id: "",
      authorName: "",
      authorId: "",
      date: "",
      created_at: "",
      updated_at: "",
    };

    try {
      const response = await createPost(formData);
      router.push(`/blog/${response.post.id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          New post
        </h2>
        <form onSubmit={handlePostCreation}>
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
                required
              />
            </div>
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
                required
              />
            </div>
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
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create post
          </button>
        </form>
      </div>
    </section>
  );
}
