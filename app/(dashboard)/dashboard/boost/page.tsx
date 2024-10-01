import { Breadcrumbs } from '@/components/breadcrumbs';
import HeadBoost from '@/components/boost/head-boost';
import CardBoost from '@/components/boost/card-boost';
import React from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Boost', link: '/dashboard/boost' }
];

export default function Page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadBoost />
        <CardBoost />
      </div>
    </>
  );
}
