'use client';
import { trpc } from '@/server/client';
import ActiveCard from '../news/card';
import DialogInfo from '../info/dialog-info';
import { useSession } from 'next-auth/react';

export function CardEvents({ category }: { category: number }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);
  const {
    data: events,
    isLoading,
    refetch
  } = trpc.info.getByCompanyId.useQuery({
    companyId: parsedUserId
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
        <DialogInfo category={category} onUpdate={handleUpdate} />
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
  const handleUpdate = () => {
    refetch();
  };
  const { data: news, isLoading, refetch } = trpc.info.get.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredNews =
    news?.filter((item) => item.category.id === category) || [];

  return (
    <section className="mt-4">
      <div className="flex flex-row justify-between">
        <h1>Active</h1>
        <DialogInfo category={category} onUpdate={handleUpdate} />
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
  const { refetch } = trpc.info.get.useQuery();
  const handleUpdate = () => {
    refetch();
  };
  const { data: promotions, isLoading } = trpc.info.get.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredPromotions =
    promotions?.filter((item) => item.category.id === category) || [];

  return (
    <section className="mt-4">
      <div className="flex flex-row justify-between">
        <h1>Active</h1>
        <DialogInfo category={category} onUpdate={handleUpdate} />
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