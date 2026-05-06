import { getPlanById } from '@/db/plan/read';
import {
  createPendingSubscription,
  getActiveSubscriptionByUser,
} from '@/db/subscription';
import { getUserSubscriptionById } from '@/db/subscription/read';
import { markCancelAtPeriodEnd } from '@/db/subscription/update';
import { cancelSubscription, createSubscription } from '@/lib/paypal';

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

export async function createSubscriptionService(params: {
  firebase_uid: string;
  planId: string;
}) {
  const plan = await getPlanById(params.planId);

  if (!plan.paypal_plan_id) {
    throw new Error('Invalid plan');
  }

  const { id, approvalUrl } = await createSubscription({
    planId: plan.paypal_plan_id,
  });
  await createPendingSubscription({
    firebase_uid: params.firebase_uid,
    plan_id: params.planId,
    paypal_subscription_id: id,
  });

  return { approvalUrl, subscriptionId: id };
}

export async function cancelSubscriptionService(params: {
  firebase_uid: string;
  subscriptionId: string;
}) {
  // 0. Verify ownership
  const sub = await getUserSubscriptionById({
    firebase_uid: params.firebase_uid,
    paypal_subscription_id: params.subscriptionId,
  });

  if (!sub) {
    throw new Error('Unauthorized subscription access');
  }

  // 1. Call PayPal
  await cancelSubscription({
    subId: params.subscriptionId,
  });

  // 2. Mark locally (soft state)
  await markCancelAtPeriodEnd(params.subscriptionId);

  return { success: true };
}
