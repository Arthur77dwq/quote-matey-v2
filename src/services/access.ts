import { getPlanLimit } from '@/db/planLimit/read';
import { getUserUsage } from '@/db/usage/read';

import { getCurrentUserSubscription } from './subscription';

export async function canUserUseFeature({
  firebase_uid,
  image = false,
  text = false,
}: {
  firebase_uid: string;
  image?: boolean;
  text?: boolean;
}) {
  const sub = await getCurrentUserSubscription(firebase_uid);

  if (!sub) {
    return false;
  }

  const usage = await getUserUsage(firebase_uid, sub.plan_id);

  const limit = await getPlanLimit(sub.plan_id);

  if (!usage || !limit) {
    return false;
  }

  if (limit.image_limit < 0 && limit.text_limit < 0) return true;

  const canUseImage = usage.image_count < limit.image_limit;

  const canUseText = usage.text_count < limit.text_limit;

  if (image && !canUseImage) {
    return false;
  }

  if (text && !canUseText) {
    return false;
  }

  return true;
}
