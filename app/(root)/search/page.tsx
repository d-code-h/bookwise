'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Book } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchFilter from '@/components/SearchFilter';
import BookCard from '@/components/BookCard';
import Loader from '@/components/Loader';
import SearchHeader from '@/components/SearchHeader';
import BookPagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // States for books, pagination, genre, and search
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [genre, setGenre] = useState(searchParams.get('genre') || 'All');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [loading, setLoading] = useState(false);

  // Fetch books when search, genre, or page changes
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const result = await fetch(
        `/api/books?search=${search}&genre=${genre}&page=${page}`,
      );
      const data = await result.json();

      setBooks(data.books);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    fetchBooks();
  }, [search, genre, page]);

  // Handle search input (debounced)
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
    router.push(`?search=${value}&genre=${genre}&page=1`);
  };

  // Handle genre selection
  const handleGenreChange = (value: string) => {
    setGenre(value);
    setPage(1);
    router.push(`?search=${search}&genre=${value}&page=1`);
  };

  return (
    <>
      {/* Search Bar */}
      <SearchHeader value={search} onChange={handleSearchChange} />

      <div>
        <section className="flex justify-between">
          <h2 className="font-bebas-neue text-4xl text-light-100">
            {search ? (
              <span>
                Search result for <span className="text-primary">{search}</span>
              </span>
            ) : (
              <span>Search Results</span>
            )}
          </h2>

          {/* Genre Filter */}
          <SearchFilter value={genre} onChange={handleGenreChange} />
        </section>

        {loading ? (
          <Loader />
        ) : books.length > 0 ? (
          <ul className="book-list">
            {books.map((book) => (
              <BookCard key={book.title} {...book} />
            ))}
          </ul>
        ) : (
          <div className="w-full md:w-1/3 mx-auto text-center space-y-6 mt-16">
            <Image
              src="/icons/book-not-found.svg"
              alt="book not found"
              width={200}
              height={200}
              className="mx-auto"
            />

            <section className="text-white text-base space-y-3.5">
              <h4 className="text-base font-semibold">No Results Found</h4>
              <p className="text-xs text-light-100">
                We couldn&apos;t find any books matching your search. Try using
                different keywords or check for typos.
              </p>
            </section>
            <Button
              className="bg-primary text-dark-300 w-full uppercase py-5 px-3.5"
              onClick={() => setSearch('')}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>

      <BookPagination
        search={search}
        genre={genre}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Search;
