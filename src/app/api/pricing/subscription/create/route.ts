import { withAuth } from '@/lib/auth/withAuth';
import { createSubscriptionService } from '@/services/subscription';

export async function POST(req: Request) {
  return withAuth(async (firebase_uid) => {
    const body = await req.json();
    const { planId } = body;

    if (!planId) {
      return new Response('planId is required', { status: 400 });
    }

    const { approvalUrl } = await createSubscriptionService({
      firebase_uid,
      planId,
    });

    return Response.redirect(approvalUrl, 302);
  });
}
