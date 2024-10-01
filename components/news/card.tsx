import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Link1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import Link from 'next/link';
import DialogEditInfo from '@/components/info/dialog-edit-info';
import { trpc } from '@/server/client';

export default function ActiveCard({
  title,
  imageUrl,
  eventUrl,
  date,
  id,
  category
}: {
  title: string;
  imageUrl: string;
  eventUrl: string;
  date: Date;
  id: number;
  category: number;
}) {
  const localizedDate = date.toLocaleString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const { refetch } = trpc.info.get.useQuery();
  const handleUpdate = () => {
    refetch();
  };

  const deleteEvent = trpc.info.delete.useMutation();

  const deleteExistingEvent = () => {
    try {
      deleteEvent.mutate(
        {
          id: id
        },
        {
          onSuccess: () => {
            refetch();
          }
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log('done');
    }
  };
  return (
    <Card key={id} className="group/item relative">
      <Image
        src={imageUrl}
        alt="Hero"
        className="h-48 w-full rounded-t-lg"
        width={200}
        height={200}
      />
      <div className="absolute inset-0 bg-opacity-50 group-hover/item:backdrop-blur-sm">
        {/* Contenedor para los íconos centrados */}
        <div className="flex h-full items-center justify-center">
          <div className="group/edit invisible flex gap-4 group-hover/item:visible">
            <DialogEditInfo
              title={title}
              imageUrl={imageUrl}
              eventUrl={eventUrl}
              date={date}
              id={id}
              category={category}
              onUpdate={handleUpdate}
            />

            <Link href={eventUrl} target="_blank">
              <Button className="gap-2">
                <Link1Icon className="h-4 w-4" />
                Watch event
              </Button>
            </Link>
          </div>
        </div>

        {/* Botón de "delete" en la esquina inferior derecha */}
        <div className="group/edit invisible absolute bottom-2 right-2 group-hover/item:visible">
          <Button
            className="gap-2"
            variant={'ghost'}
            onClick={deleteExistingEvent}
          >
            <TrashIcon className="h-6 w-6 text-red-500" />
          </Button>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="text-lg font-bold">{localizedDate}</div>
        <p className="text-xs text-muted-foreground">
          {date.toISOString().slice(11, 16)}
        </p>
      </CardContent>
    </Card>
  );
}
