'use client';
import { Heading } from '../ui/heading';
import DialogWeek from '@/components/system/dialog-system';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Weeks" description="List of all the weeks." />
        <DialogWeek onUpdate={() => {}}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add week
          </Button>
        </DialogWeek>
      </div>
      <Separator />
    </>
  );
}
