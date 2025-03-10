'use client';

import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Session } from 'next-auth';
import { logout } from '@/lib/actions/auth.action';

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              'text-base cursor-pointer capitalize',
              pathname === '/library' ? 'text-light-200' : 'text-light-100',
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href="/my-profile"
            className="flex gap-3 justify-center items-center"
          >
            <Avatar>
              <AvatarFallback className="bg-amber-100 font-semibold">
                {getInitials(session?.user?.name || 'IN')}
              </AvatarFallback>
            </Avatar>
            <span className="text-light-100 font-semibold">
              {session?.user?.name?.split(' ')[0]}
            </span>
          </Link>
        </li>
        <li>
          <form
            action={async () => {
              await logout();
            }}
          >
            <button type="submit" className="flex items-center justify-center">
              <Image
                src="/icons/logout.svg"
                alt="search"
                width={20}
                height={20}
              />
            </button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
