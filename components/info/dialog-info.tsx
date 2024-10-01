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
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Component({
  category,
  onUpdate
}: {
  category: number;
  onUpdate: () => void;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);
  const categories: { [key: number]: string } = {
    1: 'event',
    2: 'news',
    3: 'promotion'
  };

  const [title, setTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [eventUrl, setEventUrl] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const addEvent = trpc.info.create.useMutation();

  const addNewEvent = () => {
    try {
      addEvent.mutate(
        {
          title: title,
          date: date,
          imageUrl: imageUrl,
          eventUrl: eventUrl,
          categoryId: category,
          companyId: parsedUserId
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
    } finally {
      console.log('done');
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>
            Add {categories[category]}{' '}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add {categories[category]}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Add a new {categories[category]} to the training
          </DialogDescription>

          <div className="grid gap-4">
            <Label>Image</Label>
            <Input
              value={imageUrl}
              className="flex h-20 items-center justify-center pt-6 text-center"
              id="imageUrl"
              placeholder="File"
              required
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <Label>Title</Label>
            <Input
              value={title}
              id="title"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label>Event Link</Label>
            <Input
              value={eventUrl}
              id="eventUrl"
              placeholder="https://"
              required
              onChange={(e) => setEventUrl(e.target.value)}
            />
            <Label>Date</Label>
            <Input
              value={date}
              type="datetime-local"
              id="date"
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button onClick={addNewEvent}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
