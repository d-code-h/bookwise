'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Book } from '@/types';
import BookCover from '../BookCover';

interface RowProps {
  title: string;
  coverUrl: string;
  coverColor: string;
}

export const columns: ColumnDef<Book>[] = [
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
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    header: 'Action',
    // cell: ({ row }) => {
    //   const date = new Date(row.getValue('createdAt'));
    //   const formattedDate = date.toLocaleDateString('en-US', {
    //     year: 'numeric',
    //     month: 'short',
    //     day: 'numeric',
    //   });
    //   return <div>{formattedDate}</div>;
    // },
  },
];
