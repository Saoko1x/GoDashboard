import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Ahorro from '@/public/images/ahorro.png';
import Contabilidad from '@/public/images/contabilidad.jpg';
import Alcanza from '@/public/images/alcanza.jpeg';
import Image from 'next/image';
import NewsDialog from './newsDialog';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

const cardsContent = [
  {
    active: true,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Ahorro
  },
  {
    active: true,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Contabilidad
  },
  {
    active: true,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Alcanza
  },
  {
    active: true,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Ahorro
  },
  {
    active: true,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Contabilidad
  },
  {
    active: true,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Alcanza
  },
  {
    active: false,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Ahorro
  },
  {
    active: false,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Contabilidad
  },
  {
    active: false,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Alcanza
  },
  {
    active: false,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Ahorro
  },
  {
    active: false,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Contabilidad
  },
  {
    active: false,
    title: 'Masterclass',
    date: 'Wednesday 12th, 2022',
    time: '10:00 AM - 12:00 PM',
    image: Alcanza
  }
];

export function NewsCards() {
  return (
    <section className="mt-4">
      <div className="flex flex-row justify-between">
        <h1>Active</h1>
        <NewsDialog />
      </div>
      <div className="my-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cardsContent.map((card, index) => (
          <Card key={index} className="group/item relative">
            <Image
              src={card.image}
              alt="Hero"
              className="h-48 w-full rounded-t-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 group-hover/item:backdrop-blur-sm">
              <a className="group/edit invisible group-hover/item:visible">
                <Button className="gap-2">
                  <Pencil1Icon className="h-4 w-4" />
                  Edit
                </Button>
              </a>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-medium">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div className="text-lg font-bold">{card.date}</div>
              <p className="text-xs text-muted-foreground">{card.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-4">
        <h1>Inactive</h1>
        <div className="my-4 grid gap-4 grayscale sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {cardsContent.map((card, index) => (
            <Card key={index} className="group/item relative">
              <Image
                src={card.image}
                alt="Hero"
                className="h-48 w-full rounded-t-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 group-hover/item:backdrop-blur-sm">
                <a className="group/edit invisible group-hover/item:visible">
                  <Button className="gap-2">
                    <Pencil1Icon className="h-4 w-4" />
                    Edit
                  </Button>
                </a>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-medium">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="text-lg font-bold">{card.date}</div>
                <p className="text-xs text-muted-foreground">{card.time}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
