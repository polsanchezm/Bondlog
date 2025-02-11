import { Skeleton } from "@/components/ui/skeleton";

export default function PostDetailSkeleton() {
  return (
    <article className="p-6 mt-8 flex justify-center mb-20">
      <div className="p-12 max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {/* Título del post */}
        <div className="flex flex-row justify-between items-center mb-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
        </div>

        <div className="prose dark:prose-dark text-sm text-gray-500 dark:text-gray-400 mb-4">
          {/* Última actualización */}
          <Skeleton className="h-4 w-1/3 mb-2" />
        </div>

        {/* Contenido del post */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-5/6 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />

        {/* Autor */}
        <div className="flex flex-col sm:flex-row justify-between text-sm">
          <Skeleton className="h-4 w-1/4 mb-4" />

          {/* Fecha */}
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </article>
  );
}
