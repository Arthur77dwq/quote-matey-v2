import { NextRequest } from 'next/server';

import { withAuth } from '@/lib/auth/withAuth';
import { ensureUserSubscription } from '@/services/subscription';

export async function POST(req: NextRequest) {
  return withAuth(async (userId) => {
    const result = await ensureUserSubscription(userId);
    return Response.json({ result: result, success: true });
  }, req);
}
