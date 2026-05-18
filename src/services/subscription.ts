import { getPlanById } from '@/db/plan/read';
import {
  createPendingSubscription,
  getSubscriptionByUser,
} from '@/db/subscription';
import { createNewUserFreeSubscription } from '@/db/subscription/create';
import {
  getSubscriptionByPaypalId,
  getUserSubscriptionById,
} from '@/db/subscription/read';
import {
  activateSubscriptionByID,
  activateSubscriptionDB,
  cancelSubscriptionDB,
  deactivateOtherActiveSubscriptions,
  markCancelAtPeriodEnd,
} from '@/db/subscription/update';
import { withAuth } from '@/lib/auth/withAuth';
import { cancelSubscription, createSubscription } from '@/lib/paypal';
import { paypalHttp } from '@/lib/paypal/http';
import { PaypalWebhookEvent } from '@/lib/paypal/schema';
import { toDate } from '@/lib/utils';
import { PaypalVerifyResponse } from '@/types/paypal/subscription';

export async function hasActivePlanByUid(uid: string) {
  const subscription = await getSubscriptionByUser(uid, false);
  return {
    has: Boolean(subscription.length),
    subscription,
  };
}

export async function hasActivePlan() {
  return await withAuth(async (uid: string) => {
    const result = await hasActivePlanByUid(uid);

    return Response.json(result);
  });
}

export async function activateSubscriptionService(
  event:
    | Extract<
        PaypalWebhookEvent,
        {
          event_type: 'BILLING.SUBSCRIPTION.ACTIVATED';
        }
      >
    | {
        resource: {
          id: string;
          start_time: string;
          billing_info: {
            next_billing_time: string;
          };
        };
      },
) {
  await activateSubscriptionDB({
    paypal_subscription_id: event.resource.id,
    start_date: event.resource.start_time
      ? toDate(event.resource.start_time)
      : undefined,

    // safer optional chaining
    next_billing_date: event.resource.billing_info?.next_billing_time
      ? toDate(event.resource.billing_info.next_billing_time)
      : undefined,
  });

  const subscription = await getSubscriptionByPaypalId(event.resource.id);

  await deactivateOtherActiveSubscriptions(
    subscription?.firebase_uid || '',
    event.resource.id,
  );
  return { status: true };
}

export async function verify(subscriptionId: string | undefined) {
  if (!subscriptionId) {
    return {
      status: false,
      subscription: null,
      msg: `subscriptionId is ${subscriptionId}`,
    };
  }

  const subscription = await paypalHttp<PaypalVerifyResponse>(
    `/v1/billing/subscriptions/${subscriptionId}`,
    'GET',
  );
  if (!subscription) {
    return {
      status: false,
      subscription: null,
      msg: 'No subscription returned',
    };
  }

  if (subscription.status === 'ACTIVE') {
    return {
      status: true,
      subscription: subscription,
      msg: `subscriptionId is valid and ${subscription.status}`,
    };
  } else {
    return {
      status: false,
      subscription: null,
      msg: `subscriptionId is valid and ${subscription.status}`,
    };
  }
}

export async function getCurrentUserSubscription(firebase_uid: string) {
  return await getSubscriptionByUser(firebase_uid);
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
    plan_id: plan.id,
    paypal_subscription_id: id || '',
  });

  const res = await verify(id);

  if (res.status) {
    await activateSubscriptionService({
      resource: {
        id: id || '',
        start_time: res.subscription?.start_time || '',
        billing_info: {
          next_billing_time:
            res.subscription?.billing_info?.next_billing_time || '',
        },
      },
    });
  }

  return { approvalUrl, subscriptionId: id };
}

export async function requestCancelSubscriptionService(params: {
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
  await markCancelAtPeriodEnd(params.firebase_uid, params.subscriptionId);

  return { success: true };
}

export async function cancelSubscriptionService(id: string) {
  const subscription = await cancelSubscriptionDB(id);
  const plans = await getSubscriptionByUser(subscription.firebase_uid);
  const plan = plans.filter((plan) => {
    if (plan.plan.isFree) {
      return plan;
    }
  });

  await activateSubscriptionByID(subscription.firebase_uid, plan[0].id);

  return { success: true };
}

export async function ensureUserSubscription(firebaseUid: string) {
  return createNewUserFreeSubscription(firebaseUid);
}
