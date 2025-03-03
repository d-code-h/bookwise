import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import BookList from '@/components/BookList';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import React from 'react';
import { desc } from 'drizzle-orm';
import { Book } from '@/types';
import { cn } from '@/lib/utils';

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const currentPage = Number((await searchParams).page) || 1;
  const pageSize = 10;
  const offset = (currentPage - 1) * pageSize;

  // Fetch total book count for pagination
  const totalBooks = await db.select({ count: books.id }).from(books);
  const totalCount = totalBooks.length;
  const numberOfPages = Math.ceil(totalCount / pageSize);

  // Fetch paginated books
  const allBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(10)
    .offset(offset)) as Book[];

  return (
    <>
      <BookList title="Search Results" books={allBooks} />

      <Pagination className="text-white">
        <PaginationContent className="ml-auto">
          {/* Previous Button */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className="p-3.5 bg-dark-300 text-white rounded-sm hover:bg-primary/75"
                href={`?page=${currentPage - 1}`}
              />
            </PaginationItem>
          )}

          {/* Page Numbers */}
          {Array.from({ length: numberOfPages }, (_, index) => index + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`?page=${page}`}
                  isActive={page === currentPage}
                  className={cn(
                    'p-3.5 bg-dark-300 text-white rounded-sm hover:bg-primary/75',
                    page === currentPage && 'bg-primary text-dark-300',
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          {/* Next Button */}
          {currentPage < numberOfPages && (
            <PaginationItem>
              <PaginationNext
                className="p-3.5 bg-dark-300 text-white rounded-sm hover:bg-primary/75"
                href={`?page=${currentPage + 1}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default Search;
