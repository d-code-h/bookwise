'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book.action';

interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(!isEligible);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast.error('Error', {
        description: <span className="text-red-400">{message}</span>,

        icon: '🚫',
        position: 'top-center',
      });
      return;
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast.success('Success', {
          description: (
            <span className="text-dark-400">Book borrowed successfully</span>
          ),
          icon: '🚀',
          position: 'top-center',
        });

        router.push('/');
      } else {
        toast.error('Error', {
          description: <span className="text-red-400">{result.error}</span>,
          icon: '🚫',
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Error', {
        description: (
          <span className="text-red-400">
            An error occurred while borrowing the book
          </span>
        ),
        icon: '🚫',
        position: 'top-center',
      });
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? 'Borrowing' : 'Borrow Book'}
      </p>
    </Button>
  );
};

export default BorrowBook;
