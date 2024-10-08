'use client';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { trpc } from '@/server/client';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  CalendarIcon,
  EyeIcon,
  FileTextIcon,
  LightbulbIcon,
  PenIcon,
  PlusIcon,
  Trash2Icon,
  VideoIcon
} from 'lucide-react';
import DialogWeek from './dialog-system';

export default function CardWeeks() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);

  const utils = trpc.useContext();

  const handleUpdate = () => {
    refetch();
    utils.weeks.getByCompanyId.invalidate({ companyId: parsedUserId });
  };

  const {
    data: weeks,
    isLoading,
    refetch
  } = trpc.weeks.getByCompanyId.useQuery({
    companyId: parsedUserId
  });
  const deleteWeek = trpc.weeks.delete.useMutation();

  const delWeek = (weekId: number) => {
    try {
      deleteWeek.mutate(
        {
          id: weekId
        },
        {
          onSuccess: () => {
            refetch();
          },
          onError: (error) => {
            console.error('Failed to delete week:', error);
          }
        }
      );
    } catch (error) {
      console.error('Error in delWeek:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const convertDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    const d = new Date(date);
    return d.toLocaleDateString('en-US', options);
  };

  const renderTaskIcon = (task: any) => {
    if (task.videoTask) return <VideoIcon className="h-5 w-5" />;
    if (task.textTask) return <FileTextIcon className="h-5 w-5" />;
    if (task.tipsTask) return <LightbulbIcon className="h-5 w-5" />;
    return null;
  };

  const getTaskName = (task: any) => {
    if (task.videoTask) return task.videoTask.name;
    if (task.textTask) return task.textTask.name;
    if (task.tipsTask) return task.tipsTask.name;
    return <div></div>;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {weeks?.map((week) => (
        <Card className="flex h-[300px] flex-col" key={week.id}>
          <CardHeader className="flex flex-shrink-0 flex-row items-center gap-4">
            <CalendarIcon className="h-8 w-8" />
            <div className="grid gap-1">
              <CardTitle>{week.name}</CardTitle>
              <CardDescription>
                {convertDate(week.startDate)} - {convertDate(week.endDate)}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <div className="grid gap-2">
              {week.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {renderTaskIcon(task)}
                    <div className="font-medium">{getTaskName(task)}</div>
                  </div>
                  <Link href={`/dashboard/system/create?weekId=${week.id}`}>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link href={`/dashboard/system/create?weekId=${week.id}`}>
              <Button variant="ghost" size="sm">
                <PlusIcon className="h-5 w-5" />
              </Button>
            </Link>
            <DialogWeek
              weekId={week.id}
              weekNameProp={week.name}
              weekEndDateProp={week.endDate}
              weekStartDateProp={week.startDate}
              onUpdate={handleUpdate}
            >
              <Button variant="ghost" size="sm">
                <PenIcon className="h-5 w-5" />
              </Button>
            </DialogWeek>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                delWeek(week.id);
              }}
            >
              <Trash2Icon className="h-5 w-5 text-red-500" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
