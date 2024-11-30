"use client";
import { useEffect, useState } from "react";
import { fetchPostDetail } from "@/lib/fetch-data";

export default function BlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPostDetail(id);
        setPost(postData);
      } catch (err) {
        setError("Failed to load post data");
        console.log("Error loading post data", err);  
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-600 text-xl">{post.subtitle}</p>
      <p className="mt-2 text-gray-600">{post.body}</p>
      <p className="mt-4 text-sm text-gray-500">
        Written by {post.author} on {post.date}
      </p>
    </div>
  );
}
