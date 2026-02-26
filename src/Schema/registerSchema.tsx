import * as z from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty('Please Enter Name')
      .min(3, 'name must be at least 3 characters'),
    phone: z
      .string()
      .nonempty('Please Enter Your Phone')
      .regex(/^01[1250][0-9]{8}$/),
    email: z.email('Enter valid email').nonempty('Enter valid email'),
    password: z
      .string()
      .nonempty('Please Enter your password')
      .min(8, 'password must be at least 8 characters'),
    rePassword: z
      .string()
      .nonempty('Please Enter re password')
      .min(8, 're-password must be at least 8 characters'),
  })
  .refine((data) => data.password == data.rePassword, {
    path: ['rePassword'],
    error: 'password and repassword must be match',
  });

  export type registerSchemaType = z.infer<typeof registerSchema>