import Link from 'next/link';
import Image from 'next/image';
import BookCover from '@/components/BookCover';
import { Book } from '@/types';

const RecentlyAddedBooks = ({ recentBooks }: { recentBooks: Book[] }) => {
  return (
    <>
      <Link
        href="/admin/books/new"
        className="rounded-lg bg-light-300 px-4 py-3.5 flex gap-3.5 items-center"
      >
        <div className="bg-white rounded-full p-3">
          <Image
            src="/icons/admin/add.svg"
            alt="Add new book"
            width={24}
            height={24}
          />
        </div>
        <h5 className="text-lg font-medium tracking-tighter text-dark-400 mt-2 self-center">
          Add New Book
        </h5>
      </Link>
      <div>
        {recentBooks.map((book) => (
          <div
            key={book.id}
            className="flex gap-3.5 items-center p-3.5 rounded-lg"
          >
            <BookCover
              variant="wide"
              className="z-10 w-14 h-[76px]"
              coverColor={book.coverColor}
              coverImage={book.coverUrl}
            />
            {/* </div> */}
            <div>
              <h5 className="font-semibold text-base text-dark-400 tracking-tight">
                {book.title}
              </h5>
              <p className="text-[#64748B] text-sm flex items-center gap-2 mb-1.5 mt-0.5 flex-wrap">
                <span>By {book.author}</span>
                <span className="w-1 h-1 bg-[#8C8E98] rounded-full"></span>
                <span>{book.genre}</span>
              </p>
              <p className="flex gap-0.5 items-center text-xs text-dark-200">
                <Image
                  src="/icons/admin/calendar.svg"
                  alt="created date"
                  width={16}
                  height={16}
                />
                <span>{book.createdAt?.toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentlyAddedBooks;
