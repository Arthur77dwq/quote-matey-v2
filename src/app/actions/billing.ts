'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getUserId } from '@/lib/auth/user';
import {
  cancelSubscriptionService,
  createSubscriptionService,
} from '@/services/subscription';

// CREATE SUBSCRIPTION

export async function createSubscriptionAction(formData: FormData) {
  const planId = formData.get('planId') as string;

  if (!planId) {
    throw new Error('planId is required');
  }

  const firebase_uid = await getUserId();

  const { approvalUrl } = await createSubscriptionService({
    firebase_uid,
    planId,
  });

  // Redirect to PayPal
  redirect(approvalUrl);
}

// CANCEL SUBSCRIPTION

export async function cancelSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string;

  if (!subscriptionId) {
    throw new Error('subscriptionId is required');
  }

  const firebase_uid = await getUserId();

  await cancelSubscriptionService({
    firebase_uid,
    subscriptionId,
  });

  // refresh billing page
  revalidatePath('/billing');
}
