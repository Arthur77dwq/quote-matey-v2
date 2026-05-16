import { verify } from '@/services/subscription';

export async function POST(req: Request) {
  const body = await req.json();
  return { status: verify(body.subscriptionId) };
}
