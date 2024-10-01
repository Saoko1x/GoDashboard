'use client';
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
  EyeIcon,
  FileTextIcon,
  GraduationCap,
  LightbulbIcon,
  PenIcon,
  PlusIcon,
  Trash2Icon,
  VideoIcon
} from 'lucide-react';
import DialogTraining from './dialog-training';
import { useSession } from 'next-auth/react';

export default function Cardtrainings() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);

  const {
    data: trainings,
    isLoading,
    refetch
  } = trpc.training.getByCompanyId.useQuery({
    companyId: parsedUserId
  });
  const deleteTraining = trpc.training.delete.useMutation();

  const delTraining = (trainingId: number) => {
    try {
      deleteTraining.mutate(
        {
          id: trainingId
        },
        {
          onSuccess: () => {
            refetch();
          },
          onError: (error) => {
            console.error('Failed to delete training:', error);
          }
        }
      );
    } catch (error) {
      console.error('Error in deltraining:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      {trainings?.map((training) => (
        <Card className="flex h-[300px] flex-col" key={training.id}>
          <CardHeader className="flex flex-shrink-0 flex-row items-center gap-4">
            <GraduationCap className="h-8 w-8" />
            <div className="grid gap-1">
              <CardTitle>{training.name}</CardTitle>
              <CardDescription>Course</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <div className="grid gap-2">
              {training.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {renderTaskIcon(task)}
                    <div className="font-medium">{getTaskName(task)}</div>
                  </div>
                  <Link
                    href={`/dashboard/training/create?trainingId=${training.id}`}
                  >
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
            <Link href={`/dashboard/training/create?trainingId=${training.id}`}>
              <Button variant="ghost" size="sm">
                <PlusIcon className="h-5 w-5" />
              </Button>
            </Link>
            <DialogTraining
              trainingId={training.id}
              trainingNameProp={training.name}
            >
              <Button variant="ghost" size="sm">
                <PenIcon className="h-5 w-5" />
              </Button>
            </DialogTraining>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                delTraining(training.id);
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
