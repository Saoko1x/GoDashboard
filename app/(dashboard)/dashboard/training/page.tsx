import { Breadcrumbs } from '@/components/breadcrumbs';
import HeadTraining from '@/components/training/head-training';
import CardTraining from '@/components/training/card-training';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Training', link: '/dashboard/training' }
];

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <HeadTraining />
        <CardTraining />
      </div>
    </>
  );
}
