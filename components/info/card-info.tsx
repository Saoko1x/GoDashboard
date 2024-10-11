'use client';
import { trpc } from '@/server/client';
import ActiveCard from '../news/card';
import DialogInfo from '../info/dialog-info';
import { Button } from '../ui/button';
import { useCompanyId } from '@/hooks/useCompanyid';

export function CardEvents({ category }: { category: number }) {
  const { companyId } = useCompanyId();
  const {
    data: events,
    isLoading,
    refetch
  } = trpc.info.getByCompanyId.useQuery({
    companyId: companyId
  });

  const handleUpdate = () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredEvents =
    events?.filter((event) => event.category.id === category) || [];

  return (
    <section className="mt-4">
      <div className="flex flex-row justify-between">
        <h1>Active</h1>
        <DialogInfo category={category} onUpdate={handleUpdate}>
          <Button>Add Event</Button>
        </DialogInfo>
      </div>
      <div className="my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEvents
          .filter((card) => new Date(card.date) > new Date())
          .map((card) => (
            <ActiveCard
              key={card.id}
              title={card.title}
              imageUrl={card.imageUrl}
              eventUrl={card.eventUrl}
              date={new Date(card.date)}
              id={card.id}
              category={category}
            />
          ))}
      </div>

      <section className="mt-4">
        <h1>Inactive</h1>
        <div className="my-4 grid gap-4 grayscale sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents
            .filter((card) => new Date(card.date) < new Date())
            .map((card) => (
              <ActiveCard
                key={card.id}
                title={card.title}
                imageUrl={card.imageUrl}
                eventUrl={card.eventUrl}
                date={new Date(card.date)}
                id={card.id}
                category={category}
              />
            ))}
        </div>
      </section>
    </section>
  );
}

export function CardNews({ category }: { category: number }) {
  const { companyId } = useCompanyId();
  const {
    data: events,
    isLoading,
    refetch
  } = trpc.info.getByCompanyId.useQuery({
    companyId: companyId
  });

  const handleUpdate = () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredNews =
    events?.filter((event) => event.category.id === category) || [];

  return (
    <section className="mt-4">
      <div className="flex flex-row justify-between">
        <h1>Active</h1>
        <DialogInfo category={category} onUpdate={handleUpdate}>
          <Button>Add News</Button>
        </DialogInfo>
      </div>
      <div className="my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredNews
          .filter((card) => new Date(card.date) > new Date())
          .map((card) => (
            <ActiveCard
              key={card.id}
              title={card.title}
              imageUrl={card.imageUrl}
              eventUrl={card.eventUrl}
              date={new Date(card.date)}
              id={card.id}
              category={category}
            />
          ))}
      </div>

      <section className="mt-4">
        <h1>Inactive</h1>
        <div className="my-4 grid gap-4 grayscale sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredNews
            .filter((card) => new Date(card.date) < new Date())
            .map((card) => (
              <ActiveCard
                key={card.id}
                title={card.title}
                imageUrl={card.imageUrl}
                eventUrl={card.eventUrl}
                date={new Date(card.date)}
                id={card.id}
                category={category}
              />
            ))}
        </div>
      </section>
    </section>
  );
}

export function CardPromotions({ category }: { category: number }) {
  const { companyId } = useCompanyId();
  const {
    data: events,
    isLoading,
    refetch
  } = trpc.info.getByCompanyId.useQuery({
    companyId: companyId
  });

  const handleUpdate = () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredPromotions =
    events?.filter((event) => event.category.id === category) || [];

  return (
    <section className="mt-4">
      <div className="flex flex-row justify-between">
        <h1>Active</h1>
        <DialogInfo category={category} onUpdate={handleUpdate}>
          <Button>Add Promotion</Button>
        </DialogInfo>
      </div>
      <div className="my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPromotions
          .filter((card) => new Date(card.date) > new Date())
          .map((card) => (
            <ActiveCard
              key={card.id}
              title={card.title}
              imageUrl={card.imageUrl}
              eventUrl={card.eventUrl}
              date={new Date(card.date)}
              id={card.id}
              category={category}
            />
          ))}
      </div>

      <section className="mt-4">
        <h1>Inactive</h1>
        <div className="my-4 grid gap-4 grayscale sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPromotions
            .filter((card) => new Date(card.date) < new Date())
            .map((card) => (
              <ActiveCard
                key={card.id}
                title={card.title}
                imageUrl={card.imageUrl}
                eventUrl={card.eventUrl}
                date={new Date(card.date)}
                id={card.id}
                category={category}
              />
            ))}
        </div>
      </section>
    </section>
  );
}
