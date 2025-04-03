import React from 'react';
import Image from 'next/image';

interface Props {
  receiptId: string;
  issuedDate: string;
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
  bookBorrowedDate: string;
  bookDueDate: string;
  bookBorrowedDuration: string;
}

const Receipt = ({
  receiptId,
  issuedDate,
  bookTitle,
  bookAuthor,
  bookGenre,
  bookBorrowedDate,
  bookDueDate,
  bookBorrowedDuration,
}: Props) => {
  return (
    <div className="w-[595px] bg-[#111624] mx-auto p-6">
      <div className="bg-dark-300 rounded-t-lg p-8 relative">
        <div className="flex gap-1.5 border-b border-dark-300 py-12">
          <Image src="/icons/logo.svg" alt="logo" width={40} height={32} />
          <h2 className="font-semibold text-white text-[28px]">BookWise</h2>
        </div>
        <div className="space-y-6">
          <section className="pb-6 border-b border-light-100 space-y-2">
            <h2 className="font-bold text-2xl text-white">Borrow Receipt</h2>
            <p className="text-base text-light-100">
              Receipt ID:{' '}
              <span className="font-bold text-primary">{receiptId}</span>
            </p>
            <p className="text-base text-light-100">
              Date Issued:{' '}
              <span className="font-bold text-primary">{issuedDate}</span>
            </p>
          </section>
          <section className="pb-6 border-b border-light-100">
            <h3 className="font-bold text-lg text-white">Book Details:</h3>
            <ul className="list-disc list-inside">
              <li className="text-base text-light-100">
                <span>Title: </span>
                <span className="font-bold text-white">{bookTitle}</span>
              </li>
              <li className="text-base text-light-100">
                <span>Author: </span>
                <span className="font-bold text-white">{bookAuthor}</span>
              </li>
              <li className="text-base text-light-100">
                <span>Genre: </span>
                <span className="font-bold text-white">{bookGenre}</span>
              </li>
              <li className="text-base text-light-100">
                <span>Borrowed On: </span>
                <span className="font-bold text-white">{bookBorrowedDate}</span>
              </li>
              <li className="text-base text-light-100">
                <span>Due Date: </span>
                <span className="font-bold text-white">{bookDueDate}</span>
              </li>
              <li className="text-base text-light-100">
                <span>Duration:</span>
                <span className="font-bold text-white">
                  {bookBorrowedDuration}
                </span>
              </li>
            </ul>
          </section>
          <section className="pb-6 border-b border-light-100">
            <h3 className="font-bold text-lg text-white">Book Terms</h3>
            <ul className="list-disc list-inside">
              <li className="text-base text-light-100">
                Please return the book by the due date.
              </li>
              <li className="text-base text-light-100">
                Lost or damaged books may incu replacement costs.
              </li>
            </ul>
          </section>
          <div className="pb-6">
            <p className="text-base text-light-100">
              <span>Thank you for using </span>
              <span className="font-bold text-white">BookWise!</span>
            </p>
            <p className="text-base text-light-100">
              <span>Website: </span>
              <span className="font-bold text-white">
                bookwise.yunushabeeb.me
              </span>
            </p>
            <p className="text-base text-light-100">
              <span>Email: </span>
              <span className="font-bold text-white">
                support@bookwise.yunushabeeb.me
              </span>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-3 w-full flex justify-between">
          {Array.from({ length: 13 }).map((_, index) => (
            <div
              key={index}
              className="w-6 h-3 bg-[#111624] rounded-t-full"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Receipt;
