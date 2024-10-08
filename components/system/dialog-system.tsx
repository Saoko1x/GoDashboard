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
  children,
  onUpdate
}: {
  weekId?: number;
  weekNameProp?: string;
  weekStartDateProp?: string;
  weekEndDateProp?: string;
  children: React.ReactNode;
  onUpdate: () => void;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1)
  });
  const [weekName, setWeekName] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const utils = trpc.useContext();

  const addWeek = trpc.weeks.create.useMutation({
    onSuccess: () => {
      utils.weeks.getByCompanyId.invalidate({ companyId: parsedUserId });
      setIsOpen(false);
      onUpdate();
    }
  });

  const updateWeek = trpc.weeks.update.useMutation({
    onSuccess: () => {
      utils.weeks.getByCompanyId.invalidate({ companyId: parsedUserId });
      setIsOpen(false);
      onUpdate();
    }
  });

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
    } else {
      handleAddWeek();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add week</DialogTitle>
          <DialogDescription>
            Select the start and end date for the week.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Week title"
          value={weekName}
          onChange={(e) => setWeekName(e.target.value)}
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
          <PopoverContent className="w-full max-w-[300px] p-0 sm:max-w-[400px]">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={new Date()}
              selected={date}
              onSelect={setDate}
              className="p-0 [&>div]:gap-4 [&_[name=day]]:h-8 [&_[name=day]]:w-8 sm:[&_[name=day]]:h-10 sm:[&_[name=day]]:w-10 [&_td]:h-8 [&_td]:w-8 sm:[&_td]:h-10 sm:[&_td]:w-10 [&_th]:w-8 sm:[&_th]:w-10"
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
