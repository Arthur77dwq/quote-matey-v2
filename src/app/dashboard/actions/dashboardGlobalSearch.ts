'use server';

import { SEARCH_DEMO_DATA } from '@/constant/data/dashboard';
import { withServerActionAuth } from '@/lib/auth/withAuth';

export async function search(query: string) {
  return withServerActionAuth(async () => {
    return {
      // TODO: Query db and return data.
      ...SEARCH_DEMO_DATA,
      query: query,
    };
  });
}
