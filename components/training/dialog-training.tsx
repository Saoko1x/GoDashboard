'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
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
import { useCompanyId } from '@/hooks/useCompanyid';

export default function DialogWeek({
  children,
  trainingNameProp,
  trainingId,
  onUpdate
}: {
  children: React.ReactNode;
  trainingNameProp?: string;
  trainingId?: number;
  onUpdate: () => void;
}) {
  const { companyId } = useCompanyId();
  const [trainingName, setTrainingName] = React.useState('');
  const [isOpen, setIsOpen] = useState(false);

  const addTraining = trpc.training.create.useMutation({
    onSuccess: () => {
      setIsOpen(false);
      utils.training.getByCompanyId.invalidate({ companyId: companyId });
      onUpdate();
    }
  });
  const utils = trpc.useContext();

  const updateTraining = trpc.training.update.useMutation({
    onSuccess: () => {
      utils.training.getByCompanyId.invalidate({ companyId: companyId });
      setIsOpen(false);
      onUpdate();
    }
  });

  const handleAddTraining = () => {
    addTraining.mutate({
      companyId: companyId,
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
    } else {
      handleAddTraining();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
