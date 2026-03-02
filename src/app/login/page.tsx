'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginSchema, loginSchemaType } from '@/Schema/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { sign } from 'node:crypto';
import Link from 'next/link';

export default function page() {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get('callBackUrl');
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  async function onLogin(values: loginSchemaType) {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: callBackUrl ?? '/',
      redirect: false,
    });
    if (res?.ok) {
      toast.success('Login successful!');
      route.push('/');
    } else {
      toast.error(res?.error);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 sm:p-10 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-500">
            Sign in to continue to <span className="text-green-500">FreshCart</span>
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onLogin)}
          className="space-y-5"
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  className="focus:ring-green-400 focus:border-green-400"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="off"
                  className="focus:ring-green-400 focus:border-green-400"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            type="submit"
            className="cursor-pointer w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center text-gray-500">
          Don’t have an account?{' '}
          <Link
          href={'/register'}
            onClick={() => route.push('/register')}
            className="text-green-500 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
