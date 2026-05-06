'use client';

import { useEffect, useState } from 'react';

import {
  cancelSubscriptionAction,
  createSubscriptionAction,
} from '@/app/actions/billing';
import { apiJson } from '@/lib/api';
import { Subscription } from '@/types/subscription';

interface BillingData {
  plan: string;
  isActive: boolean;
  subscription: Subscription | null;
}

export default function BillingPage() {
  const [me, setMe] = useState<BillingData | null>(null);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBilling() {
      try {
        const data = await apiJson<BillingData>('/api/billing/me');

        setMe(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load billing data',
        );
      }
    }

    void loadBilling();
  }, []);

  return (
    <div>
      <h1>Billing</h1>

      <p>Plan: {me?.subscription?.plan?.name || 'Free'}</p>
      <p>Status: {me?.subscription ? me.subscription?.status : 'Inactive'}</p>

      {!me?.subscription ||
        (me?.subscription?.plan?.isFree && (
          <form action={createSubscriptionAction}>
            <input type="hidden" name="planId" value="starter_monthly_v1" />
            <button type="submit">Upgrade to Starter</button>
          </form>
        ))}

      {me?.subscription && !me?.subscription?.plan?.isFree && (
        <form action={cancelSubscriptionAction}>
          <input
            type="hidden"
            name="subscriptionId"
            value={me.subscription.paypal_subscription_id || ''}
          />
          <button type="submit">Cancel Subscription</button>
        </form>
      )}
    </div>
  );
}
