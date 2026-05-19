import { prisma } from '@/lib/prisma';

export async function canUserGenerateText(data: {
  firebase_uid: string;
  plan_id: string;
}) {
  const usage = await prisma.usage.findFirst({
    where: {
      firebase_uid: data.firebase_uid,
      plan_id: data.plan_id,
      period_end: { gte: new Date() },
    },
  });

  const limit = await prisma.planLimit.findFirst({
    where: {
      plan_id: data.plan_id,
      interval: 'MONTH',
    },
  });

  if (!usage || !limit) return false;

  return usage.text_count < limit.text_limit;
}

export async function getUserUsage(firebase_uid: string, plan_id: string) {
  return prisma.usage.findFirst({
    where: {
      firebase_uid,
      plan_id,
    },
  });
}
