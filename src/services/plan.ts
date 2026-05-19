import { getAllPlan } from '@/db/plan/read';

export async function getPlans() {
  return await getAllPlan();
}
