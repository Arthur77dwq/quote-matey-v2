import { NextRequest, NextResponse } from 'next/server';

import { resetFreePlanUsage } from '@/services/usage';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  await resetFreePlanUsage();

  return NextResponse.json({
    success: true,
  });
}
