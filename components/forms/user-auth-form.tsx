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
import Link from 'next/link';
import React from 'react';
import { trpc } from '@/server/client';

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
  const [isSignup, setIsSignup] = useState(false); // Estado para cambiar entre login y signup

  const defaultValues = {
    email: 'jemg2510@gmail.com',
    password: '123456'
  };

  // Cambia el esquema de validación según el estado
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
        name: data.companyName // Assuming you want to use companyName as the username
      });
      console.log('User created:', user);
      // Handle successful signup (e.g., redirect, show success message)
      alert('User created successfully, please log in');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Rethrow to be caught in onSubmit
    }
  };

  const onSubmit = async (data: LoginFormValue | SignupFormValue) => {
    setLoading(true);
    try {
      if (isSignup) {
        await handleSignUp(data as SignupFormValue);
      } else {
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl: callbackUrl ?? '/dashboard'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display error message to user)
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
              onClick={() => setIsSignup(!isSignup)} // Cambiar entre login y signup
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
