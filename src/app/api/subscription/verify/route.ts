import { activateSubscriptionService, verify } from '@/services/subscription';

export async function POST(req: Request) {
  const body = await req.json();

  const result = await verify(body.subscriptionId);

  if (result.status) {
    if (result.subscription)
      await activateSubscriptionService({ resource: result.subscription });
  }

  return Response.json(result);
}
