import { fetchPostDetail } from "@/lib/fetch-data";

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await fetchPostDetail(params.id);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-600 text-xl">{post.subtitle}</p>
      <p className="mt-2 text-gray-600">{post.body}</p>
      <p className="mt-4 text-sm text-gray-500">
        Written by {post.author} on {post.date}
      </p>
      {/* <p className="mt-4 text-sm text-gray-500">Comentarios</p>
      {post.comments.map((comment, index) => (
        <div key={index}>
          <p className="mt-4 text-sm text-gray-500">
            {comment.author}
            <p className="mt-2 text-gray-600">{comment.content}</p>
            {comment.date}
          </p>
        </div>
      ))} */}
    </div>
  );
}
