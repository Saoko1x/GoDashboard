import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormControl,
  FormItem,
  FormMessage
} from '@/components/ui';
import { useState } from 'react';

function UserAuthForm() {
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    // Implement your login logic here
    setLoading(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <form>
          <FormItem>
            <FormControl>
              <input
                type="email"
                placeholder="Enter your email..."
                disabled={loading}
                {...control.register('email')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormControl>
              <input
                type="password"
                placeholder="Enter your password..."
                disabled={loading}
                {...control.register('password')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Continue With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            <Link href="/signup" className="underline">
              or sign up
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default UserAuthForm;
