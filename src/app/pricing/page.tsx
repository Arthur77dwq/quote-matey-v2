'use client';

import { useEffect, useMemo, useState } from 'react';

import { Pricing } from '@/components/pricing';
import { plans } from '@/constant/paypal/plan';
import { useAuth } from '@/context/AuthContext';
import { apiJson } from '@/lib/api';
import { AllPlan } from '@/types/paypal/plan';
import { Subscription, SubscriptionPlan } from '@/types/subscription';
export interface MergedPlan extends SubscriptionPlan {
  db: AllPlan | null;
}

export function useMappedPlans(
  plans: SubscriptionPlan[],
  allPlans: AllPlan[],
): MergedPlan[] {
  const mapped = useMemo(() => {
    return plans.map((plan) => {
      const matchedPlan = allPlans.find((item) => item.id === plan.id);

      return {
        ...plan,

        pricing: {
          price: matchedPlan ? `$${matchedPlan.price}` : plan.pricing.price,

          currency: matchedPlan?.currency || plan.pricing.currency,
        },

        period: matchedPlan?.billing_interval?.toLowerCase() || plan.period,

        db: matchedPlan || null,
      };
    });
  }, [plans, allPlans]);
  return mapped;
}

export default function BillingPage() {
  const [me, setMe] = useState<Subscription | null>(null);
  const [allPlans, setAllPlans] = useState<AllPlan[]>([]);
  const [, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   console.log(me, allPlans, plans);
  // }, [me, allPlans]);

  useEffect(() => {
    async function loadBilling() {
      try {
        if (isAuthenticated) {
          const data = await apiJson<Subscription>('/api/user/me');
          setMe(data);
        }
        const allPlans = await apiJson<AllPlan[]>('/api/pricing/plan/list');
        setAllPlans(allPlans);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load billing data',
        );
      }
    }

    void loadBilling();
  }, [isAuthenticated]);

  return (
    <Pricing
      subscription_id={me?.paypal_subscription_id}
      active={me?.plan?.paypal_plan_id || me?.plan_id}
      data={useMappedPlans(plans, allPlans)}
      showCTA={isAuthenticated}
    />
  );
}
