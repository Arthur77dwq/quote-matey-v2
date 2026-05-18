import { getPlanLimit } from '@/db/planLimit/read';
import { getUserUsage } from '@/db/usage/read';

import { getCurrentUserSubscription } from './subscription';

export async function canUserUseFeature(params: {
  firebase_uid: string;
  type: 'text' | 'image';
}) {
  if (params.firebase_uid) {
    const sub = await getCurrentUserSubscription(params.firebase_uid);

    if (!sub) return false;

    const usage = await getUserUsage(params.firebase_uid, sub.plan_id);
    const limit = await getPlanLimit(sub.plan_id);

    if (!usage || !limit) return false;

    if (params.type === 'text') {
      return usage.text_count < limit.text_limit;
    }

    if (params.type === 'image') {
      return usage.image_count < limit.image_limit;
    }

    return false;
  }
}
