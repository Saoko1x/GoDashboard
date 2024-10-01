'use client';

import { Button } from '@/components/ui/button';
import { Event } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { trpc } from '@/server/client';
import { useRouter } from 'next/navigation';
export default function NewsForm({
  event,
  category
}: {
  event: Event | null;
  category: string | null;
}) {
  const router = useRouter();
  const events = trpc.info.getById.useQuery({ id: event?.id || 0 });
  const addEvent = trpc.info.create.useMutation();
  const updateEvent = trpc.info.update.useMutation();

  const [title, setTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [eventUrl, setEventUrl] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Obtén "YYYY-MM-DDTHH:MM"
  };

  useEffect(() => {
    if (events.data) {
      setTitle(events.data.title || '');
      setImageUrl(events.data.imageUrl || '');
      setEventUrl(events.data.eventUrl || '');
      setDate(formatDateForInput(events.data.date || ''));
    }
  }, [events.data]);

  const addNewEvent = () => {
    try {
      addEvent.mutate({
        title: title,
        date: date,
        imageUrl: imageUrl,
        eventUrl: eventUrl,
        categoryId: category ? parseInt(category) : 0
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('done');
      router.push('/dashboard/info');
    }
  };

  const updateExistingEvent = () => {
    try {
      updateEvent.mutate({
        id: events.data?.id || 0,
        title: title,
        date: date,
        imageUrl: imageUrl,
        eventUrl: eventUrl
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('done');
      router.push('/dashboard/info');
    }
  };

  const handleFormSubmit = () => {
    if (events.data?.id) {
      updateExistingEvent();
    } else {
      addNewEvent();
    }
  };

  return (
    <div className="flex-1 items-center justify-between">
      <div className="my-4 flex flex-col gap-2 space-y-2">
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

      <Button onClick={handleFormSubmit}>
        {events.data?.id ? 'Update' : 'Add'} promotion
      </Button>
    </div>
  );
}
