import { prisma } from '@/lib/prisma';

export async function getPlanById(planId: string) {
  const plan = await prisma.plan.findFirst({
    where: {
      OR: [
        {
          id: planId,
        },
        {
          paypal_plan_id: planId,
        },
      ],
    },
  });

  if (!plan) {
    throw new Error('Invalid plan');
  }

  return plan;
}

export async function getAllPlan() {
  const plans = await prisma.plan.findMany();
  return plans;
}
