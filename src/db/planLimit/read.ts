import { prisma } from '@/lib/prisma';

export async function getPlanLimit(plan_id: string) {
  return prisma.planLimit.findFirst({
    where: { plan_id },
  });
}
