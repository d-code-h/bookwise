import TableWrapper from '@/components/admin/TableWrapper';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import type { AccountRequests } from '@/types';
import React from 'react';

const AccountRequests = async () => {
  const allRequests = (await db
    .select({
      id: users.id,
      info: {
        name: users.fullName,
        email: users.email,
      },
      universityId: users.universityId,
      role: users.role,
      dateJoined: users.createdAt,
      universityCard: users.universityCard,
    })
    .from(users)) as AccountRequests[];

  return (
    <div>
      <TableWrapper data={allRequests} type="AccountRequests" />
    </div>
  );
};

export default AccountRequests;
