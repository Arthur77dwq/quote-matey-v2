import { withAuth } from '@/lib/auth/withAuth';
import { getCurrentUserSubscription } from '@/services/subscription';

export async function GET(req: Request) {
  return withAuth(req, async (userId) => {
    const data = await getCurrentUserSubscription(userId);

    return Response.json(data);
  });
}
