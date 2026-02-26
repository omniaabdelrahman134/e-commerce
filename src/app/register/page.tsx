'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { registerSchema, registerSchemaType } from '@/Schema/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RegisterAction } from '../_actions/registerAction';
import { useRouter } from 'next/navigation';
import { use } from 'react';


export default function page() {
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: registerSchemaType) {
    const x = await RegisterAction(values);

    console.log(x);

    if (x) {
      toast.success('Register Success', { position: 'top-center' });
      form.reset();
      route.push('/login');
    } else {
      toast.error('Register Failed', { position: 'top-center' });
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 sm:p-10 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Create Account
          </h1>
          <p className="mt-2 text-gray-500">
            Join <span className="text-green-500">FreshCart</span> today
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your name"
                  autoComplete="off"
                  className="focus:ring-green-400 focus:border-green-400"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

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
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="tel"
                  placeholder="Enter your phone number"
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

          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Re-enter your password"
                  autoComplete="off"
                  className="focus:ring-green-400 focus:border-green-400"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Register
          </Button>
        </form>

        <div className="mt-6 text-center text-gray-500">
          Already have an account?{' '}
          <span
            onClick={() => route.push('/login')}
            className="text-green-500 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </div>a
    </>
  );
}
