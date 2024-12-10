import { Skeleton, Card } from "@mui/material";

const PostsSkeleton = () => {
  return (
    <article className="flex justify-center my-10 px-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <Card
              sx={{
                p: 8,
              }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl"
            >
              <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="75%" height={16} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="50%" height={16} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="33%" height={16} />
            </Card>
          </div>
        ))}
      </div>
    </article>
  );
};

export default PostsSkeleton;
