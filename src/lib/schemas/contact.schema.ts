import { z } from 'zod';

import {
  bigTextSchema,
  emailSchema,
  nameSchema,
  phoneSchema,
  shortTextSchema,
} from './base.schema';

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: shortTextSchema,
  message: bigTextSchema,
});
