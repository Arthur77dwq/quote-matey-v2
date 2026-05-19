import { z } from 'zod';

/* ---------- Base ---------- */
const base = z.object({
  id: z.string(),
  event_type: z.string(),
  create_time: z.string(),
  resource_type: z.string(),
});

/* ---------- Resources ---------- */
const subscription = z.object({
  id: z.string(),
  status: z.string(),
  plan_id: z.string().optional(),
  subscriber: z
    .object({
      email_address: z.string().email(),
      payer_id: z.string(),
    })
    .optional(),
  start_time: z.string().optional(),
  billing_info: z
    .object({
      next_billing_time: z.string().optional(),
    })
    .optional(),
});

const payment = z.object({
  id: z.string(),
  state: z.string(),
  billing_agreement_id: z.string().optional(),
  amount: z.object({
    total: z.string(),
    currency: z.string(),
  }),
});

/* ---------- Discriminated Union ---------- */
export const PaypalWebhookSchema = z.discriminatedUnion('event_type', [
  base.extend({
    event_type: z.literal('BILLING.SUBSCRIPTION.ACTIVATED'),
    resource: subscription,
  }),

  base.extend({
    event_type: z.literal('BILLING.SUBSCRIPTION.CANCELLED'),
    resource: subscription,
  }),

  base.extend({
    event_type: z.literal('BILLING.SUBSCRIPTION.PAYMENT.FAILED'),
    resource: subscription,
  }),

  base.extend({
    event_type: z.literal('PAYMENT.SALE.COMPLETED'),
    resource: payment,
  }),
]);

/* ---------- Type (auto inferred) ---------- */
export type PaypalWebhookEvent = z.infer<typeof PaypalWebhookSchema>;
