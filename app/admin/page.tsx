import TotalReports from '@/components/admin/TotalReports';
import { db } from '@/database/drizzle';
import { books, borrowRecords, users } from '@/database/schema';
import Link from 'next/link';
import { ReactNode } from 'react';
import { desc } from 'drizzle-orm';
import { Book } from '@/types';
import AccountRequests from '@/components/admin/AccountRequests';
import RecentlyAddedBooks from '@/components/admin/RecentlyAddedBooks';

const Container = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) => {
  return (
    <div className="bg-white p-4 rounded-xl space-y-3.5 shadow- shadow-slate-500">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-semibold text-dark-400">{title}</h5>
        <Link
          className="font-semibold text-sm text-primary-admin px-2 py-3 rounded-md bg-light-300"
          href={`/admin/${href}`}
        >
          View all
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

const Admin = async () => {
  const totalReports = [
    {
      title: 'Borrowed Books',
      total: 145,
      status: 'down',
      value: 2,
    },
    {
      title: 'Total Users',
      total: 317,
      status: 'up',
      value: 4,
    },
    {
      title: 'Total Books',
      total: 163,
      status: 'up',
      value: 2,
    },
  ];

  interface AccountRequest {
    fullName: string;
    email: string;
  }

  interface BookRequest {
    id: string;
    userId: string;
    bookId: string;
    borrowDate: Date;
    dueDate: string;
    returnDate: string | null;
    status: 'BORROWED' | 'RETURNED' | 'LATE RETURN';
    createdAt: Date | null;
  }

  let recentBooks: Book[] = [];
  let bookRequests: BookRequest[] = [];
  let accountRequests: AccountRequest[] = [];

  try {
    const [b, bRequest, aRequest] = await Promise.all([
      db.select().from(books).orderBy(desc(books.createdAt)).limit(10),
      db
        .select()
        .from(borrowRecords)
        .orderBy(desc(borrowRecords.createdAt))
        .limit(10),
      db
        .select({ fullName: users.fullName, email: users.email })
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(10),
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
      <TotalReports totalReports={totalReports} />
      <div className="flex flex-wrap flex-col lg:flex-row gap-4">
        <div className="space-y-5 flex-1">
          <Container title="Book Requests" href="borrowed-books">
            <p>dd</p>
          </Container>
          <Container title="Account Requests" href="account-requests">
            <AccountRequests accountRequests={accountRequests} />
          </Container>
        </div>
        <div className="flex-1">
          <Container title="Recently Added Books" href="books">
            <RecentlyAddedBooks recentBooks={recentBooks} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Admin;
