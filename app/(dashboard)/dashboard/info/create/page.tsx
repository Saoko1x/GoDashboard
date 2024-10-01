'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import NewsForm from '@/components/news/newsForm';

import { Heading } from '@/components/ui/heading';

import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Info & News', link: '/dashboard/info' },
  { title: 'Create', link: '/dashboard/info/create' }
];

export default function NewsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-4 flex items-center justify-between">
        <Heading
          title="Create Promotion"
          description="Fill out the form to create a new promotion."
        />
      </div>
      <Separator className="my-4" />
      <NewsForm category={category} />
    </div>
  );
}
