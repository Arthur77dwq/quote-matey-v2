import { prisma } from '@/lib/prisma';

export async function getActiveSubscriptionByUser(firebase_uid: string) {
  const now = new Date();

  return prisma.subscription.findFirst({
    where: {
      firebase_uid,
      OR: [
        {
          status: 'ACTIVE',
        },
        {
          cancel_at_period_end: true,
          end_date: {
            gt: now, // still within access period
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
