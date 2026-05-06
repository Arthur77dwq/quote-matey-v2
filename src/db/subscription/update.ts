import { prisma } from '@/lib/prisma';

export async function activateSubscriptionDB(data: {
  paypal_subscription_id: string;
  start_date?: Date;
  next_billing_date?: Date;
}) {
  return prisma.subscription.updateMany({
    where: {
      paypal_subscription_id: data.paypal_subscription_id,
      status: { not: 'ACTIVE' },
    },
    data: {
      status: 'ACTIVE',
      start_date: data.start_date,
      next_billing_date: data.next_billing_date,
    },
  });
}

export async function cancelSubscriptionDB(paypal_subscription_id: string) {
  return prisma.subscription.update({
    where: { paypal_subscription_id },
    data: {
      status: 'CANCELLED',
      end_date: new Date(),
    },
  });
}

export async function markCancelAtPeriodEnd(paypal_subscription_id: string) {
  return prisma.subscription.update({
    where: { paypal_subscription_id },
    data: {
      cancel_at_period_end: true,
    },
  });
}

export async function markPaymentSuccessDB(data: {
  paypal_subscription_id: string;
  amount: number;
  currency: string;
  date: Date;
}) {
  return prisma.subscription.update({
    where: {
      paypal_subscription_id: data.paypal_subscription_id,
    },
    data: {
      last_payment_date: data.date,
      last_payment_amount: data.amount,
      currency: data.currency,
    },
  });
}

export async function markPaymentFailedDB(paypal_subscription_id: string) {
  return prisma.subscription.update({
    where: { paypal_subscription_id },
    data: {
      status: 'SUSPENDED',
    },
  });
}
