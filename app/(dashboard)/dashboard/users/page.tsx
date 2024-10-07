import { Breadcrumbs } from '@/components/breadcrumbs';
import HeadUsers from '@/components/users/head-users';
import TableUsers from '@/components/users/table-users';
import React from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Users', link: '/dashboard/users' }
];
export default function Page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadUsers />
        <TableUsers />
      </div>
    </>
  );
}
