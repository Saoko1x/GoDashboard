'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
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
  children,
  trainingNameProp,
  trainingId
}: {
  children: React.ReactNode;
  trainingNameProp?: string;
  trainingId?: number;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const parsedUserId = parseInt(userId as string);
  const [trainingName, setTrainingName] = React.useState('');
  const addTraining = trpc.training.create.useMutation();
  const { data: trainings, refetch } = trpc.training.get.useQuery();

  const updateTraining = trpc.training.update.useMutation();

  const handleAddTraining = () => {
    addTraining.mutate({
      companyId: parsedUserId,
      name: trainingName
    });
  };

  const handleUpdateTraining = () => {
    updateTraining.mutate({
      id: trainingId as number,
      name: trainingName
    });
  };

  React.useEffect(() => {
    if (trainingNameProp) {
      setTrainingName(trainingNameProp);
    }
  }, [trainingNameProp]);

  const handleButton = () => {
    if (trainingNameProp) {
      handleUpdateTraining();
      refetch();
    } else {
      handleAddTraining();
      refetch();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {trainingNameProp ? 'Update' : 'Add new'} course
          </DialogTitle>
          <DialogDescription>Enter the name of the course.</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Course title"
          value={trainingName}
          onChange={(e) => {
            setTrainingName(e.target.value);
          }}
        />

        <DialogFooter>
          <Button type="submit" onClick={handleButton}>
            {trainingNameProp ? 'Update course' : 'Add course'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
