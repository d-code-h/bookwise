'use client';
import React, { useState } from 'react';
import ColumnSorter from './ColumnSorter';
import { Button } from '../ui/button';
import Link from 'next/link';
import { DataTable } from './DataTable';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from './Columns';
import { Book } from '@/types';

interface TableProps {
  books: Book[];
}

const TableWrapper = ({ books }: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between mb-5 gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>

        <div className="space-x-5">
          <ColumnSorter table={table} />
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-white">
              + Create a New Book
            </Link>
          </Button>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <DataTable table={table} columns={columns} data={books} />
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TableWrapper;
