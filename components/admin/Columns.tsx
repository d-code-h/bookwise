'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TableBook, TableUser } from '@/types';
import BookCover from '../BookCover';
import Image from 'next/image';
import { dateConverter } from '@/lib/utils';
import UserAvatar from './UserAvatar';
import config from '@/lib/config';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

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
              className="flex justify-between"
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
            <DropdownMenuItem onClick={() => handleRoleChange('ADMIN')}>
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
