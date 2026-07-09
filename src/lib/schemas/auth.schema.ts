import { z } from 'zod';

import { emailSchema, nameSchema, passwordSchema } from './base.schema';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

export const resetSchema = z.object({
  email: emailSchema,
});
