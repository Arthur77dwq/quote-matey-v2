import {
  CreateSubscriptionBody,
  PaypalSubscriptionResponse,
} from '@/types/paypal/subscription';

import { paypalHttp } from './http';

// CREATE SUBSCRIPTION (PayPal only)
export async function createSubscription(params: { planId: string }) {
  const body: CreateSubscriptionBody = {
    plan_id: params.planId,
    application_context: {
      brand_name: 'Quote Matey',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/cancel`,
      user_action: 'SUBSCRIBE_NOW',
    },
  };

  const data = await paypalHttp<
    PaypalSubscriptionResponse,
    CreateSubscriptionBody
  >('/v1/billing/subscriptions', 'POST', body);

  const approvalUrl = data.links.find((link) => link.rel === 'approve')?.href;

  if (!approvalUrl) {
    throw new Error('PayPal approval URL not found');
  }

  return {
    id: data.id,
    approvalUrl,
  };
}

// CANCEL SUBSCRIPTION (PayPal only)
export async function cancelSubscription(params: {
  subId: string;
  reason?: string;
}) {
  await paypalHttp<unknown, { reason?: string }>(
    `/v1/billing/subscriptions/${params.subId}/cancel`,
    'POST',
    {
      reason: params.reason || 'User requested cancellation',
    },
  );

  return { success: true };
}
