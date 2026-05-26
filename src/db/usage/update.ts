import { prisma } from '@/lib/prisma';

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

export async function incrementImageUsage(data: {
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
      image_count: {
        increment: 1,
      },
    },
  });
}

const PAGE_SIZE = 100;

function getNextWeekDate() {
  const nextWeek = new Date();

  nextWeek.setDate(nextWeek.getDate() + 7);

  return nextWeek;
}

export async function getFreePlanUsagePage(page: number) {
  return prisma.usage.findMany({
    where: {
      plan_id: 'free_v1',
      period_end: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
    },
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    orderBy: {
      createdAt: 'asc',
    },
  });
}

export async function resetUsageCycle(id: string) {
  return prisma.usage.update({
    where: {
      id,
    },
    data: {
      text_count: 0,
      image_count: 0,
      period_start: new Date(),
      period_end: getNextWeekDate(),
    },
  });
}
