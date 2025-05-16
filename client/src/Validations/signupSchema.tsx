import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 8 characters'),
  dateOfBirth: z.string().refine(
    (dob) => {
      const parsedDate = new Date(dob);
      return !isNaN(parsedDate.getTime());
    },
    {
      message: 'Invalid date of birth format',
    },
  ),
});
