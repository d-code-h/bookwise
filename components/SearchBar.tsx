import { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  type: 'text';
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  containerClassName: string;
}

const SearchBar = ({
  type,
  placeholder,
  value,
  onChange,
  containerClassName,
}: Props) => {
  return (
    <div className="relative">
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(containerClassName || '')}
      />
      <Image
        className="absolute top-5 left-3"
        src="/icons/search-fill.svg"
        alt="search"
        width={26}
        height={26}
      />
    </div>
  );
};

export default SearchBar;
