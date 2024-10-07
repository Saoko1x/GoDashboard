import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';
import { TRPCProvider } from '@/components/trpc-provider';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '../app/api/uploadthing/core';

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
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
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
