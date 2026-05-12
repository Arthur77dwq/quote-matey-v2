'use client';

import { useEffect, useMemo, useState } from 'react';

import { OverlayBg } from '@/components/overlay-bg';
import { Pricing } from '@/components/pricing';
import { Spinner } from '@/components/ui/spinner';
import { plans } from '@/constant/paypal/plan';
import { useAuth } from '@/context/AuthContext';
import { apiJson } from '@/lib/api';
import { AllPlan } from '@/types/paypal/plan';
import {
  MergedPlan,
  Subscription,
  SubscriptionPlan,
} from '@/types/subscription';

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
  const [loading, setLoading] = useState(true);
  const data = useMappedPlans(plans, allPlans);

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
      setLoading(false);
    }

    void loadBilling();
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <OverlayBg>
          <Spinner className="size-10" />
        </OverlayBg>
      ) : (
        <Pricing
          subscription_id={me?.paypal_subscription_id}
          active={me?.plan?.paypal_plan_id || me?.plan_id}
          data={data}
          showCTA={isAuthenticated}
        />
      )}
    </>
  );
}
