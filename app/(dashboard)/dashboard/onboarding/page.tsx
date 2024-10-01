import { Breadcrumbs } from '@/components/breadcrumbs';
import HeadOnboarding from '@/components/onboarding/head-onboarding';
import FormOnboarding from '@/components/onboarding/form-onboarding';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Onboarding', link: '/dashboard/onboarding' }
  ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadOnboarding />
        <FormOnboarding />
      </div>
    </>
  );
}
