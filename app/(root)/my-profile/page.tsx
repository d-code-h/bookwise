import { auth } from '@/auth';
import BorrowedBooksList from '@/components/BorrowedBooksList';
import UserProfile from '@/components/UserProfile';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

const MyProfile = async () => {
  const session = await auth();

  if (!session?.user?.id) redirect('/sign-in');

  const [userInfo] = await db
    .select({
      fullName: users.fullName,
      email: users.email,
      universityId: users.universityId,
      universityCard: users.universityCard,
      status: users.status,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session?.user?.id))
    .limit(1);

  if (!userInfo) redirect('/');

  return (
    <div className="flex flex-col md:pt-10 md:flex-row gap-8 md:gap-20">
      {/* User Profile */}
      <UserProfile {...userInfo} />

      {/* Borrowed books */}
      <BorrowedBooksList />
    </div>
  );
};

export default MyProfile;
