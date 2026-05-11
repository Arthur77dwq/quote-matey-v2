import { withAuth } from '@/lib/auth/withAuth';
import { cancelSubscriptionService } from '@/services/subscription';

export async function POST(req: Request) {
  return withAuth(async (firebase_uid) => {
    try {
      const body = await req.json();
      const { subscriptionId } = body;

      if (!subscriptionId) {
        return new Response('subscriptionId is required', { status: 400 });
      }

      const result = await cancelSubscriptionService({
        firebase_uid,
        subscriptionId,
      });

      return Response.json(result);
    } catch {
      return new Response('Failed to cancel subscription', {
        status: 500,
      });
    }
  });
}
