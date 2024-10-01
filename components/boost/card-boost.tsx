'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { trpc } from '@/server/client';
import Link from 'next/link';
import {
  LightbulbIcon,
  PenIcon,
  PlayIcon,
  TextIcon,
  TrashIcon,
  VideoIcon
} from 'lucide-react';
import DialogTask from './dialog-boost';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Component() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);

  const utils = trpc.useContext();

  const boostTask = trpc.boostTask.getByCompanyId.useQuery({
    companyId: parsedUserId
  });

  const deleteTask = trpc.boostTask.delete.useMutation({
    onSuccess: () => {
      utils.boostTask.get.invalidate();
    }
  });

  const handleUpdate = () => {
    utils.boostTask.get.invalidate();
  };

  const deleteTaskById = (taskId: number) => {
    try {
      deleteTask.mutate({ taskId });
    } catch (error) {
      console.error('Error in deleteTaskById:', error);
    }
  };

  const { isLoading } = trpc.boostTask.get.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {boostTask.data?.map((task) => (
        <div key={task.id}>
          {task.id && task.videoTask && (
            <Card
              key={task.id}
              className="flex h-[400px] cursor-pointer flex-col"
            >
              <CardHeader className="flex flex-col items-start gap-2">
                <div className="flex items-center justify-center gap-2">
                  <VideoIcon className="h-5 w-5" />
                  <div className="font-semibold">{task.videoTask.name}</div>
                </div>
                <div className="text-sm text-muted-foreground">Video</div>
              </CardHeader>
              <Link
                href={task.videoTask.videoUrl}
                target="_blank"
                className="flex h-full items-end justify-center"
              >
                <CardContent>
                  <PlayIcon className="h-10 w-10" />
                </CardContent>
              </Link>
              <CardFooter className="flex h-full items-end justify-between">
                <DialogTask
                  taskId={task.id}
                  selectedTaskProp="VIDEO"
                  nameProp={task.videoTask.name}
                  videoUrlProp={task.videoTask.videoUrl}
                  onUpdate={handleUpdate}
                >
                  <Button variant="ghost" size="sm">
                    <PenIcon className="h-5 w-5" />
                  </Button>
                </DialogTask>
                <Button
                  onClick={() => deleteTaskById(task.id)}
                  className="gap-2"
                  variant={'ghost'}
                >
                  <TrashIcon className="h-6 w-6 text-red-500" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {task.id && task.textTask && (
            <>
              <Card
                key={task.id}
                className="flex h-[400px] cursor-pointer flex-col"
              >
                <CardHeader className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <TextIcon className="h-5 w-5" />
                    <div className="font-semibold">{task.textTask.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Text</div>
                </CardHeader>
                <CardContent className="flex max-h-[250px] flex-grow flex-col gap-4 overflow-y-scroll">
                  <div className="break-words font-medium">
                    {task.textTask.title1}
                  </div>
                  <div className="break-words text-muted-foreground">
                    {task.textTask.text1}
                  </div>
                  <div className="break-words font-medium">
                    {task.textTask.title2}
                  </div>
                  <div className="break-words text-muted-foreground">
                    {task.textTask.text2}
                  </div>
                  <div className="break-words font-medium">
                    {task.textTask.title3}
                  </div>
                  <div className="break-words text-muted-foreground">
                    {task.textTask.text3}
                  </div>
                </CardContent>
                <CardFooter className="flex items-end justify-between">
                  <DialogTask
                    taskId={task.id}
                    selectedTaskProp="TEXT"
                    nameProp={task.textTask.name}
                    title1Prop={task.textTask.title1}
                    text1Prop={task.textTask.text1}
                    title2Prop={task.textTask.title2}
                    text2Prop={task.textTask.text2}
                    title3Prop={task.textTask.title3}
                    text3Prop={task.textTask.text3}
                    onUpdate={handleUpdate}
                  >
                    <Button variant="ghost" size="sm">
                      <PenIcon className="h-5 w-5" />
                    </Button>
                  </DialogTask>
                  <Button
                    onClick={() => deleteTaskById(task.id)}
                    className="gap-2"
                    variant={'ghost'}
                  >
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          {task.id && task.tipsTask && (
            <>
              <Card
                key={task.id}
                className="flex h-[400px] cursor-pointer flex-col"
              >
                <CardHeader className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <LightbulbIcon className="h-5 w-5" />
                    <div className="font-semibold">{task.tipsTask.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Tips</div>
                </CardHeader>
                <CardContent className="grid flex-grow gap-4">
                  <div className="grid max-w-full gap-2 break-words">
                    <div className="font-medium">{task.tipsTask.title1}</div>
                    <div className="text-muted-foreground">
                      {task.tipsTask.text1}
                    </div>
                  </div>
                  <div className="grid max-w-full gap-2 break-words">
                    <div className="font-medium">{task.tipsTask.title2}</div>
                    <div className="text-muted-foreground">
                      {task.tipsTask.text2}
                    </div>
                  </div>
                  <div className="grid max-w-full gap-2 break-words">
                    <div className="font-medium">{task.tipsTask.title3}</div>
                    <div className="text-muted-foreground">
                      {task.tipsTask.text3}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex h-full items-end justify-between">
                  <DialogTask
                    taskId={task.id}
                    selectedTaskProp="TIPS"
                    nameProp={task.tipsTask.name}
                    title1Prop={task.tipsTask.title1}
                    text1Prop={task.tipsTask.text1}
                    title2Prop={task.tipsTask.title2}
                    text2Prop={task.tipsTask.text2}
                    title3Prop={task.tipsTask.title3}
                    text3Prop={task.tipsTask.text3}
                    onUpdate={handleUpdate}
                  >
                    <Button variant="ghost" size="sm">
                      <PenIcon className="h-5 w-5" />
                    </Button>
                  </DialogTask>
                  <Button
                    onClick={() => deleteTaskById(task.id)}
                    className="gap-2"
                    variant={'ghost'}
                  >
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
