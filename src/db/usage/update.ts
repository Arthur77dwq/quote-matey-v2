import { prisma } from '@/lib/prisma';

export async function resetUsageForNewCycle(data: {
  firebase_uid: string;
  plan_id: string;
  next_billing_date: Date;
}) {
  return prisma.usage.create({
    data: {
      firebase_uid: data.firebase_uid,
      plan_id: data.plan_id,
      period_start: new Date(),
      period_end: data.next_billing_date,
      text_count: 0,
      image_count: 0,
    },
  });
}

export async function incrementTextUsage(data: {
  firebase_uid: string;
  plan_id: string;
}) {
  return prisma.usage.updateMany({
    where: {
      firebase_uid: data.firebase_uid,
      plan_id: data.plan_id,
      period_end: {
        gte: new Date(),
      },
    },
    data: {
      text_count: {
        increment: 1,
      },
    },
  });
}
