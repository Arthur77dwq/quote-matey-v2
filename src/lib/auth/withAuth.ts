import { NextRequest } from 'next/server';

import { getUserId } from './user';

export async function withAuth(
  handler: (uid: string) => Promise<Response>,
  req?: NextRequest,
): Promise<Response> {
  try {
    const authHeader = req?.headers.get('authorization');

    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split('Bearer ')[1]
      : undefined;

    const { uid } = await getUserId(token);
    return handler(uid);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }
}
