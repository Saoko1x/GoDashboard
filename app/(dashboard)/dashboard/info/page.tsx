import { Metadata } from 'next';
import HeadInfo from '@/components/info/head-info';
import { Breadcrumbs } from '@/components/breadcrumbs';
import TabsInfo from '@/components/info/tabs-info';
import React from 'react';

export const metadata: Metadata = {
  title: 'Info and News'
};

export default function Page() {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Info & News', link: '/dashboard/info' }
  ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadInfo />
        <TabsInfo />
      </div>
    </>
  );
}
