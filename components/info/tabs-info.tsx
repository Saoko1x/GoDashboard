import {
  CardEvents,
  CardNews,
  CardPromotions
} from '@/components/info/card-info';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Component() {
  return (
    <article className="mt-4">
      <Tabs orientation="vertical" defaultValue="events" className="space-y-4">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="events">
          <CardEvents category={1} />
        </TabsContent>
        <TabsContent value="news">
          <CardNews category={2} />
        </TabsContent>
        <TabsContent value="promotions">
          <CardPromotions category={3} />
        </TabsContent>
      </Tabs>
    </article>
  );
}
