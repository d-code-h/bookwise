'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';

import React, { useEffect, useState } from 'react';
import { ZodType } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import FileUpload from './FileUpload';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === 'SIGN_IN';
  const [pending, setPending] = useState(false);

  const router = useRouter();
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setPending(true);
    const result = await onSubmit(data);

    if (result.success) {
      toast.success('Successfully signed in', {
        description: isSignIn
          ? 'You have successfully signed in to your account'
          : 'You have successfully created your account',
      });

      router.push('/');
    } else {
      toast.error(`Error ${isSignIn ? 'signing in' : 'signing up'}`, {
        description:
          result.error ?? 'An error occurred. Please try again later',
      });
    }
    setPending(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome back to BookWise' : 'Create your library account'}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? 'Access the vast collection of books and manage your library'
          : 'Please complete all fields and upload a valid university ID to gain access to the library'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field, index) => (
            <FormField
              key={index}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'universityCard' ? (
                      <div>
                        <FileUpload
                          type="image"
                          accept="image/*"
                          placeholder="Upload your ID"
                          folder="ids"
                          variant="dark"
                          onFileChange={field.onChange}
                        />
                      </div>
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            disabled={pending}
            className={cn(
              'form-btn',
              pending ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
          >
            {pending ? 'Loading...' : isSignIn ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? 'New to BookWise? ' : 'Already have an account? '}
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-bold text-primary"
        >
          {isSignIn ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
