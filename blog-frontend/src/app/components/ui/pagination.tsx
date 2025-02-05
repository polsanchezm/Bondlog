import { PaginationProps } from "@/lib/interfaces";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export const Pagination = ({ pagination }: { pagination: PaginationProps }) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <div className="flex justify-center w-full mb-24">
      <button
        onClick={() => handlePageChange(pagination.current_page - 1)}
        disabled={!pagination.prev_page_url}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md disabled:opacity-50"
      >
        <Icon
          icon="material-symbols:arrow-left-rounded"
          width="24"
          height="24"
        />
      </button>

      <span className="px-4 py-2 text-lg font-semibold">
        {pagination.current_page}
      </span>

      <button
        onClick={() => handlePageChange(pagination.current_page + 1)}
        disabled={!pagination.next_page_url}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md disabled:opacity-50"
      >
        <Icon
          icon="material-symbols:arrow-right-rounded"
          width="24"
          height="24"
        />
      </button>
    </div>
  );
};
