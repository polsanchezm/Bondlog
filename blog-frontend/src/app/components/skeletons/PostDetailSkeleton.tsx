import { Skeleton } from "@mui/material";

const BlogPostSkeleton = () => (
  <article className="p-6 flex justify-center">
    <div className="p-6 max-w-3xl w-full bg-white shadow-md rounded-lg">
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={40}
        width="100%"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={30}
        width="80%"
        className="mt-4"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={100}
        width="100%"
        className="mt-4"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={20}
        width="60%"
        className="mt-4"
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={20}
        width="40%"
        className="mt-2"
      />
    </div>
  </article>
);

export default BlogPostSkeleton;
