import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScreenForm } from '@/components/forms/screen-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'System', link: '/dashboard/system' },
  { title: 'Create', link: '/dashboard/system/create' }
];
export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        <ScreenForm
          categories={[
            { _id: 'video', name: 'video' },
            { _id: 'audio', name: 'audio' },
            { _id: 'image', name: 'image' },
            { _id: 'text', name: 'text' },
            { _id: 'file', name: 'file' },
            { _id: 'other', name: 'other' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}