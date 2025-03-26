'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AccountRequests, BookRequests, TableBook, TableUser } from '@/types';
import BookCover from '../BookCover';
import Image from 'next/image';
import { cn, dateConverter } from '@/lib/utils';
import UserAvatar from './UserAvatar';
import config from '@/lib/config';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  accountApproval,
  cancelAccountApproval,
} from '@/lib/admin/actions/users.action';
import { useBookStatusStore } from '@/store/bookStatusStore';

interface RowProps {
  title: string;
  coverUrl: string;
  coverColor: string;
}

const {
  env: {
    imagekit: { urlEndpoint },
  },
} = config;

export const booksColumns: ColumnDef<TableBook>[] = [
  {
    accessorKey: 'info',
    header: 'Book Title',
    cell: ({ row }) => {
      const { title, coverUrl, coverColor }: RowProps = row.getValue('info');
      return (
        <div className="flex flex-row gap-1.5 items-center">
          <BookCover
            coverColor={coverColor}
            coverImage={coverUrl}
            width={true}
            height={true}
          />
          <h5 className="text-sm font-semibold">{title}</h5>
        </div>
      );
    },
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    accessorKey: 'genre',
    header: 'Genre',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = dateConverter(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="flex gap-4 justify-center items-center">
          <Image
            src="/icons/admin/edit.svg"
            alt="Edit"
            width={20}
            height={20}
          />
          <Image
            src="/icons/admin/trash.svg"
            alt="Edit"
            width={20}
            height={20}
          />
        </div>
      );
    },
  },
];

export const usersColumns: ColumnDef<TableUser>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'info',
    header: 'Name',
    cell: ({ row }) => {
      const {
        name,
        email,
      }: {
        name: string;
        email: string;
      } = row.getValue('info');
      return (
        <div className="flex flex-row gap-2 items-center">
          <UserAvatar name={name as string} />

          <div className="text-sm flex flex-col">
            <h5 className="font-semibold">{name}</h5>
            <p className="text-[#64748B]">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'dateJoined',
    header: 'Date Joined',
    cell: ({ row }) => {
      const date = row.getValue('dateJoined') as Date;
      return <div>{dateConverter(date)}</div>;
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const [userRole, setUserRole] = useState<string>(row.getValue('role'));
      const userId = row.getValue('id');

      const handleRoleChange = async (newRole: string) => {
        const result = await fetch('/api/users/update-role', {
          method: 'POST',
          body: JSON.stringify({
            userId,
            newRole,
          }),
        });
        if (result.ok) {
          setUserRole(newRole);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <span
                className={`${userRole === 'USER' ? 'text-pink-700 bg-pink-50' : 'text-green-700 bg-green-50'} py-0.5 px-2.5 rounded-2xl font-medium text-sm`}
              >
                {userRole}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex justify-between p-2"
              onClick={() => handleRoleChange('USER')}
            >
              <span className="text-pink-700 py-0.5 px-2.5 bg-pink-50 rounded-2xl font-medium text-sm">
                User
              </span>
              {userRole === 'USER' && (
                <Image
                  src="/icons/admin/tick.svg"
                  alt="selected role"
                  width={20}
                  height={20}
                />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-between p-2"
              onClick={() => handleRoleChange('ADMIN')}
            >
              <span className="text-green-700 py-0.5 px-2.5 bg-green-50 rounded-2xl font-medium text-sm">
                Admin
              </span>

              {userRole === 'ADMIN' && (
                <Image
                  src="/icons/admin/tick.svg"
                  alt="selected role"
                  width={20}
                  height={20}
                />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'booksBorrowed',
    header: 'Books Borrowed',
  },
  {
    accessorKey: 'universityId',
    header: 'University ID No',
  },
  {
    accessorKey: 'universityCard',
    header: 'University ID Card',
    cell: ({ row }) => {
      const cardUrl = row.getValue('universityCard') as string;

      return (
        <a
          className="flex flex-row flex-wrap gap-1.5"
          href={`${urlEndpoint}${cardUrl}`}
          target="_blank"
        >
          <span className="text-blue-100 text-sm font-medium">
            View ID Card
          </span>
          <Image
            src="/icons/admin/external.svg"
            alt="id card"
            width={14}
            height={14}
          />
        </a>
      );
    },
  },

  {
    header: 'Action',
    cell: () => {
      return (
        <div className="flex gap-4 justify-center items-center">
          <Image
            src="/icons/admin/trash.svg"
            alt="Edit"
            width={20}
            height={20}
          />
        </div>
      );
    },
  },
];
export const AccountsColumns: ColumnDef<AccountRequests>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'info',
    header: 'Name',
    cell: ({ row }) => {
      const {
        name,
        email,
      }: {
        name: string;
        email: string;
      } = row.getValue('info');
      return (
        <div className="flex flex-row gap-2 items-center">
          <UserAvatar name={name as string} />

          <div className="text-sm flex flex-col">
            <h5 className="font-semibold">{name}</h5>
            <p className="text-[#64748B]">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'dateJoined',
    header: 'Date Joined',
    cell: ({ row }) => {
      const date = row.getValue('dateJoined') as Date;
      return <div>{dateConverter(date)}</div>;
    },
  },

  {
    accessorKey: 'universityId',
    header: 'University ID No',
  },
  {
    accessorKey: 'universityCard',
    header: 'University ID Card',
    cell: ({ row }) => {
      const cardUrl = row.getValue('universityCard') as string;

      return (
        <a
          className="flex flex-row flex-wrap gap-1.5"
          href={`${urlEndpoint}${cardUrl}`}
          target="_blank"
        >
          <span className="text-blue-100 text-sm font-medium">
            View ID Card
          </span>
          <Image
            src="/icons/admin/external.svg"
            alt="id card"
            width={14}
            height={14}
          />
        </a>
      );
    },
  },

  {
    header: 'Actions',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      const [status, setStatus] = useState(row.original.status);

      const handleApproval = async () => {
        if (status === 'APPROVED') {
          await cancelAccountApproval(id);
          setStatus('REJECTED');
        } else {
          await accountApproval(id);
          setStatus('APPROVED');
        }
      };

      return (
        <div className="flex flex-wrap gap-1 lg:gap-5">
          <Button
            className="px-2 py-3  rounded-md shadow-none text-green bg-green-100"
            disabled={status === 'APPROVED'}
            onClick={handleApproval}
          >
            Approve Account
          </Button>
          <Button
            variant="ghost"
            disabled={status === 'REJECTED'}
            onClick={handleApproval}
          >
            <Image
              src="/icons/admin/cancel.svg"
              alt="Cancel"
              width={20}
              height={20}
            />
          </Button>
        </div>
      );
    },
  },
];
export const bookRequestsColumns: ColumnDef<BookRequests>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'bookInfo',
    header: 'Book',
    cell: ({ row }) => {
      const { title, coverUrl, coverColor }: RowProps =
        row.getValue('bookInfo');
      return (
        <div className="flex flex-row gap-1.5 items-center">
          <BookCover
            coverColor={coverColor}
            coverImage={coverUrl}
            width={true}
            height={true}
          />
          <h5 className="text-sm font-semibold">{title}</h5>
        </div>
      );
    },
  },
  {
    accessorKey: 'userInfo',
    header: 'User Requested',
    cell: ({ row }) => {
      const {
        name,
        email,
      }: {
        name: string;
        email: string;
      } = row.getValue('userInfo');
      return (
        <div className="flex flex-row gap-2 items-center">
          <UserAvatar name={name as string} />

          <div className="text-sm flex flex-col">
            <h5 className="font-semibold">{name}</h5>
            <p className="text-[#64748B]">{email}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const borrowedId = row.getValue('id') as string;
      const status = row.getValue('status') as
        | 'BORROWED'
        | 'RETURNED'
        | 'LATE RETURN';

      let bookStatus = useBookStatusStore(
        (state) => state.bookStatuses[borrowedId]?.status,
      );
      const setBookStatusStore = useBookStatusStore(
        (state) => state.updateStatus,
      );

      if (!bookStatus) {
        setBookStatusStore({ borrowedId, status, returnDate: null });
        bookStatus =
          useBookStatusStore.getState().bookStatuses[borrowedId].status;
      }

      const handleStatusChange = async (
        newStatus: 'BORROWED' | 'RETURNED' | 'LATE RETURN',
      ) => {
        const returnDate =
          newStatus === 'RETURNED' || newStatus === 'LATE RETURN'
            ? new Date()
            : null;
        const result = await fetch('/api/books/update-status', {
          method: 'POST',
          body: JSON.stringify({
            borrowedId,
            newStatus,
            returnDate,
          }),
        });
        if (result.ok) {
          setBookStatusStore({ borrowedId, status: newStatus, returnDate });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <span
                className={`${
                  bookStatus === 'BORROWED'
                    ? 'text-purple-700 bg-purple-50'
                    : bookStatus === 'RETURNED'
                      ? 'text-green-700 bg-green-50'
                      : 'text-red-700 bg-red-50'
                } py-0.5 px-2.5 rounded-2xl font-medium text-sm`}
              >
                {bookStatus[0] + bookStatus.slice(1).toLowerCase()}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex justify-between p-2"
              onClick={() => handleStatusChange('BORROWED')}
            >
              <span className="text-purple-700 py-0.5 px-2.5 bg-purple-50 rounded-2xl font-medium text-sm">
                Borrowed
              </span>
              {bookStatus === 'BORROWED' && (
                <Image
                  src="/icons/admin/tick.svg"
                  alt="selected status"
                  width={20}
                  height={20}
                />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusChange('RETURNED')}
              className="flex justify-between p-2"
            >
              <span className="text-green-700 py-0.5 px-2.5 bg-green-50 rounded-2xl font-medium text-sm">
                Returned
              </span>

              {bookStatus === 'RETURNED' && (
                <Image
                  src="/icons/admin/tick.svg"
                  alt="selected status"
                  width={20}
                  height={20}
                />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusChange('LATE RETURN')}
              className="flex justify-between p-2"
            >
              <span className="text-red-700 py-0.5 px-2.5 bg-red-50 rounded-2xl font-medium text-sm">
                Late Return
              </span>

              {bookStatus === 'LATE RETURN' && (
                <Image
                  src="/icons/admin/tick.svg"
                  alt="selected status"
                  width={20}
                  height={20}
                />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'borrowedDate',
    header: 'Borrowed date',
    cell: ({ row }) => {
      const date = row.getValue('borrowedDate') as Date;
      return <div>{dateConverter(date)}</div>;
    },
  },
  {
    accessorKey: 'returnDate',
    header: 'Return date',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;

      const returnDate = useBookStatusStore(
        (state) => state.bookStatuses[id]?.returnDate,
      );

      return (
        <div>{!returnDate ? '-' : dateConverter(new Date(returnDate))}</div>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due date',
    cell: ({ row }) => {
      const date = row.getValue('dueDate') as Date;
      return <div>{dateConverter(new Date(date))}</div>;
    },
  },

  {
    header: 'Receipt',
    cell: ({ row }) => {
      const id: string = row.getValue('id');

      const bookStatus = useBookStatusStore(
        (state) => state.bookStatuses[id].status,
      );
      const isDisabled = bookStatus !== 'BORROWED';

      const generateReceipt = async () => {};

      return (
        <div className="flex flex-wrap gap-1">
          <Button
            className="px-2 py-3  rounded-md shadow-none text-primary-admin bg-light-300"
            disabled={isDisabled}
            onClick={generateReceipt}
          >
            <Image
              src="/icons/admin/receipt.svg"
              alt="Receipt"
              width={16}
              height={16}
            />
            <span>Generate</span>
          </Button>
        </div>
      );
    },
  },
];
