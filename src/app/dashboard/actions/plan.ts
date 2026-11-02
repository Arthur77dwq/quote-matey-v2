'use server';

import { withServerActionAuth } from '@/lib/auth/withAuth';

export async function upgradeToNextPlan(formData: FormData) {
  return withServerActionAuth(async () => {
    formData.get('planId');
  });
}
