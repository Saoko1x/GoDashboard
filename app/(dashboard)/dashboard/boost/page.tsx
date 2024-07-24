import { Breadcrumbs } from '@/components/breadcrumbs';
import { boosts } from '@/constants/data';
import { BoostTable } from '@/components/tables/boost-tables/boost';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Boost', link: '/dashboard/system' }
];

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <BoostTable data={boosts} />
      </div>
    </>
  );
}
