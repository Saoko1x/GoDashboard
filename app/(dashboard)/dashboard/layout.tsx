import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Go Dashboard',
  description:
    'Go Dashboard is a modern dashboard template for your next project.'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 pt-16">{children}</main>
      </div>
    </>
  );
}
