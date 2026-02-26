import * as z from 'zod';

export const loginSchema = z
  .object({
    email: z.email('Enter valid email').nonempty('Enter valid email'),
    password: z
      .string()
      .nonempty('Please Enter your password')
      .min(8, 'password must be at least 8 characters'),

  });

  export type loginSchemaType = z.infer<typeof loginSchema>