import { withAuth } from '@/lib/auth/withAuth';
import { serverLogger as logger } from '@/lib/logger';

export async function POST(req: Request) {
  return withAuth(async () => {
    const entry = await req.json();

    await logger.error(entry.message, entry.metadata);

    return Response.json({
      success: true,
    });
  });
}
