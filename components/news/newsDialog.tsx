import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { DatePickerWithRange } from './datePicker';

export default function NewsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add promotion</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Promotions</DialogTitle>
          <DialogDescription>
            Add a promotion to your profile to increase your visibility
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name" />
              <Label htmlFor="image">Image</Label>
              <Input id="file" placeholder="File" type="file" />
              <Label htmlFor="url">Link</Label>
              <Input id="url" placeholder="URL" />
              <Label htmlFor="date">Start/End Date</Label>
              <DatePickerWithRange />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Add promotion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
