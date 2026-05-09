import { withAuth } from '@/lib/auth/withAuth';
import { getCurrentUserSubscription } from '@/services/subscription';

export async function GET() {
  return withAuth(async (userId) => {
    const data = await getCurrentUserSubscription(userId);

    return Response.json(data);
  });
}
