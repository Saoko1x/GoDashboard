'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useToast } from '@/components/ui/use-toast';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { trpc } from '@/server/client';

export default function ProfileForm() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const { mutate } = trpc.auth.updateProfile.useMutation();

  const form = useForm<{ name: string; email: string }>({
    mode: 'onChange'
  });

  function onSubmit(data: { name: string; email: string }) {
    mutate({ name, email });
    toast({
      title: 'Profile updated successfully',
      description: `${data.name} ${data.email}`
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={'Company Name'}
                  {...field}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormDescription>This is your company name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={'demo@gmail.com'}
                  {...field}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormDescription>This is your company email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
