import type { Metadata } from 'next';
import { Bebas_Neue, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: 'normal',
});

const bebasNeue = Bebas_Neue({
  variable: '--bebas-neue',
  subsets: ['latin'],
  weight: ['400'],
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'BookWise',
  description: 'BookWise is a platform for managing your library',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
