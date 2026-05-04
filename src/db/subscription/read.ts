import { prisma } from '@/lib/prisma';

export async function getActiveSubscriptionByUser(firebase_uid: string) {
  return prisma.subscription.findFirst({
    where: {
      firebase_uid,
      status: 'ACTIVE',
    },
    include: {
      plan: true,
    },
  });
}
