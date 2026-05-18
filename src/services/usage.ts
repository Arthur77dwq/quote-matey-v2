// import { getUserUsage } from '@/db/usage/read';
import { getUserId } from '@/lib/auth/user';

import { getCurrentUserSubscription } from './subscription';

export async function updateUsage() {
  const { uid } = await getUserId();
  await getCurrentUserSubscription(uid);
  //   console.log(subscription);
  //   const usage = await getUserUsage(firebase_uid, subscription.plan_id);
}
