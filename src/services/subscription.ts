import { getActiveSubscriptionByUser } from '@/db/subscription';

export async function getCurrentUserSubscription(firebase_uid: string) {
  const sub = await getActiveSubscriptionByUser(firebase_uid);

  if (!sub) {
    return {
      plan: 'FREE',
      isActive: false,
      subscription: null,
    };
  }

  return {
    plan: sub.plan.name,
    isActive: true,
    subscription: sub,
  };
}
