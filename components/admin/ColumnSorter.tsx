'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Table } from '@tanstack/react-table';

const ColumnSorter = <TData,>({ table }: { table: Table<TData> }) => {
  // Get the "title" column from the table
  const column = table.getColumn('info');
  if (!column) return null; // Ensure the column exists before rendering
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      A-z
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default ColumnSorter;
