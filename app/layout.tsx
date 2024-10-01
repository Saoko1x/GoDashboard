import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';
import { TRPCProvider } from '@/components/trpc-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Go Dashboard',
  description:
    'Go Dashboard is a modern dashboard template for your next project.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <TRPCProvider>
        <body className={`${inter.className}`}>
          <NextTopLoader showSpinner={false} />
          <Providers session={session}>
            <Toaster />
            {children}
          </Providers>
        </body>
      </TRPCProvider>
    </html>
  );
}
