import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserClient } from '@/components/tables/system-tables/client';
import { weeks } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'System', link: '/dashboard/system' }
];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={weeks} />
      </div>
    </>
  );
}
