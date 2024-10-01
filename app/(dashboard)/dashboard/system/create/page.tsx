'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import CardTask from '@/components/system/card-task-system';
import { useSearchParams } from 'next/navigation';
import HeadCreateSystem from '@/components/system/head-create-system';
import React from 'react';

export default function Page({ params }: { params: { week: number } }) {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'System', link: '/dashboard/system' },
    { title: 'Tasks', link: `/dashboard/system/` }
  ];

  const searchParams = useSearchParams();
  const weekId = searchParams.get('weekId');

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadCreateSystem weekId={weekId} />
        <CardTask weekId={weekId} />
      </div>
    </>
  );
}
