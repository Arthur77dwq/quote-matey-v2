import { prisma } from '@/lib/prisma';
import { SubscriptionStatus } from '@/types/subscription';

export async function getSubscriptionByUser(
  firebase_uid: string,
  status?: SubscriptionStatus,
) {
  const now = new Date();

  return prisma.subscription.findMany({
    where: {
      firebase_uid,

      ...(status && {
        status,
      }),

      OR: [
        {
          cancel_at_period_end: false,
        },

        {
          cancel_at_period_end: true,

          end_date: {
            gt: now,
          },
        },
        {
          cancel_at_period_end: true,

          next_billing_date: {
            gt: now,
          },
        },
      ],
    },

    include: {
      plan: true,
    },
  });
}

export async function getUserSubscriptionById(params: {
  firebase_uid: string;
  paypal_subscription_id: string;
}) {
  return prisma.subscription.findFirst({
    where: {
      firebase_uid: params.firebase_uid,
      paypal_subscription_id: params.paypal_subscription_id,
    },
  });
}

export async function getSubscriptionByPaypalId(
  paypal_subscription_id: string,
) {
  return prisma.subscription.findUnique({
    where: {
      paypal_subscription_id,
    },
  });
}
