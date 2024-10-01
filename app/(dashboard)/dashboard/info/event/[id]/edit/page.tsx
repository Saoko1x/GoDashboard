import { Breadcrumbs } from '@/components/breadcrumbs';
import NewsForm from '@/components/news/newsForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { PrismaClient } from '@prisma/client';

export default async function NewsPageEdit({
  params
}: {
  params: { id: string };
}) {
  const prisma = new PrismaClient();

  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });

  if (!event) {
    return <div>Event not found</div>;
  }
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Info & News', link: '/dashboard/info' },
    { title: 'Edit', link: `/dashboard/info/event/${params.id}/edit` }
  ];
  return (
    <div className="p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-4 flex items-center justify-between">
        <Heading
          title="Edit Promotion"
          description="Edit the promotion information."
        />
      </div>
      <Separator className="my-4" />
      <NewsForm event={event} />
    </div>
  );
}
