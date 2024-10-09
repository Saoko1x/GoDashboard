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
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { UploadButton } from '@/lib/uploadthing';

import React from 'react';
import { useCompanyId } from '@/hooks/useCompanyid';

export default function Component({
  category,
  onUpdate,
  children,
  titleProp,
  imageUrlProp,
  eventUrlProp,
  dateProp,
  idProp
}: {
  category: number;
  onUpdate: () => void;
  children: React.ReactNode;
  titleProp?: string;
  imageUrlProp?: string;
  eventUrlProp?: string;
  dateProp?: Date;
  idProp?: number;
}) {
  const { companyId } = useCompanyId();
  const categories: { [key: number]: string } = {
    1: 'event',
    2: 'news',
    3: 'promotion'
  };

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [eventUrl, setEventUrl] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const addEvent = trpc.info.create.useMutation();

  useEffect(() => {
    if (titleProp) {
      setTitle(titleProp);
    }
    if (imageUrlProp) {
      setImageUrl(imageUrlProp);
    }
    if (eventUrlProp) {
      setEventUrl(eventUrlProp);
    }
    if (dateProp) {
      setDate(dateProp.toString());
    }
  }, [titleProp, imageUrlProp, eventUrlProp, dateProp]);

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Obtén "YYYY-MM-DDTHH:MM"
  };

  const updateEvent = trpc.info.update.useMutation();

  const updateExistingEvent = () => {
    try {
      updateEvent.mutate(
        {
          id: idProp as number,
          title: title,
          date: date,
          imageUrl: imageUrl,
          eventUrl: eventUrl
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

  const addNewEvent = () => {
    try {
      addEvent.mutate(
        {
          title: title,
          date: date,
          imageUrl: imageUrl,
          eventUrl: eventUrl,
          categoryId: category,
          companyId: companyId
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

  const handleButton = () => {
    if (idProp) {
      updateExistingEvent();
    } else {
      addNewEvent();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add {categories[category]}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Add a new {categories[category]} to the training
          </DialogDescription>

          <div className="grid gap-4">
            <Label>Image</Label>
            <UploadButton
              className="ut-button:bg-black ut-button:text-white dark:ut-button:bg-white dark:ut-button:text-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
              }}
            />
            <Input
              value={imageUrl}
              id="imageUrl"
              placeholder="Image URL"
              disabled
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
              value={formatDateForInput(date)}
              type="datetime-local"
              id="date"
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button onClick={handleButton}>{idProp ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
