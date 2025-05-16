import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .email('Please enter a valid email address.')
      .min(1, 'Email is required.'),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });
