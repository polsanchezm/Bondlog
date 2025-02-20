import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { PaginationType } from "@/lib/interfaces";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export const CommentPaginationComponent = ({
  pagination,
  onPageChange,
}: PaginationComponentProps) => {
  return (
    <div className="flex justify-center w-full mb-24">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {pagination.prev_page_url && (
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => onPageChange(pagination.current_page - 1)}
              >
                <SquareChevronLeft />
              </PaginationPrevious>
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="select-none">
              {pagination.current_page}
            </PaginationLink>
          </PaginationItem>
          {pagination.next_page_url && (
            <PaginationNext
              className="cursor-pointer"
              onClick={() => onPageChange(pagination.current_page + 1)}
            >
              <SquareChevronRight />
            </PaginationNext>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
