import { Session } from 'next-auth';
import React from 'react';
import Search from './Search';

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header items-center">
      <div>
        <h2 className="text-2xl font-semibold text-dark-">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>

      {/* Search bar */}
      <Search />
    </header>
  );
};

export default Header;
