'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React from 'react';
import { trpc } from '@/server/client';
import { toast } from '@/components/ui/use-toast';

// Esquema de validación para login y signup
const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

const signupSchema = loginSchema.extend({
  companyName: z.string().min(1, { message: 'Company name is required' })
});

type LoginFormValue = z.infer<typeof loginSchema>;
type SignupFormValue = z.infer<typeof signupSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const defaultValues = {
    email: '',
    password: ''
  };

  const form = useForm<LoginFormValue | SignupFormValue>({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
    defaultValues
  });

  const signUpMutation = trpc.auth.signUp.useMutation();

  const handleSignUp = async (data: SignupFormValue) => {
    try {
      const user = await signUpMutation.mutateAsync({
        email: data.email,
        password: data.password,
        name: data.companyName
      });
      console.log('User created:', user);
      toast({
        title: 'User created successfully, please log in',
        description: 'User created successfully, please log in'
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: 'Failed to create user',
        description: 'Please try again.'
      });
      throw error;
    }
  };

  const onSubmit = async (data: LoginFormValue | SignupFormValue) => {
    setLoading(true);
    try {
      if (isSignup) {
        await handleSignUp(data as SignupFormValue);
      } else {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
          callbackUrl: callbackUrl ?? '/dashboard'
        });
        if (result?.error) {
          toast({
            title: 'Invalid email or password',
            description: 'Invalid email or password'
          });
        } else {
          toast({
            title: 'Logged in successfully',
            description: 'Logged in successfully'
          });
          // Redirect manually after successful login
          window.location.href = result?.url || '/dashboard';
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An unexpected error occurred',
        description: 'Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          {isSignup && (
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your company name..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {isSignup ? 'Sign Up' : 'Continue With Email'}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            <a
              href="#"
              onClick={() => setIsSignup(!isSignup)}
              className="underline"
            >
              {isSignup ? 'Already have an account? Log in' : 'or sign up'}
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
