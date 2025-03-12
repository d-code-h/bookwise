import TableWrapper from '@/components/admin/TableWrapper';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import React from 'react';

const Books = async () => {
  // Fetch all books from DB
  const allBooks = await db
    .select({
      id: books.id,
      info: {
        title: books.title,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
      },
      author: books.author,
      genre: books.genre,

      createdAt: books.createdAt,
    })
    .from(books);
  return <TableWrapper books={allBooks} />;
};

export default Books;
