'use client';
import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';
import DialogBoost from './dialog-boost';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="Boost your business"
          description="Increase your business with our boost program"
        />
        <DialogBoost onUpdate={() => {}}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add task
          </Button>
        </DialogBoost>
      </div>
      <Separator />
    </>
  );
}
