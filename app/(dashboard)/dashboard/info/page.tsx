import { NewsCards } from '@/components/news/newsCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Metadata } from 'next';
import { ScrollArea } from '@/components/ui/scroll-area';

export const metadata: Metadata = {
  title: 'Info and News'
};

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <header className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold md:text-2xl">Info and News</h1>
        </header>

        <article className="mt-4">
          <Tabs
            orientation="vertical"
            defaultValue="events"
            className="space-y-4"
          >
            <div className="w-full overflow-x-auto pb-2">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="promotions">Promotions</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="events">
              <NewsCards />
            </TabsContent>
            <TabsContent value="news"></TabsContent>
            <TabsContent value="promotions"></TabsContent>
          </Tabs>
        </article>
      </main>
    </ScrollArea>
  );
}
