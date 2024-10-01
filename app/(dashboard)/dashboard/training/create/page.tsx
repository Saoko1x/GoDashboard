'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import CardTask from '@/components/training/card-task-training';
import { useSearchParams } from 'next/navigation';
import HeadCreateTraining from '@/components/training/head-create-training';
import React from 'react';

export default function Page({ params }: { params: { week: number } }) {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Training', link: '/dashboard/training' },
    { title: 'Tasks', link: `/dashboard/training/create` }
  ];

  const searchParams = useSearchParams();
  const trainingId = searchParams.get('trainingId');

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadCreateTraining trainingId={trainingId} />
        <CardTask trainingId={trainingId} />
      </div>
    </>
  );
}
