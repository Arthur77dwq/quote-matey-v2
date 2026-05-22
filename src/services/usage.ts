import { incrementImageUsage, incrementTextUsage } from '@/db/usage';
import { getUserId } from '@/lib/auth/user';

import { getCurrentUserSubscription } from './subscription';

export async function updateUsage(types: string[]) {
  const { uid } = await getUserId();
  const subscription = await getCurrentUserSubscription(uid);
  if (subscription) {
    types.forEach(async (type) => {
      if (type === 'text') {
        await incrementTextUsage({
          firebase_uid: uid,
          plan_id: subscription.plan_id,
        });
      } else {
        if (type === 'image')
          await incrementImageUsage({
            firebase_uid: uid,
            plan_id: subscription.plan_id,
          });
      }
    });
  }
}
