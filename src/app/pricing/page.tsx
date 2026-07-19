import { useMemo } from 'react';

import { generateMetadata } from '@/lib/seo';
import { AllPlan } from '@/types/paypal/plan';
import { MergedPlan, SubscriptionPlan } from '@/types/subscription';

import { DATA } from './data';
// import { getAllPlan } from '@/db/plan/read';
// import { plans } from '@/constant/paypal/plan';
import { Pricing } from './pricing';

export const metadata = generateMetadata(DATA?.metadata);

export function useMappedPlans(
  plans: SubscriptionPlan[],
  allPlans: AllPlan[],
): MergedPlan[] {
  const mapped = useMemo(() => {
    return plans.map((plan) => {
      const matchedPlan = allPlans.find(
        (item) => item.id === `${plan.id}_v${plan.version}`,
      );

      return {
        ...plan,
        id: `${plan.id}_v${plan.version}`,
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

export default async function PricingPage() {
  // const allPlans = await getAllPlan();
  // useMappedPlans(plans, allPlans);

  return (
    DATA?.sections &&
    DATA?.sections.length && <Pricing sections={DATA.sections} />
  );
}
