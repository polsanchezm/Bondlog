import { Skeleton } from "@mui/material";

const BlogPostSkeleton = () => (
  <article className="p-6 flex justify-center">
    <div className="p-6 max-w-3xl w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <Skeleton
        variant="rectangular"
        height={40}
        width="100%"
        className="mb-4"
      />

      <Skeleton
        variant="rectangular"
        height={30}
        width="80%"
        className="mb-4"
      />

      <Skeleton
        variant="rectangular"
        height={150}
        width="100%"
        className="mb-4"
      />

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <Skeleton variant="rectangular" height={20} width="30%" />
        <Skeleton variant="rectangular" height={20} width="20%" />
      </div>
    </div>
  </article>
);

export default BlogPostSkeleton;
