import { Skeleton } from "@/components/ui/skeleton";

export default function PostsSkeleton() {
  return (
    <article className="flex justify-center my-10 px-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <div className="bg-gray-900 text-white dark:bg-gray-800 rounded-lg shadow-xl p-6 h-40 flex flex-col justify-between">
              <Skeleton className="w-2/3 h-6 mb-2" />
              <Skeleton className="w-1/2 h-4 mb-4" />
              <div>
                <Skeleton className="w-1/4 h-4 mb-2" />
                <Skeleton className="w-1/3 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
