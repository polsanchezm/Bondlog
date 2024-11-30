"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/interfaces";
import { fetchPosts } from "@/lib/fetch-data";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    loadPosts();
  }, []);

  return (
    <div className="flex justify-center my-10 px-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {posts.map((item) => (
          <div key={item.id}>
            {/* <Image src={item.image} alt={item.title} width={300} height={300} /> */}
            <Link
              href={`/blog/${item.id}`}
              className="block max-w-sm p-6 bg-white rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.subtitle}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.author}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.date}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
