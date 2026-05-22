import { SubscriptionStatus } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function activateSubscriptionDB(data: {
  paypal_subscription_id: string;
  start_date?: Date;
  next_billing_date?: Date;
}) {
  return prisma.subscription.updateMany({
    where: {
      paypal_subscription_id: data.paypal_subscription_id,
      status: { not: SubscriptionStatus.ACTIVE },
    },
    data: {
      status: SubscriptionStatus.ACTIVE,
      start_date: data.start_date,
      next_billing_date: data.next_billing_date,
    },
  });
}

export async function activateSubscriptionByID(
  firebase_uid: string,
  id: string,
) {
  return prisma.subscription.update({
    where: { firebase_uid, id, status: { not: SubscriptionStatus.ACTIVE } },
    data: {
      status: SubscriptionStatus.ACTIVE,
      end_date: new Date(),
    },
  });
}

export async function deactivateOtherActiveSubscriptions(
  uid: string,
  paypal_subscription_id: string,
) {
  return prisma.subscription.updateMany({
    where: {
      firebase_uid: uid,
      status: SubscriptionStatus.ACTIVE,
      OR: [
        { paypal_subscription_id: { not: paypal_subscription_id } },
        { paypal_subscription_id: null },
      ],
    },
    data: {
      status: SubscriptionStatus.INACTIVE,
    },
  });
}

export async function cancelSubscriptionDB(paypal_subscription_id: string) {
  return prisma.subscription.update({
    where: { paypal_subscription_id },
    data: {
      status: SubscriptionStatus.CANCELLED,
      end_date: new Date(),
    },
  });
}

export async function markCancelAtPeriodEnd(
  firebase_uid: string,
  paypal_subscription_id: string,
) {
  return prisma.subscription.update({
    where: { firebase_uid, paypal_subscription_id },
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
      status: SubscriptionStatus.SUSPENDED,
    },
  });
}
