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

export async function createNewUserFreeSubscription(firebaseUid: string) {
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      firebase_uid: firebaseUid,
    },
  });

  if (existingSubscription) {
    return existingSubscription;
  }

  const freePlan = await prisma.plan.findFirst({
    where: {
      isFree: true,
      isActive: true,
    },

    include: {
      limits: true,
    },
  });

  if (!freePlan) {
    throw new Error('Free plan not found');
  }

  const now = new Date();

  const nextMonth = new Date(now);

  nextMonth.setMonth(nextMonth.getMonth() + 1);

  return prisma.$transaction(async (tx) => {
    const subscription = await tx.subscription.create({
      data: {
        firebase_uid: firebaseUid,

        plan_id: freePlan.id,

        status: 'ACTIVE',

        start_date: now,
      },
    });

    await Promise.all(
      freePlan.limits.map((limit) =>
        tx.usage.create({
          data: {
            firebase_uid: firebaseUid,

            plan_id: freePlan.id,

            text_count: 0,
            image_count: 0,

            period_start: now,

            period_end:
              limit.interval === 'WEEK'
                ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                : nextMonth,
          },
        }),
      ),
    );

    return subscription;
  });
}
