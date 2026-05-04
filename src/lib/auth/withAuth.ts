import { getUserId } from './user';

export async function withAuth(
  req: Request,
  handler: (uid: string) => Promise<Response>,
): Promise<Response> {
  try {
    const uid = await getUserId(req);
    return handler(uid);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }
}
