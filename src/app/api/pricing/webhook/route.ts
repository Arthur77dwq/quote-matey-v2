import { markPaymentFailedDB, markPaymentSuccessDB } from '@/db/subscription';
import { verifyPaypalWebhook } from '@/lib/paypal';
import { PaypalWebhookEvent } from '@/lib/paypal/schema';
import {
  activateSubscriptionService,
  cancelSubscriptionService,
} from '@/services/subscription';

export async function POST(req: Request) {
  const body = await req.json();
  const headers = Object.fromEntries(req.headers.entries());

  const isSandbox = process.env.PAYPAL_ENV === 'sandbox';

  const isValid = await verifyPaypalWebhook({
    headers,
    body,
    webhookId: isSandbox
      ? process.env.PAYPAL_SANDBOX_WEBHOOK_ID!
      : process.env.PAYPAL_LIVE_WEBHOOK_ID!,
  });

  if (!isValid) {
    return new Response('Invalid signature', { status: 400 });
  }

  await handlePaypalWebhook(body);

  return new Response('OK');
}

export async function handlePaypalWebhook(event: PaypalWebhookEvent) {
  switch (event.event_type) {
    //  ACTIVATED
    case 'BILLING.SUBSCRIPTION.ACTIVATED': {
      await activateSubscriptionService(event);
      break;
    }

    //  CANCELLED
    case 'BILLING.SUBSCRIPTION.CANCELLED': {
      await cancelSubscriptionService(event.resource.id);
      break;
    }

    //  PAYMENT SUCCESS
    case 'PAYMENT.SALE.COMPLETED': {
      await markPaymentSuccessDB({
        paypal_subscription_id:
          event.resource.billing_agreement_id ?? event.resource.id,
        amount: Math.round(parseFloat(event.resource.amount.total) * 100),
        currency: event.resource.amount.currency,
        date: new Date(event.create_time),
      });
      break;
    }

    //  PAYMENT FAILED
    case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED': {
      await markPaymentFailedDB(event.resource.id);
      break;
    }

    // //  Exhaustive check (VERY IMPORTANT)
    // default: {
    //   const _exhaustive: never = event;
    //   console.log('Unhandled event:', _exhaustive);
    // }
  }
}
