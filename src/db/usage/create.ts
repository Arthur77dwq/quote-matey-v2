import { prisma } from '@/lib/prisma';

export async function createUsage(data: {
  firebase_uid: string;
  plan_id: string;
  period_start: Date;
  period_end: Date;
}) {
  return prisma.usage.create({
    data: {
      firebase_uid: data.firebase_uid,
      plan_id: data.plan_id,
      period_start: data.period_start,
      period_end: data.period_end,
      text_count: 0,
      image_count: 0,
    },
  });
}
