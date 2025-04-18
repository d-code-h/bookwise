import Email from '@/components/mails/Email';
import Receipt from '@/components/mails/Receipt';
import { dateConverter } from '@/lib/utils';

export default function PreviewEmail() {
  const fullName = 'John Doe'; // Example data for preview
  const title = 'The Book of Life';
  const borrowedDate = dateConverter(new Date());
  const dueDate = dateConverter(new Date());

  const [
    receiptId,
    issuedDate,
    bookTitle,
    bookAuthor,
    bookGenre,
    bookBorrowedDate,
    bookDueDate,
    bookBorrowedDuration,
  ] = [
    'R12345', // Example receipt ID
    dateConverter(new Date()), // Example issued date
    'The Book of Life', // Example book title
    'Jane Smith', // Example book author
    'Philosophy', // Example book genre
    dateConverter(new Date('2023-01-01')), // Example borrowed date
    dateConverter(new Date('2023-01-15')), // Example due date
    '14 days', // Example borrowed duration
  ];

  return (
    <div className="space-y-10 p-5">
      <Receipt
        receiptId={receiptId}
        issuedDate={issuedDate}
        bookTitle={bookTitle}
        bookAuthor={bookAuthor}
        bookGenre={bookGenre}
        bookBorrowedDate={bookBorrowedDate}
        bookDueDate={bookDueDate}
        bookBorrowedDuration={bookBorrowedDuration}
      />
      <Email type="WELCOME" studentName={fullName} />
      <Email type="APPROVAL" studentName={fullName} />
      <Email
        type="BORROW"
        title={title}
        borrowedDate={borrowedDate}
        dueDate={dueDate}
        studentName={fullName}
      />
      <Email
        type="RECEIPT"
        title={title}
        borrowedDate={borrowedDate}
        dueDate={dueDate}
        studentName={fullName}
      />
      <Email
        type="DUE"
        title={title}
        dueDate={dueDate}
        studentName={fullName}
      />
      <Email type="RETURN" title={title} studentName={fullName} />
      <Email type="CHECKIN" title={title} studentName={fullName} />
      <Email type="INACTIVITY" title={title} studentName={fullName} />
      <Email type="CONGRATS" title={title} studentName={fullName} />
    </div>
  );
}
