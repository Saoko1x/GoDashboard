import { Breadcrumbs } from '@/components/breadcrumbs';
import FormProfile from '@/components/profile/form-profile';
import HeadProfile from '@/components/profile/head-profile';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Profile', link: '/dashboard/profile' }
];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadProfile />
        <FormProfile />
      </div>
    </>
  );
}
