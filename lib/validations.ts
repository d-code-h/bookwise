import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 character long'),
  email: z.string().email('Invalid email address'),
  universityId: z.coerce.number().int('University ID must be a number'),

  universityCard: z.string().nonempty('University card is required'),
  password: z.string().min(8, 'Password must be at least 8 character long'),
});
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 character long'),
});
