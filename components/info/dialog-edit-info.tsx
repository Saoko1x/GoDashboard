import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trpc } from '@/server/client';
import { Button } from '../ui/button';
import { useState } from 'react';
import { PencilIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Component({
  title,
  imageUrl,
  eventUrl,
  date,
  id,
  category,
  onUpdate
}: {
  title: string;
  imageUrl: string;
  eventUrl: string;
  date: Date;
  id: number;
  category: number;
  onUpdate: () => void;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);
  const [titles, setTitle] = useState<string>(title);
  const [imageUrls, setImageUrl] = useState<string>(imageUrl);
  const [eventUrls, setEventUrl] = useState<string>(eventUrl);
  const [dates, setDate] = useState<string>(date.toString());
  const [isOpen, setIsOpen] = useState(false);

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Obtén "YYYY-MM-DDTHH:MM"
  };

  const categories: { [key: number]: string } = {
    1: 'event',
    2: 'news',
    3: 'promotion'
  };

  const updateEvent = trpc.info.update.useMutation();

  const updateExistingEvent = () => {
    try {
      updateEvent.mutate(
        {
          id: id,
          title: titles,
          date: dates,
          imageUrl: imageUrls,
          eventUrl: eventUrls
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            onUpdate();
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2" onClick={() => setIsOpen(true)}>
            <PencilIcon className="h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {categories[category]}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Edit the {categories[category]} information
          </DialogDescription>

          <div className="grid gap-4">
            <Label>Image</Label>
            <Input
              value={imageUrls}
              className="flex h-20 items-center justify-center pt-6 text-center"
              id="imageUrl"
              placeholder="File"
              required
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <Label>Title</Label>
            <Input
              value={titles}
              id="title"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label>Event Link</Label>
            <Input
              value={eventUrls}
              id="eventUrl"
              placeholder="https://"
              required
              onChange={(e) => setEventUrl(e.target.value)}
            />
            <Label>Date</Label>
            <Input
              value={formatDateForInput(dates)}
              type="datetime-local"
              id="date"
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button onClick={updateExistingEvent}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
