import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { EmailType } from '@/types';

interface Props {
  type: EmailType;
  studentName: string;
  title?: string;
  borrowedDate?: string;
  dueDate?: string;
}

const Mail = ({ type, studentName, title, borrowedDate, dueDate }: Props) => {
  const content = {
    WELCOME: {
      title: 'Welcome to BookWise, Your Reading Companion!',
      text: "Welcome to BookWise! We're excited to have you join our community of book enthusiasts. Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly.",
      caption: 'Get started by logging in to your account:',
      greetings: 'Happy reading,',
      btn: 'Log in to BookWise',
      href: 'https://bookwise.yunushabeeb.me/sign-in',
    },
    APPROVAL: {
      title: 'Your BookWise Account Has Been Approved!',
      text: 'Congratulations! Your BookWise account has been approved. You can now browse our library, borrow books, and enjoy all the features of your new account.',
      caption: 'Log in to get started:',
      greetings: 'Welcome abroad,',
      btn: 'Log in to BookWise',
      href: 'https://bookwise.yunushabeeb.me/sign-in',
    },
    BORROW: {
      title: 'You&apos;ve Borrowed a Book!',
      text: (
        <>
          You&apos;ve successfully borrowed{' '}
          <span className="text-primary font-bold">{title}</span>. Here are the
          details:
        </>
      ),
      list: [borrowedDate, dueDate],
      caption:
        'Enjoy your reading, and don&apos;t forget to return the book on time!',

      greetings: 'Happy reading,',
      btn: 'View Borrowed Books',
      href: 'https://bookwise.yunushabeeb.me/my-profile',
    },
    DUE: {
      title: `Reminder: ${title} is Due Soon!`,
      text: (
        <>
          Just a reminder that{' '}
          <span className="text-primary font-bold">{title}</span>. is due for
          return on <span className="text-primary font-bold">{dueDate}</span>.
          Kindly return it on time to avoid late fees.
        </>
      ),
      caption:
        'If you&apos;re still reading, you can renew the book in your account.',
      greetings: 'Keep reading,',
      btn: 'Renew Book Now',
      href: 'https://bookwise.yunushabeeb.me/books',
    },
    RECEIPT: {
      title: `Your Receipt for ${title} is Ready!`,
      text: (
        <>
          Your receipt for borrowing
          <span className="text-primary font-bold"> {title} </span>
          has been generated. Here are the details:
        </>
      ),
      list: [borrowedDate, dueDate],

      caption: 'You can download the receipt here:',
      greetings: 'Keep the pages turning,',
      btn: 'Download Receipt',
      href: 'https://bookwise.yunushabeeb.me/sign-in',
    },
    RETURN: {
      title: `Thank You for Returning ${title}!`,
      text: (
        <>
          We&apos;ve successfully received your return of{' '}
          <span className="text-primary font-bold">{title}</span>. Thank you for
          returning it on time.
        </>
      ),

      caption:
        'Looking for your next read? Browse our collection and borrow your next favorite book!',
      greetings: 'Happy exploring,',
      btn: 'Explore New Books',
      href: 'https://bookwise.yunushabeeb.me/books',
    },
    INACTIVITY: {
      title: 'We Miss You at BookWise!',
      text: (
        <>
          It&apos;s been a while since we last saw you—over three days, to be
          exact! New books are waiting for you, and your next great read might
          just be a click away.
        </>
      ),
      caption: 'Come back and explore now:',
      greetings: 'See you soon,',
      btn: 'Explore Books on BookWise',
      href: 'https://bookwise.yunushabeeb.me/books',
    },
    CHECKIN: {
      title: 'Don&apos;t Forget to Check In at BookWise',
      text: (
        <>
          We noticed you haven&apos;t checked in recently. Stay active and keep
          track of your borrowed books, due dates, and new arrivals.,
        </>
      ),

      caption: 'Log in now to stay on top of your reading:',
      greetings: 'Keep the pages turning,',
      btn: 'Log in to BookWise',
      href: 'https://bookwise.yunushabeeb.me/sign-in',
    },
    CONGRATS: {
      title: 'Congratulations on Reaching a New Milestone!',
      text: (
        <>
          Great news! You&apos;ve reached a new milestone in your reading
          journey with BookWise. 🎉 Whether it&apos;s finishing a challenging
          book, staying consistent with your reading goals, or exploring new
          genres, your dedication inspires us.
        </>
      ),

      caption:
        'Keep the momentum going—there are more exciting books and features waiting for you! \n\n\nLog in now to discover your next adventure:',
      greetings: 'Keep the pages turning,',
      btn: 'Discover New Reads',
      href: 'https://bookwise.yunushabeeb.me/books',
    },
  };

  return (
    <div className="text-white w-[640px] bg-[#111624] rounded-lg mx-auto">
      <div className="px-10">
        <div className="flex gap-1.5 border-b border-dark-300 py-12">
          <Image src="/icons/logo.svg" alt="logo" width={40} height={32} />
          <h2 className="font-semibold text-[28px]">BookWise</h2>
        </div>
      </div>
      <div className="mx-12 mt-9 pb-16">
        <h1
          className="font-bold text-2xl mb-6"
          dangerouslySetInnerHTML={{ __html: content[type].title }}
        ></h1>

        <div className="space-y-4 text-lg text-light-100">
          <p>Hi {studentName},</p>
          <p>{content[type].text}</p>

          {(type === 'BORROW' || type === 'RECEIPT') && (
            <ul>
              <li>
                Borrowed On:{' '}
                <span className="text-primary font-bold">
                  {content[type].list[0]}
                </span>
              </li>
              <li>
                Due Date:{' '}
                <span className="text-primary font-bold">
                  {content[type].list[1]}
                </span>
              </li>
            </ul>
          )}

          <p dangerouslySetInnerHTML={{ __html: content[type].caption }}></p>
        </div>

        <Button className="my-6 px-5 py-2.5 h-12 rounded-sm bg-primary text-dark-400 font-semibold text-base">
          <Link href={content[type].href}>{content[type].btn}</Link>
        </Button>

        <div className="text-lg text-light-100">
          <p>{content[type].greetings}</p>
          <p>The Bookwise Team</p>
        </div>
      </div>
    </div>
  );
};

export default Mail;
