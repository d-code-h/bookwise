import Image from 'next/image';
import React from 'react';
import BookCover from './BookCover';
import { Book } from '@/types';
import BorrowBook from './BorrowBook';
import { db } from '@/database/drizzle';
import { and, eq } from 'drizzle-orm';
import { borrowRecords, users } from '@/database/schema';

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
}: Props) => {
  let user;
  let isBorrowedBook;

  try {
    const [fetchedUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    user = fetchedUser;
  } catch (error) {
    console.log('Error fetching user:', error);
    return null;
  }

  if (!user) return null;

  try {
    isBorrowedBook = await db
      .select()
      .from(borrowRecords)
      .where(
        and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, id)),
      )
      .limit(1);
  } catch (error) {
    console.log('Error checking borrowed book:', error);
    return null;
  }
  console.log('Info', isBorrowedBook);

  const borrowingEligibility = {
    isEligible:
      availableCopies > 0 &&
      user.status === 'APPROVED' &&
      (isBorrowedBook.length === 0 || isBorrowedBook[0]?.status !== 'BORROWED'),
    message:
      availableCopies <= 0
        ? 'Book is not available'
        : 'You are not eligible to borrow this book',
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{' '}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>

        {user && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
