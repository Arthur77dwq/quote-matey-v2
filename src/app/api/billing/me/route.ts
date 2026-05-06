import { withAuth } from '@/lib/auth/withAuth';
import {
  ensureUserSubscription,
  getCurrentUserSubscription,
} from '@/services/subscription';

export async function GET() {
  return withAuth(async (userId) => {
    await ensureUserSubscription(userId);
    const data = await getCurrentUserSubscription(userId);

    return Response.json(data);
  });
}
