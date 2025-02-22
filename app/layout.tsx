import type { Metadata } from 'next';
import { Bebas_Neue, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

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

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
