import React from 'react';
import { Heading } from '../ui/heading';

import { Separator } from '../ui/separator';
import DialogTraining from './dialog-training';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Training" description="List of all courses" />
        <DialogTraining>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add course
          </Button>
        </DialogTraining>
      </div>
      <Separator />
    </>
  );
}
