import { parsePhoneNumberFromString } from 'libphonenumber-js';
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

export const phoneSchema = z
  .string()
  .trim()
  .transform((value, ctx) => {
    const phone = value.startsWith('+')
      ? parsePhoneNumberFromString(value)
      : parsePhoneNumberFromString(value, 'AU');

    if (!phone?.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid phone number',
      });

      return z.NEVER;
    }

    return phone.number; // E.164
  });

export const shortTextSchema = z
  .string()
  .trim()
  .min(3, 'Subject must be at least 3 characters')
  .max(100, 'Subject cannot exceed 100 characters');

export const bigTextSchema = z
  .string()
  .trim()
  .min(10, 'Message must be at least 10 characters')
  .max(2000, 'Message cannot exceed 2000 characters');
