import React, { ChangeEvent } from 'react';
import SearchBar from './SearchBar';

const SearchHeader = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <header className="w-full md:w-3/6 mx-auto flex flex-col gap-8 mb-16">
      <hgroup className="text-center space-y-3.5 font-semibold">
        <h4 className="text-light-100 uppercase text-sm ">
          Discover your next great read:
        </h4>
        <h2 className="text-2xl text-light-100 md:text-6xl">
          Explore and Search for
          <span className="text-primary"> Any Book </span>
          In Our Library
        </h2>
      </hgroup>
      <SearchBar
        type="text"
        placeholder="Search books..."
        value={value}
        onChange={onChange}
        containerClassName="w-full p-8 text-sm ps-12 bg-dark-300 text-white font-semibold border-none caret-primary focus:shadow-sm focus:shadow-primary"
      />
    </header>
  );
};

export default SearchHeader;
