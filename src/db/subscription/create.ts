import { prisma } from '@/lib/prisma';

export async function createPendingSubscription(data: {
  firebase_uid: string;
  plan_id: string;
  paypal_subscription_id: string;
}) {
  return prisma.subscription.upsert({
    where: {
      paypal_subscription_id: data.paypal_subscription_id,
    },
    update: {}, // do nothing if already exists
    create: {
      firebase_uid: data.firebase_uid,
      plan_id: data.plan_id,
      paypal_subscription_id: data.paypal_subscription_id,
      status: 'APPROVAL_PENDING',
    },
  });
}
