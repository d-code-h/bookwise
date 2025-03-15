'use client';

import React from 'react';
import { Input } from '../ui/input';
import Image from 'next/image';
import { useSearchStore } from '@/store/searchStore';

const Search = () => {
  const setQuery = useSearchStore((state) => state.setQuery);
  return (
    <div className="relative">
      <Input
        className="min-w-[350px] ps-12 pe-3.5 py-4 border-gray-100 text-slate-500 text-base rounded-md focus:border-primary-admin transition-all duration-75 h-12"
        placeholder="Search users, books by title, author, or genre"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Image
        src="/icons/admin/search.svg"
        alt="search"
        width={20}
        height={20}
        className="absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default Search;
