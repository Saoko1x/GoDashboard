import { Breadcrumbs } from '@/components/breadcrumbs';
import { trains } from '@/constants/data';
import { TrainTable } from '@/components/tables/training-tables/train';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Training', link: '/dashboard/training' }
];

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <TrainTable data={trains} />
      </div>
    </>
  );
}
