import { Breadcrumbs } from '@/components/breadcrumbs';
import CardSystem from '@/components/system/card-system';
import HeadSytem from '@/components/system/head-system';
import React from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'System', link: '/dashboard/system' }
];
export default function Page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadSytem />
        <CardSystem />
      </div>
    </>
  );
}
