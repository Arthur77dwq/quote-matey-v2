import { z } from 'zod';

import { emailSchema, passwordSchema, tncSchema } from './base.schema';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  tnc: tncSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const resetSchema = z.object({
  email: emailSchema,
});
