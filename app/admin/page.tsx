import TotalReport from '@/components/admin/TotalReport';
import { db } from '@/database/drizzle';
import { books, borrowRecords, users } from '@/database/schema';
import { desc } from 'drizzle-orm';
import { Book, BookRequests } from '@/types';
import AccountRequests from '@/components/admin/AccountRequests';
import BookList from '@/components/admin/BookList';
import { eq } from 'drizzle-orm';
import { Container } from '@/components/admin/Container';

interface AccountRequest {
  fullName: string;
  email: string;
}

const Admin = async () => {
  let recentBooks: Book[] = [];
  let bookRequests: BookRequests[] = [];
  let accountRequests: AccountRequest[] = [];

  try {
    const [b, bRequest, aRequest] = await Promise.all([
      db.select().from(books).orderBy(desc(books.createdAt)).limit(4),
      db
        .select({
          id: borrowRecords.id,
          bookId: books.id,
          userId: users.id,
          status: borrowRecords.status,
          createdAt: borrowRecords.createdAt,
          borrowedDate: borrowRecords.borrowDate,
          returnDate: borrowRecords.returnDate,
          dueDate: borrowRecords.dueDate,

          bookInfo: {
            title: books.title,
            coverUrl: books.coverUrl,
            coverColor: books.coverColor,
            genre: books.genre,
          },
          userInfo: {
            name: users.fullName,
            email: users.email,
          },
        })
        .from(borrowRecords)
        .orderBy(desc(borrowRecords.createdAt))
        .limit(3)
        .innerJoin(books, eq(borrowRecords.bookId, books.id))
        .innerJoin(users, eq(borrowRecords.userId, users.id)),
      db
        .select({ fullName: users.fullName, email: users.email })
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(6),
    ]);

    if (b && b.length > 0) {
      recentBooks = b;
    }
    if (bRequest && bRequest.length > 0) {
      bookRequests = bRequest;
    }
    if (aRequest && aRequest.length > 0) {
      accountRequests = aRequest;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <TotalReport />
      <div className="flex flex-wrap flex-col lg:flex-row gap-4">
        <div className="space-y-5 flex-1">
          <Container title="Book Requests" href="borrow-requests">
            <BookList type="bookRequests" books={bookRequests} />
          </Container>
          <Container title="Account Requests" href="account-requests">
            <AccountRequests accountRequests={accountRequests} />
          </Container>
        </div>
        <div className="flex-1">
          <Container title="Recently Added Books" href="books">
            <BookList type="latestBooks" books={recentBooks} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Admin;
