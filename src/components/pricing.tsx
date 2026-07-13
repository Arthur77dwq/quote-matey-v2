'use client';

import { twMerge } from 'tailwind-merge';

import {
  cancelSubscriptionAction,
  createSubscriptionAction,
} from '@/app/actions/pricing';
import { MergedPlan } from '@/types/subscription';

import { PriceCard } from './price-card';
import { Button } from './ui/button';

export function Pricing({
  subscription_id,
  active,
  data,
  showCTA,
}: {
  subscription_id?: string | null | undefined;
  active?: string;
  data?: MergedPlan[];
  showCTA?: boolean;
}) {
  const isActive = (plan: MergedPlan) =>
    plan?.db?.paypal_plan_id === active || plan.id === active;

  const showBtns = (plan: MergedPlan) => {
    return showCTA && !plan?.db?.isFree;
  };
  return (
    <section className="pt-24 bg-linear-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#f57a0a] bg-[#f57a0a]/10 px-4 py-1.5 rounded-full mb-4">
            Simple, Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-4 tracking-tight">
            Costs less than{' '}
            <span className="text-[#f57a0a]">one missed job</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If QuoteMatey helps you win just ONE extra job per month, it pays
            for itself{' '}
            <span className="font-bold text-foreground">50-100x over</span>.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-full mx-auto mb-16 flex flex-col md:flex-row items-center justify-center gap-8">
          {data?.map((plan, index) => (
            <PriceCard key={index} plan={plan} active={isActive(plan)}>
              {showBtns(plan) &&
                (isActive(plan) && subscription_id ? (
                  <form action={cancelSubscriptionAction} className="w-full">
                    {plan?.cancel_at_period_end || false ? (
                      <Button variant="outline" className="w-full" disabled>
                        {'Current Plan'}
                      </Button>
                    ) : (
                      <>
                        <input
                          type="hidden"
                          name="subscriptionId"
                          value={subscription_id}
                        />

                        <Button
                          type="submit"
                          className={twMerge(
                            `w-full cursor-pointer py-4 rounded-xl font-bold text-lg transition-all`,
                            isActive(plan)
                              ? 'bg-[#f57a0a] text-white hover:bg-[#e06d00] shadow-lg shadow-[#f57a0a]/20'
                              : ' text-black hover:bg-[#1a3a5c]',
                          )}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </form>
                ) : (
                  <form action={createSubscriptionAction} className="w-full">
                    <input
                      type="hidden"
                      name="planId"
                      value={plan?.db?.paypal_plan_id || plan.id}
                    />
                    <button
                      type="submit"
                      className={twMerge(
                        `w-full py-4 rounded-xl  text-lg transition-all`,
                        isActive(plan)
                          ? 'text-semibold  text-[#1a3a5c]/70  border'
                          : 'bg-[#0a1628] text-white hover:bg-[#1a3a5c] font-bold',
                      )}
                    >
                      {'Upgrade Now'}
                    </button>
                  </form>
                ))}
            </PriceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
