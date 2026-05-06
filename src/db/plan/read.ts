import { prisma } from '@/lib/prisma';

export async function getPlanById(planId: string) {
  const plan = await prisma.plan.findUnique({
    where: { id: planId },
  });

  if (!plan) {
    throw new Error('Invalid plan');
  }

  return plan;
}
