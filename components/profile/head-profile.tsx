import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Profile" description="Manage your profile" />
      </div>
      <Separator />
    </>
  );
}
