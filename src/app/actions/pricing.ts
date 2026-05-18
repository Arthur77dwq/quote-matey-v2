'use server';

import { redirect } from 'next/navigation';

import { getUserId } from '@/lib/auth/user';
import {
  createSubscriptionService,
  hasActivePlanByUid,
  requestCancelSubscriptionService,
} from '@/services/subscription';

// CREATE SUBSCRIPTION

export async function createSubscriptionAction(formData: FormData) {
  const planId = formData.get('planId') as string;

  if (!planId) {
    throw new Error('planId is required');
  }

  const { uid } = await getUserId();
  const activePlan = await hasActivePlanByUid(uid);

  if (!activePlan.has) {
    const { approvalUrl } = await createSubscriptionService({
      firebase_uid: uid,
      planId,
    });

    // Redirect to PayPal
    if (approvalUrl) redirect(approvalUrl);
  }
}

// CANCEL SUBSCRIPTION

export async function cancelSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string;

  if (!subscriptionId) {
    throw new Error('subscriptionId is required');
  }

  const { uid } = await getUserId();

  const { success, subscription } = await requestCancelSubscriptionService({
    firebase_uid: uid,
    subscriptionId,
  });
  if (success && subscription.next_billing_date != null) {
    const date = new Date(subscription.next_billing_date);
    const params = new URLSearchParams({
      next_billing_date: date.toISOString(),
      plan: subscription.plan.name,
    });

    redirect(`/pricing/cancel?${params.toString()}`);
  }
  redirect('/pricing');
}
