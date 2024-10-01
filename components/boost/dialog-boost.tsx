'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { trpc } from '@/server/client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Component({
  taskId,
  children,
  nameProp,
  title1Prop,
  text1Prop,
  title2Prop,
  text2Prop,
  title3Prop,
  text3Prop,
  videoUrlProp,
  selectedTaskProp,
  onUpdate
}: {
  taskId?: any;
  children: React.ReactNode;
  nameProp?: string;
  title1Prop?: string;
  text1Prop?: string;
  title2Prop?: string;
  text2Prop?: string;
  title3Prop?: string;
  text3Prop?: string;
  videoUrlProp?: string;
  selectedTaskProp?: string;
  onUpdate: () => void;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);

  const [selectedTask, setSelectedTask] = useState<string>();
  const [name, setName] = useState<string>('');
  const [title1, setTitle1] = useState<string>('');
  const [text1, setText1] = useState<string>('');
  const [title2, setTitle2] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [title3, setTitle3] = useState<string>('');
  const [text3, setText3] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTask = (Task: any) => {
    setSelectedTask(Task);
  };

  const utils = trpc.useContext();

  const addTask = trpc.boostTask.create.useMutation({
    onSuccess: () => {
      utils.boostTask.get.invalidate();
      setIsOpen(false);
      onUpdate();
    }
  });
  const updateTask = trpc.boostTask.update.useMutation({
    onSuccess: () => {
      utils.boostTask.get.invalidate();
      setIsOpen(false);
      onUpdate();
    }
  });

  const addNewTask = () => {
    if (selectedTask === 'TEXT') {
      addTask.mutate(
        {
          companyId: parsedUserId,
          textTask: {
            name: name,
            title1: title1,
            text1: text1,
            title2: title2,
            text2: text2,
            title3: title3,
            text3: text3
          }
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            onUpdate();
            setName('');
            setTitle1('');
            setText1('');
            setTitle2('');
            setText2('');
            setTitle3('');
            setText3('');
          }
        }
      );
    }
    if (selectedTask === 'VIDEO') {
      addTask.mutate(
        {
          companyId: parsedUserId,
          videoTask: {
            name: name,
            videoUrl: videoUrl
          }
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            onUpdate();
            setName('');
            setVideoUrl('');
          }
        }
      );
    }
    if (selectedTask === 'TIPS') {
      addTask.mutate(
        {
          companyId: parsedUserId,
          tipsTask: {
            name: name,
            title1: title1,
            text1: text1,
            title2: title2,
            text2: text2,
            title3: title3,
            text3: text3
          }
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            onUpdate();
            setName('');
            setTitle1('');
            setText1('');
            setTitle2('');
            setText2('');
            setTitle3('');
            setText3('');
          }
        }
      );
    }
  };

  const updateExistingTask = () => {
    if (selectedTask === 'TEXT') {
      updateTask.mutate({
        taskId: taskId,
        textTask: {
          name: name,
          title1: title1,
          text1: text1,
          title2: title2,
          text2: text2,
          title3: title3,
          text3: text3
        }
      });
    }
    if (selectedTask === 'VIDEO') {
      updateTask.mutate({
        taskId: taskId,
        videoTask: {
          name: name,
          videoUrl: videoUrl
        }
      });
    }
    if (selectedTask === 'TIPS') {
      updateTask.mutate({
        taskId: taskId,
        tipsTask: {
          name: name,
          title1: title1,
          text1: text1,
          title2: title2,
          text2: text2,
          title3: title3,
          text3: text3
        }
      });
    }
  };

  React.useEffect(() => {
    if (selectedTaskProp) {
      setSelectedTask(selectedTaskProp);
    }
    if (nameProp) {
      setName(nameProp);
    }
    if (title1Prop) {
      setTitle1(title1Prop);
    }
    if (text1Prop) {
      setText1(text1Prop);
    }
    if (title2Prop) {
      setTitle2(title2Prop);
    }
    if (text2Prop) {
      setText2(text2Prop);
    }
    if (title3Prop) {
      setTitle3(title3Prop);
    }
    if (text3Prop) {
      setText3(text3Prop);
    }
    if (videoUrlProp) {
      setVideoUrl(videoUrlProp);
    }
  }, [
    nameProp,
    title1Prop,
    text1Prop,
    title2Prop,
    text2Prop,
    title3Prop,
    text3Prop,
    videoUrlProp,
    selectedTaskProp
  ]);

  const handleButton = () => {
    if (nameProp) {
      updateExistingTask();
    } else {
      addNewTask();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{nameProp ? 'Update' : 'Add'} Task</DialogTitle>
          <DialogDescription>
            Select your type of Task and add your content.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={handleSelectTask} value={selectedTask}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your template" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="TEXT">Text</SelectItem>
              <SelectItem value="VIDEO">Video</SelectItem>
              <SelectItem value="TIPS">Tips</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedTask === 'TEXT' && (
          <div className="grid gap-4">
            <Label htmlFor="title">Task name</Label>
            <Input
              id="title"
              placeholder="Enter your task name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              value={title1}
              onChange={(e) => {
                setTitle1(e.target.value);
              }}
            />
            <Label>Text</Label>
            <Textarea
              placeholder="Enter your text"
              value={text1}
              onChange={(e) => {
                setText1(e.target.value);
              }}
            />
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              value={title2}
              onChange={(e) => {
                setTitle2(e.target.value);
              }}
            />
            <Label>Text</Label>
            <Textarea
              placeholder="Enter your text"
              value={text2}
              onChange={(e) => {
                setText2(e.target.value);
              }}
            />
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              value={title3}
              onChange={(e) => {
                setTitle3(e.target.value);
              }}
            />
            <Label>Text</Label>
            <Textarea
              placeholder="Enter your text"
              value={text3}
              onChange={(e) => {
                setText3(e.target.value);
              }}
            />
          </div>
        )}
        {selectedTask === 'VIDEO' && (
          <div className="grid gap-4">
            <Label htmlFor="video">Video name</Label>
            <Input
              id="video"
              placeholder="Enter your video name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Label htmlFor="video">Upload your video here</Label>
            <Input
              id="video"
              value={videoUrl}
              type="text"
              onChange={(e) => {
                setVideoUrl(e.target.value);
              }}
            />
          </div>
        )}
        {selectedTask === 'TIPS' && (
          <div className="grid gap-4">
            <Label htmlFor="name">Tips name</Label>
            <Input
              id="name"
              placeholder="Enter your tips name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Label htmlFor="title">Tip 1</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              value={title1}
              onChange={(e) => {
                setTitle1(e.target.value);
              }}
            />
            <Label>Text</Label>
            <Textarea
              placeholder="Enter your text"
              value={text1}
              onChange={(e) => {
                setText1(e.target.value);
              }}
            />
            <Label htmlFor="title">Tip 2</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              value={title2}
              onChange={(e) => {
                setTitle2(e.target.value);
              }}
            />
            <Label>Text</Label>
            <Textarea
              placeholder="Enter your text"
              value={text2}
              onChange={(e) => {
                setText2(e.target.value);
              }}
            />
            <Label htmlFor="title">Tip 3</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              value={title3}
              onChange={(e) => {
                setTitle3(e.target.value);
              }}
            />
            <Label>Text</Label>
            <Textarea
              placeholder="Enter your text"
              value={text3}
              onChange={(e) => {
                setText3(e.target.value);
              }}
            />
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleButton}>
            {nameProp ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
