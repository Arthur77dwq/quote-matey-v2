import { verify } from '@/services/subscription';

export async function POST(req: Request) {
  const body = await req.json();

  const result = await verify(body.subscriptionId);

  return Response.json(result);
}
