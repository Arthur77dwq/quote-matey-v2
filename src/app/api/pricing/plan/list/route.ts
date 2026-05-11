import { getAllPlan } from '@/db/plan/read';

export async function GET() {
  const data = await getAllPlan();

  return Response.json(data);
}
