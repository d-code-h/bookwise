'use client';

import React from 'react';
import { logout } from '@/lib/actions/auth.action';
import Image from 'next/image';

const Logout = () => {
  return (
    <form
      action={async () => {
        await logout();
      }}
    >
      <button type="submit" className="flex items-center justify-center">
        <Image src="/icons/logout.svg" alt="search" width={20} height={20} />
      </button>
    </form>
  );
};

export default Logout;
