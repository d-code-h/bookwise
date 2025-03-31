import { auth } from '@/auth';
import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { Book } from '@/types';
import { desc } from 'drizzle-orm';

const Home = async () => {
  try {
    const session = await auth();

    const latestBooks = (await db
      .select()
      .from(books)
      .limit(10)
      .orderBy(desc(books.createdAt))) as Book[];

    return (
      <>
        <BookOverview
          {...latestBooks[0]}
          userId={session?.user?.id as string}
        />
        <BookList
          title="Latest Books"
          books={latestBooks.slice(1)}
          containerClassName="mt-28"
        />
      </>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="text-white text-2xl">
        Something went wrong. Please try again later.
      </div>
    );
  }
};

export default Home;
