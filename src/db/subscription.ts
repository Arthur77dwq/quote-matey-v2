import { prisma } from '@/lib/prisma';

export async function createPendingSubscription(data: {
  firebase_uid: string;
  plan_id: string;
  paypal_subscription_id: string;
}) {
  return prisma.subscription.create({
    data: {
      firebase_uid: data.firebase_uid,
      plan_id: data.plan_id,
      paypal_subscription_id: data.paypal_subscription_id,
      status: 'APPROVAL_PENDING',
    },
  });
}

export async function activateSubscription(data: {
  paypal_subscription_id: string;
  start_date?: Date;
  next_billing_date?: Date;
}) {
  return prisma.subscription.update({
    where: {
      paypal_subscription_id: data.paypal_subscription_id,
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

export async function updatePaymentInfo(data: {
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
