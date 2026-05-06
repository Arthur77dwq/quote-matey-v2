import { getUserId } from './user';

export async function withAuth(
  handler: (uid: string) => Promise<Response>,
): Promise<Response> {
  try {
    const uid = await getUserId();
    return handler(uid);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }
}
