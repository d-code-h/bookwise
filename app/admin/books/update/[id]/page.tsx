import BookForm from '@/components/admin/forms/BookForm';
import { Button } from '@/components/ui/button';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';

const UpdateBook = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) return null;
  let book = null;

  try {
    const res = await db.select().from(books).where(eq(books.id, id)).limit(1);

    if (res.length > 0) {
      book = res[0];
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  if (!book) return null;

  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="update" book={book} />
      </section>
    </>
  );
};

export default UpdateBook;
