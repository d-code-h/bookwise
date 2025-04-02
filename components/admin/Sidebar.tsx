'use client';

import { adminSideBarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Session } from 'next-auth';
import Logout from '../Logout';
import UserAvatar from './UserAvatar';

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <div className="admin-sidebar overflow-auto scrollbar-thin scrollbar-thumb-primary-admin scrollbar-track-gray-200">
      <div>
        <Link href="/">
          <div className="logo">
            <Image
              src="/icons/admin/logo.svg"
              alt="logo"
              width={37}
              height={37}
            />
            <h1>BookWise</h1>
          </div>
        </Link>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== '/admin' &&
                pathname.includes(link.route) &&
                link.route.length > 0) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    'link',
                    isSelected && 'bg-primary-admin shadow-sm',
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected ? ' brightness-0 invert' : ''} object-contain `}
                    />
                  </div>

                  <p className={cn(isSelected ? 'text-white' : 'text-dark')}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user flex-wrap justify-center items-center">
        <UserAvatar name={session?.user?.name as string} />

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
