import { Skeleton, Typography, Card } from "@mui/material";

const AccountSkeleton = () => {
  return (
    <article className="flex items-center justify-center min-h-screen">
      <Card className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Typography
          variant="h5"
          display="flex"
          justifyContent="center"
          gutterBottom
        >
          <Skeleton width="30%" height={30} />
        </Typography>

        <div className="flex items-center">
          <Skeleton variant="circular" width={64} height={64} />

          <div className="flex flex-col ml-4 w-64">
            <Skeleton variant="text" width="25%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="50%" height={16} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="75%" height={16} sx={{ mb: 1 }} />
          </div>
        </div>

        <div className="mt-4">
          <Skeleton variant="rectangular" width="100%" height={44} />
        </div>
      </Card>
    </article>
  );
};

export default AccountSkeleton;
