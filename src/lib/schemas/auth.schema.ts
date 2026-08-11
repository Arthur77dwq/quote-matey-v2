import { z } from 'zod';

import { emailSchema, passwordSchema, tncSchema } from './base.schema';

export const loginSchema = z.object({
  type: z.literal('login'),
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  type: z.literal('signup'),
  tnc: tncSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const resetSchema = z.object({
  type: z.literal('reset-password'),
  email: emailSchema,
});
