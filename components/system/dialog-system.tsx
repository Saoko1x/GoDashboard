'use client';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { trpc } from '@/server/client';
import { Input } from '../ui/input';
import { useSession } from 'next-auth/react';

export default function DialogWeek({
  weekId,
  weekNameProp,
  weekStartDateProp,
  weekEndDateProp,
  children
}: {
  weekId?: number;
  weekNameProp?: string;
  weekStartDateProp?: string;
  weekEndDateProp?: string;
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1)
  });
  const [weekName, setWeekName] = React.useState('');

  const addWeek = trpc.weeks.create.useMutation();
  const { refetch } = trpc.weeks.get.useQuery();

  const handleAddWeek = () => {
    if (date?.from && date?.to) {
      addWeek.mutate({
        name: weekName,
        startDate: date.from.toDateString(),
        endDate: date.to.toDateString(),
        companyId: parsedUserId
      });
    }
  };

  const updateWeek = trpc.weeks.update.useMutation();

  const handleUpdateWeek = () => {
    if (date?.from && date?.to) {
      updateWeek.mutate({
        id: weekId as number,
        name: weekName,
        startDate: date.from.toDateString(),
        endDate: date.to.toDateString()
      });
    }
  };

  React.useEffect(() => {
    if (weekNameProp) {
      setWeekName(weekNameProp);
    }
    if (weekStartDateProp && weekEndDateProp) {
      setDate({
        from: new Date(weekStartDateProp),
        to: new Date(weekEndDateProp)
      });
    }
  }, [weekNameProp, weekStartDateProp, weekEndDateProp]);

  const handleButton = () => {
    if (weekNameProp) {
      handleUpdateWeek();
      refetch();
    } else {
      handleAddWeek();
      refetch();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add week</DialogTitle>
          <DialogDescription>
            Select the start and end date for the week.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Week title"
          value={weekName}
          onChange={(e) => {
            setWeekName(e.target.value);
          }}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-12 flex-1 justify-start gap-2 px-4 text-left"
            >
              <CalendarIcon className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Week</span>
                <span className="text-sm text-muted-foreground">
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-[300px] p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={new Date()}
              selected={date}
              onSelect={setDate}
              className="p-0 [&>div]:gap-6 [&>div]:space-x-0 [&_[name=day]]:h-10 [&_[name=day]]:w-10 [&_td]:h-10 [&_td]:w-10 [&_th]:w-10"
            />
          </PopoverContent>
        </Popover>
        <DialogFooter>
          <Button type="submit" onClick={handleButton}>
            {weekNameProp ? 'Update week' : 'Add week'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}