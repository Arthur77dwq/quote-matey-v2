import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Minimum 8 characters')
  .regex(/[A-Z]/, 'Must include uppercase letter')
  .regex(/[a-z]/, 'Must include lowercase letter')
  .regex(/[0-9]/, 'Must include a number')
  .regex(/[^A-Za-z0-9]/, 'Must include special character');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name is too long')
  .trim()
  .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, {
    message: 'Enter a valid name',
  });

export const emailSchema = z
  .string()
  .min(1, 'Email required')
  .email('Enter valid email');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

export type loginFormData = z.infer<typeof loginSchema>;
export type signUpFormData = z.infer<typeof signUpSchema>;
