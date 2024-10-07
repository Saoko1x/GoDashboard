import React from 'react';
import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Users" description="List of all users" />
      </div>
      <Separator />
    </>
  );
}
