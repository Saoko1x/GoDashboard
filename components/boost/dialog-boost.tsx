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
import { UploadButton } from '@/lib/uploadthing';

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
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileUrl2, setFileUrl2] = useState<string>('');

  const handleSelectTask = (Task: any) => {
    setSelectedTask(Task);
  };

  const utils = trpc.useContext();

  const addTask = trpc.boostTask.create.useMutation({
    onSuccess: () => {
      utils.boostTask.getByCompanyId.invalidate({ companyId: parsedUserId });
      setIsOpen(false);
      onUpdate();
    }
  });
  const updateTask = trpc.boostTask.update.useMutation({
    onSuccess: () => {
      utils.boostTask.getByCompanyId.invalidate({ companyId: parsedUserId });
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
            imageUrl1: fileUrl,
            title2: title2,
            text2: text2,
            imageUrl2: fileUrl2,
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
            setFileUrl('');
            setTitle2('');
            setText2('');
            setFileUrl2('');
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
            imageUrl1: fileUrl,
            title2: title2,
            text2: text2,
            imageUrl2: fileUrl2,
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
            setFileUrl('');
            setTitle2('');
            setText2('');
            setFileUrl2('');
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
          imageUrl1: fileUrl,
          title2: title2,
          text2: text2,
          imageUrl2: fileUrl2,
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
          imageUrl1: fileUrl,
          title2: title2,
          text2: text2,
          imageUrl2: fileUrl2,
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
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto p-4 sm:max-w-lg">
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="taskName">Task name</Label>
            <Input
              id="taskName"
              placeholder="Enter your task name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Label htmlFor="title1">Title</Label>
            <Input
              id="title1"
              placeholder="Enter your title"
              value={title1}
              onChange={(e) => {
                setTitle1(e.target.value);
              }}
            />
            <Label htmlFor="text1">Text</Label>
            <Textarea
              id="text1"
              placeholder="Enter your text"
              value={text1}
              onChange={(e) => {
                setText1(e.target.value);
              }}
            />
            <UploadButton
              className="ut-button:bg-black ut-button:text-white dark:ut-button:bg-white dark:ut-button:text-black "
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFileUrl(res[0].url);
              }}
            />
            <Input
              value={fileUrl}
              id="imageUrl"
              placeholder="Image URL"
              disabled
            />
            <Label htmlFor="title2">Title</Label>
            <Input
              id="title2"
              placeholder="Enter your title"
              value={title2}
              onChange={(e) => {
                setTitle2(e.target.value);
              }}
            />
            <Label htmlFor="text2">Text</Label>
            <Textarea
              id="text2"
              placeholder="Enter your text"
              value={text2}
              onChange={(e) => {
                setText2(e.target.value);
              }}
            />
            <UploadButton
              className="ut-button:bg-black ut-button:text-white dark:ut-button:bg-white dark:ut-button:text-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFileUrl2(res[0].url);
              }}
            />
            <Input
              value={fileUrl2}
              id="imageUrl2"
              placeholder="Image URL"
              disabled
            />
            <Label htmlFor="title3">Title</Label>
            <Input
              id="title3"
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
          <div className="flex flex-col gap-4">
            <Label htmlFor="videoName">Video name</Label>
            <Input
              id="videoName"
              placeholder="Enter your video name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Label htmlFor="videoUrl">Upload your video here</Label>
            <UploadButton
              className="ut-button:bg-black ut-button:text-white dark:ut-button:bg-white dark:ut-button:text-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setVideoUrl(res[0].url);
              }}
            />
            <Input
              value={videoUrl}
              id="videoUrl"
              placeholder="Video URL"
              disabled
            />
          </div>
        )}
        {selectedTask === 'TIPS' && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="tipsName">Tips name</Label>
            <Input
              id="tipsName"
              placeholder="Enter your tips name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Label htmlFor="title1">Tip 1</Label>
            <Input
              id="title1"
              placeholder="Enter your title"
              value={title1}
              onChange={(e) => {
                setTitle1(e.target.value);
              }}
            />
            <Label htmlFor="text1">Text</Label>
            <Textarea
              id="text1"
              placeholder="Enter your text"
              value={text1}
              onChange={(e) => {
                setText1(e.target.value);
              }}
            />
            <UploadButton
              className="ut-button:bg-black ut-button:text-white dark:ut-button:bg-white dark:ut-button:text-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFileUrl(res[0].url);
              }}
            />
            <Input
              value={fileUrl}
              id="imageUrl"
              placeholder="Image URL"
              disabled
            />
            <Label htmlFor="title2">Tip 2</Label>
            <Input
              id="title2"
              placeholder="Enter your title"
              value={title2}
              onChange={(e) => {
                setTitle2(e.target.value);
              }}
            />
            <Label htmlFor="text2">Text</Label>
            <Textarea
              id="text2"
              placeholder="Enter your text"
              value={text2}
              onChange={(e) => {
                setText2(e.target.value);
              }}
            />
            <UploadButton
              className="ut-button:bg-black ut-button:text-white dark:ut-button:bg-white dark:ut-button:text-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFileUrl2(res[0].url);
              }}
            />
            <Input
              value={fileUrl2}
              id="imageUrl2"
              placeholder="Image URL"
              disabled
            />
            <Label htmlFor="title3">Tip 3</Label>
            <Input
              id="title3"
              placeholder="Enter your title"
              value={title3}
              onChange={(e) => {
                setTitle3(e.target.value);
              }}
            />
            <Label htmlFor="text3">Text</Label>
            <Textarea
              id="text3"
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
