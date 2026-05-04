import { prisma } from '@/lib/prisma';

export async function getUserActiveSubscription(firebase_uid: string) {
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

export async function canUserUseFeature(params: {
  firebase_uid: string;
  type: 'text' | 'image';
}) {
  const sub = await getUserActiveSubscription(params.firebase_uid);

  if (!sub) return false;

  const usage = await prisma.usage.findFirst({
    where: {
      firebase_uid: params.firebase_uid,
      plan_id: sub.plan_id,
    },
  });

  const limit = await prisma.planLimit.findFirst({
    where: {
      plan_id: sub.plan_id,
    },
  });

  if (!usage || !limit) return false;

  if (params.type === 'text') {
    return usage.text_count < limit.text_limit;
  }

  if (params.type === 'image') {
    return usage.image_count < limit.image_limit;
  }

  return false;
}
