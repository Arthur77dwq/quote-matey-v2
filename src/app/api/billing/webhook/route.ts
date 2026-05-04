import {
  activateSubscriptionDB,
  cancelSubscriptionDB,
  markPaymentFailedDB,
  markPaymentSuccessDB,
} from '@/db/subscription';
import { verifyPaypalWebhook } from '@/lib/paypal';
import { PaypalWebhookEvent } from '@/lib/paypal/schema';

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

function toDate(value?: string) {
  if (!value) return undefined;

  const date = new Date(value);

  return isNaN(date.getTime()) ? undefined : date;
}

export async function handlePaypalWebhook(event: PaypalWebhookEvent) {
  switch (event.event_type) {
    //  ACTIVATED
    case 'BILLING.SUBSCRIPTION.ACTIVATED': {
      await activateSubscriptionDB({
        paypal_subscription_id: event.resource.id,
        start_date: toDate(event.resource.start_time),

        // safer optional chaining
        next_billing_date: event.resource.billing_info?.next_billing_time
          ? toDate(event.resource.billing_info.next_billing_time)
          : undefined,
      });
      break;
    }

    //  CANCELLED
    case 'BILLING.SUBSCRIPTION.CANCELLED': {
      await cancelSubscriptionDB(event.resource.id);
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
