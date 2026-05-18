import { incrementImageUsage,incrementTextUsage } from '@/db/usage';
import { getUserId } from '@/lib/auth/user';

import { getCurrentUserSubscription } from './subscription';

export async function updateUsage(type: 'text' | 'image') {
  const { uid } = await getUserId();
  const subscription = await getCurrentUserSubscription(uid);
  if (subscription) {
    if (type === 'text') {
      await incrementTextUsage({
        firebase_uid: uid,
        plan_id: subscription.plan_id,
      });
    } else {
      await incrementImageUsage({
        firebase_uid: uid,
        plan_id: subscription.plan_id,
      });
    }
  }
}
