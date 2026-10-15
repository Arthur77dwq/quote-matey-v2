import { z } from 'zod';

import {
  bigTextSchema,
  emailSchema,
  nameSchema,
  phoneSchema,
  shortTextSchema,
} from './base.schema';

const optionalField = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim() === '' ? undefined : value,
    schema.optional(),
  );

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: optionalField(phoneSchema),
  subject: optionalField(shortTextSchema),
  message: optionalField(bigTextSchema),
});
