import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { eq, and, ilike, desc, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('search') || '';
  const genre = searchParams.get('genre') || '';
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  // Build the query dynamically
  let conditions = [];
  if (search) conditions.push(ilike(books.title, `%${search}%`));
  if (genre !== 'All') conditions.push(eq(books.genre, genre));

  // Fetch books with filters
  const filteredBooks = await db
    .select()
    .from(books)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(books.createdAt))
    .limit(pageSize)
    .offset(offset);

  // Get total count for pagination
  const [{ count }] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(books)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return NextResponse.json({
    books: filteredBooks,
    totalPages: Math.ceil(count / pageSize),
  });
};
