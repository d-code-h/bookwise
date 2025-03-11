'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Props {
  search: string;
  genre: string;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

const BookPagination = ({
  search,
  genre,
  totalPages,
  page,
  setPage,
}: Props) => {
  const router = useRouter();
  if (totalPages > 1) {
    return (
      <Pagination className="text-white">
        <PaginationContent className="ml-auto">
          {/* Previous Button */}
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                as="button"
                onClick={() => {
                  setPage(page - 1);

                  router.push(
                    `?search=${search}&genre=${genre}&page=${page - 1}`,
                    { scroll: false },
                  );
                }}
                className="p-3.5 bg-dark-300 text-white rounded-sm hover:bg-primary/75"
              />
            </PaginationItem>
          )}

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                as="button"
                isActive={page === index + 1}
                onClick={() => {
                  setPage(index + 1);
                  router.push(
                    `?search=${search}&genre=${genre}&page=${index + 1}`,
                    { scroll: false },
                  );
                }}
                className={cn(
                  'p-3.5 bg-dark-300 text-white rounded-sm hover:bg-primary/75',
                  index + 1 === page && 'bg-primary text-dark-300',
                )}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Button */}
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext
                as="button"
                onClick={() => {
                  setPage(page + 1);
                  router.push(
                    `?search=${search}&genre=${genre}&page=${page + 1}`,
                    { scroll: false },
                  );
                }}
                className="p-3.5 bg-dark-300 text-white rounded-sm hover:bg-primary/75"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  }
};

export default BookPagination;
