import { Heading } from '../ui/heading';
import { Separator } from '../ui/separator';

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="Info, News and Promotions"
          description="Stay updated with our latest news and promotions"
        />
      </div>
      <Separator />
    </>
  );
}