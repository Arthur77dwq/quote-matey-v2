import { getAllPlan } from '@/db/plan/read';
import { withAuth } from '@/lib/auth/withAuth';

export async function GET() {
  return withAuth(async () => {
    const data = await getAllPlan();

    return Response.json(data);
  });
}
