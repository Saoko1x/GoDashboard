'use client';
import React from 'react';
import { Heading } from '../ui/heading';

import { Separator } from '../ui/separator';
import DialogTask from './dialog-task-training';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export default function Page({ trainingId }: { trainingId: any }) {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="Tasks"
          description="See all your tasks or create a new one."
        />
        <DialogTask trainingId={trainingId} onUpdate={() => {}}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add task
          </Button>
        </DialogTask>
      </div>
      <Separator />
    </>
  );
}
