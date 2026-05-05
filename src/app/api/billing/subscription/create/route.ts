import { withAuth } from '@/lib/auth/withAuth';
import { createSubscriptionService } from '@/services/subscription';

export async function POST(req: Request) {
  return withAuth(req, async (firebase_uid) => {
    try {
      const body = await req.json();
      const { planId } = body;

      if (!planId) {
        return new Response('planId is required', { status: 400 });
      }

      const data = await createSubscriptionService({
        firebase_uid,
        planId,
      });

      return Response.json(data);
    } catch {
      return new Response('Failed to create subscription', {
        status: 500,
      });
    }
  });
}
