'use client';

import {
  Check,
  Image as ImageIcon,
  LayoutTemplate,
  MessageSquare,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import {
  BILLING_DETAILS,
  BillingCycle,
  COMPARISON_ROWS,
  CURRENT_PLAN,
  PlanCardData,
  PLANS,
  USAGE_HISTORY,
} from './data';

export default function PlanPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [upgradePlan, setUpgradePlan] = useState<PlanCardData | null>(null);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);

  const handleUpgradeClick = (plan: PlanCardData) => {
    if (plan.isCurrent) {
      toast.info('You are already on this plan.');
      return;
    }
    setUpgradePlan(plan);
  };

  const confirmUpgrade = async () => {
    if (!upgradePlan) return;
    setIsProcessingUpgrade(true);
    // Simulate integration call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsProcessingUpgrade(false);
    setUpgradePlan(null);
    toast.success(
      `Successfully upgraded to ${upgradePlan.name} plan (${billingCycle}).`,
    );
  };

  return (
    <div className="h-full min-h-0 w-full overflow-y-auto bg-[#F9FAFB]/60 p-3 sm:p-5 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Mobile / Tablet Quick Usage Banner (< lg) */}
        <div className="flex lg:hidden flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#E8EAED] bg-white p-3.5 sm:p-4 shadow-2xs mb-5">
          <div className="flex items-center justify-between sm:justify-start gap-2.5">
            <span className="text-xs font-bold text-[#1E2024]">Your Plan:</span>
            <span className="rounded-full bg-[#E7F8EB] px-2.5 py-0.5 text-[0.625rem] font-bold text-[#27A34D]">
              {CURRENT_PLAN.badge}
            </span>
            <span className="text-[0.6875rem] text-[#818995] sm:ml-2">
              Resets in {CURRENT_PLAN.resetsInDays} days
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 sm:w-48">
              <div className="flex justify-between text-[0.6875rem] mb-1">
                <span className="font-semibold text-[#20242A]">
                  {CURRENT_PLAN.pointsUsed} pts
                </span>
                <span className="text-[#818995]">
                  / {CURRENT_PLAN.pointsTotal}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F0F2F5]">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#FF5A1F] to-[#FF7A45]"
                  style={{
                    width: `${Math.min(
                      100,
                      (CURRENT_PLAN.pointsUsed / CURRENT_PLAN.pointsTotal) *
                        100,
                    )}%`,
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowUsageModal(true)}
              className="shrink-0 rounded-lg border border-[#DFE3E8] bg-white px-3 py-1.5 text-[0.6875rem] font-semibold text-[#4E5661] transition hover:bg-neutral-50"
            >
              Usage History
            </button>
          </div>
        </div>

        {/* Main Grid: Left for Plans & Comparison, Right for Usage & Billing */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Choose Plan Header & Billing Toggle */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#1E2024]">
                  Choose the perfect plan for your business
                </h2>
                <p className="mt-0.5 text-xs sm:text-[0.8125rem] text-[#68717D]">
                  All plans include access to AI quoting, templates and exports.
                </p>
              </div>

              {/* Monthly / Yearly Toggle */}
              <div className="self-start sm:self-auto inline-flex items-center rounded-full bg-[#ECEEF2] p-1 text-[0.6875rem] font-semibold">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={cn(
                    'rounded-full px-3 py-1 transition-all',
                    billingCycle === 'monthly'
                      ? 'bg-white text-[#FF5A1F] shadow-xs font-bold'
                      : 'text-[#68717D] hover:text-[#20242A]',
                  )}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={cn(
                    'rounded-full px-3 py-1 transition-all',
                    billingCycle === 'yearly'
                      ? 'bg-white text-[#FF5A1F] shadow-xs font-bold'
                      : 'text-[#68717D] hover:text-[#20242A]',
                  )}
                >
                  Yearly (Save 17%)
                </button>
              </div>
            </div>

            {/* 3 PLAN CARDS: Sideways (3 cols) on tablet landscape & desktop; vertical (1 col) on phone or tablet portrait so user can scroll down */}
            <div className="grid grid-cols-1 lg:landscape:grid-cols-3 xl:grid-cols-3 portrait:grid-cols-1 gap-4 lg:gap-4.5 xl:gap-5 items-stretch">
              {PLANS.map((plan) => {
                const price =
                  billingCycle === 'yearly'
                    ? plan.priceYearly
                    : plan.priceMonthly;

                return (
                  <div
                    key={plan.id}
                    className={cn(
                      'relative flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 lg:p-5 xl:p-6 transition-shadow w-full',
                      plan.isPopular
                        ? 'border-2 border-[#FF8B5B] shadow-sm ring-1 ring-[#FF8B5B]/15 hover:shadow-md'
                        : 'border border-[#E8EAED] shadow-2xs hover:shadow-sm',
                    )}
                  >
                    {/* Most Popular Badge */}
                    {plan.badge && (
                      <span className="absolute right-4 top-4 rounded-full bg-[#FFF1EA] px-2.5 py-0.5 text-[0.625rem] font-bold text-[#FF5A1F]">
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      {/* Plan Header */}
                      <h3 className="text-base font-bold text-[#1E2024]">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-[0.6875rem] leading-4 text-[#68717D] min-h-[2rem]">
                        {plan.description}
                      </p>

                      {/* Price Block */}
                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-2xl sm:text-[1.75rem] font-extrabold text-[#1E2024]">
                          {price}
                        </span>
                        <span className="text-xs text-[#68717D]">
                          {plan.pricePeriod}
                        </span>
                      </div>

                      {/* Points Block */}
                      <p className="mt-1 text-xs font-semibold text-[#FF5A1F]">
                        {plan.points}
                      </p>

                      {/* CTA Button */}
                      <div className="mt-5">
                        {plan.buttonVariant === 'current' ? (
                          <button
                            type="button"
                            disabled
                            className="h-10 sm:h-9 w-full rounded-lg bg-[#F0F2F5] text-xs font-semibold text-[#5E6670] cursor-default"
                          >
                            {plan.buttonText}
                          </button>
                        ) : plan.buttonVariant === 'primary' ? (
                          <button
                            type="button"
                            onClick={() => handleUpgradeClick(plan)}
                            className="h-10 sm:h-9 w-full rounded-lg bg-[#FF4F12] text-xs font-semibold text-white shadow-xs transition hover:bg-[#E5450E] active:scale-[0.98]"
                          >
                            {plan.buttonText}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleUpgradeClick(plan)}
                            className="h-10 sm:h-9 w-full rounded-lg border border-[#DFE3E8] bg-white text-xs font-semibold text-[#20242A] transition hover:bg-neutral-50 active:scale-[0.98]"
                          >
                            {plan.buttonText}
                          </button>
                        )}
                      </div>

                      {/* Features List */}
                      <ul className="mt-6 space-y-2.5 text-xs text-[#3E454F]">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-[0.6875rem] leading-4"
                          >
                            {feature.included ? (
                              <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#E4F7E8] text-[#27A34D] mt-0.5">
                                <Check className="size-2.5 stroke-[3]" />
                              </span>
                            ) : (
                              <span className="flex size-3.5 shrink-0 items-center justify-center text-[#9AA1A9] mt-0.5">
                                <X className="size-3 stroke-[2.5]" />
                              </span>
                            )}
                            <span
                              className={cn(
                                feature.included
                                  ? 'text-[#20242A]'
                                  : 'text-[#818995]',
                              )}
                            >
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footnote if any */}
                    {plan.footnote && (
                      <p className="mt-6 text-[0.6875rem] text-[#818995]">
                        {plan.footnote}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* PLAN COMPARISON SECTION with Sticky First Column */}
            <div className="rounded-2xl border border-[#E8EAED] bg-white p-4 sm:p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm sm:text-base font-bold text-[#1E2024]">
                  Plan Comparison
                </h3>
                <span className="inline-block sm:hidden text-[0.625rem] text-[#818995] bg-[#F4F5F7] px-2 py-0.5 rounded-full">
                  Swipe horizontally →
                </span>
              </div>

              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-none">
                <table className="w-full min-w-[480px] sm:min-w-[560px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8EAED] text-[0.6875rem] text-[#68717D]">
                      <th className="sticky left-0 bg-white z-10 py-2.5 font-semibold text-[#68717D] w-[34%] shadow-[1px_0_0_0_#E8EAED]">
                        Features
                      </th>
                      <th className="py-2.5 font-semibold text-[#1E2024] text-center w-[22%]">
                        Free
                      </th>
                      <th className="py-2.5 font-semibold text-[#1E2024] text-center w-[22%]">
                        Starter
                      </th>
                      <th className="py-2.5 font-semibold text-[#1E2024] text-center w-[22%]">
                        Premium
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F4F7] text-[0.6875rem]">
                    {COMPARISON_ROWS.map((row, index) => (
                      <tr key={index} className="hover:bg-[#FAFBFD] group">
                        <td className="sticky left-0 bg-white group-hover:bg-[#FAFBFD] z-10 py-3 font-medium text-[#20242A] shadow-[1px_0_0_0_#E8EAED]">
                          {row.feature}
                        </td>
                        <td className="py-3 text-center text-[#4E5661]">
                          {typeof row.free === 'boolean' ? (
                            row.free ? (
                              <Check className="mx-auto size-3.5 text-[#27A34D] stroke-[3]" />
                            ) : (
                              <span className="text-[#9AA1A9]">—</span>
                            )
                          ) : (
                            row.free
                          )}
                        </td>
                        <td className="py-3 text-center text-[#4E5661]">
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? (
                              <Check className="mx-auto size-3.5 text-[#27A34D] stroke-[3]" />
                            ) : (
                              <span className="text-[#9AA1A9]">—</span>
                            )
                          ) : (
                            row.starter
                          )}
                        </td>
                        <td className="py-3 text-center font-medium text-[#20242A]">
                          {typeof row.premium === 'boolean' ? (
                            row.premium ? (
                              <Check className="mx-auto size-3.5 text-[#27A34D] stroke-[3]" />
                            ) : (
                              <span className="text-[#9AA1A9]">—</span>
                            )
                          ) : (
                            row.premium
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Stack on mobile, 2-col grid on tablet, vertical sidebar on desktop */}
          <div className="w-full lg:w-80 xl:w-92 shrink-0 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-5">
            {/* Your Current Plan Card */}
            <div className="rounded-2xl border border-[#E8EAED] bg-white p-4.5 sm:p-5 shadow-2xs">
              {/* Card Header with Badge */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1E2024]">
                  Your Current Plan
                </h3>
                <span className="rounded-full bg-[#E7F8EB] px-2.5 py-0.5 text-[0.625rem] font-bold text-[#27A34D]">
                  {CURRENT_PLAN.badge}
                </span>
              </div>

              {/* Usage Header */}
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#20242A]">
                  Points Usage
                </span>
                <span className="text-[0.6875rem] text-[#818995]">
                  Resets in {CURRENT_PLAN.resetsInDays} days
                </span>
              </div>

              {/* Points Metric */}
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#1E2024]">
                  {CURRENT_PLAN.pointsUsed}
                </span>
                <span className="text-xs text-[#818995]">
                  / {CURRENT_PLAN.pointsTotal} points used
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#F0F2F5]">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#FF5A1F] to-[#FF7A45] transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (CURRENT_PLAN.pointsUsed / CURRENT_PLAN.pointsTotal) *
                        100,
                    )}%`,
                  }}
                />
              </div>

              {/* Breakdown List */}
              <div className="mt-4 space-y-2.5 text-[0.6875rem]">
                {CURRENT_PLAN.breakdown.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-[#4E5661]"
                  >
                    <span className="flex items-center gap-2">
                      {item.type === 'image' && (
                        <ImageIcon className="size-3.5 text-[#818995]" />
                      )}
                      {item.type === 'text' && (
                        <MessageSquare className="size-3.5 text-[#818995]" />
                      )}
                      {item.type === 'regen' && (
                        <RotateCcw className="size-3.5 text-[#818995]" />
                      )}
                      {item.type === 'template' && (
                        <LayoutTemplate className="size-3.5 text-[#818995]" />
                      )}
                      <span>{item.label}</span>
                    </span>

                    <span className="flex items-center gap-4">
                      <span className="text-[#818995] w-4 text-center">
                        {item.count}
                      </span>
                      <span className="font-medium text-[#20242A] w-12 text-right">
                        {item.points}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider & Total */}
              <div className="mt-4 border-t border-[#EEF0F2] pt-3 flex items-center justify-between text-xs font-semibold text-[#20242A]">
                <span>Total used</span>
                <span>{CURRENT_PLAN.totalUsed}</span>
              </div>

              {/* View Usage History CTA */}
              <button
                type="button"
                onClick={() => setShowUsageModal(true)}
                className="mt-5 h-9 w-full rounded-lg border border-[#DFE3E8] bg-white text-xs font-semibold text-[#4E5661] transition hover:bg-neutral-50 active:scale-[0.98]"
              >
                View Usage History
              </button>
            </div>

            {/* Billing Details Card */}
            <div className="rounded-2xl border border-[#E8EAED] bg-white p-4.5 sm:p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E2024]">
                  Billing Details
                </h3>

                <div className="mt-3 space-y-2.5 text-[0.6875rem]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#68717D]">Billing cycle</span>
                    <span className="font-semibold text-[#20242A]">
                      {BILLING_DETAILS.billingCycle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#68717D]">Current plan</span>
                    <span className="font-semibold text-[#20242A]">
                      {BILLING_DETAILS.currentPlan}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#68717D]">Next billing date</span>
                    <span className="text-[#818995]">
                      {BILLING_DETAILS.nextBillingDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#68717D]">Payment method</span>
                    <span className="text-[#818995]">
                      {BILLING_DETAILS.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowBillingModal(true)}
                className="mt-5 h-9 w-full rounded-lg border border-[#DFE3E8] bg-white text-xs font-semibold text-[#4E5661] transition hover:bg-neutral-50 active:scale-[0.98]"
              >
                Manage Billing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Upgrade Confirmation */}
      {upgradePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-[#DFE3E8] bg-white p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#FFF1EA] text-[#FF5A1F]">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1E2024]">
                    Upgrade to {upgradePlan.name}
                  </h4>
                  <p className="text-xs text-[#68717D]">
                    Instant access to more quoting power
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUpgradePlan(null)}
                className="rounded-md p-1.5 text-[#818995] hover:bg-neutral-100"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-[#F8F9FA] p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#68717D]">Selected Plan</span>
                <span className="font-semibold text-[#20242A]">
                  {upgradePlan.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68717D]">Billing Cycle</span>
                <span className="font-semibold capitalize text-[#20242A]">
                  {billingCycle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68717D]">Included Points</span>
                <span className="font-semibold text-[#FF5A1F]">
                  {upgradePlan.points}
                </span>
              </div>
              <div className="border-t border-[#E8EAED] pt-2 flex justify-between font-bold text-sm text-[#1E2024]">
                <span>Total Due Today</span>
                <span>
                  {billingCycle === 'yearly'
                    ? upgradePlan.priceYearly
                    : upgradePlan.priceMonthly}{' '}
                  {billingCycle === 'yearly' ? '/yr' : '/mo'}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <p className="text-[0.6875rem] text-[#68717D]">
                By clicking Confirm Upgrade, your payment method will be charged
                and your points will be updated immediately.
              </p>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setUpgradePlan(null)}
                  className="h-9.5 rounded-lg border border-[#DFE3E8] px-4 text-xs font-semibold text-[#4E5661] hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isProcessingUpgrade}
                  onClick={confirmUpgrade}
                  className="flex h-9.5 items-center justify-center gap-1.5 rounded-lg bg-[#FF4F12] px-5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#E5450E] active:scale-[0.98] disabled:opacity-60"
                >
                  {isProcessingUpgrade ? 'Processing...' : 'Confirm Upgrade'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Usage History */}
      {showUsageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border border-[#DFE3E8] bg-white p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E8EAED] pb-3 shrink-0">
              <div>
                <h4 className="text-base font-bold text-[#1E2024]">
                  Points Usage History
                </h4>
                <p className="text-xs text-[#68717D]">
                  Recent activity and point deductions
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUsageModal(false)}
                className="rounded-md p-1.5 text-[#818995] hover:bg-neutral-100"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 flex-1 min-h-0 overflow-y-auto space-y-2 text-xs pr-1">
              {USAGE_HISTORY.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-lg border border-[#F0F2F5] p-2.5 hover:bg-[#F9FAFB]"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="truncate font-semibold text-[#20242A]">
                      {entry.action}
                    </p>
                    <p className="mt-0.5 text-[0.625rem] text-[#818995]">
                      {entry.date} · {entry.category}{' '}
                      {entry.jobRef ? `· Ref: ${entry.jobRef}` : ''}
                    </p>
                  </div>
                  <span className="shrink-0 font-bold text-[#FF5A1F]">
                    -{entry.points} pts
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end border-t border-[#E8EAED] pt-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowUsageModal(false)}
                className="h-9 rounded-lg border border-[#DFE3E8] px-4 text-xs font-semibold text-[#4E5661] hover:bg-neutral-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Manage Billing */}
      {showBillingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-[#DFE3E8] bg-white p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E8EAED] pb-3">
              <div>
                <h4 className="text-base font-bold text-[#1E2024]">
                  Manage Billing
                </h4>
                <p className="text-xs text-[#68717D]">
                  Update payment method and invoices
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBillingModal(false)}
                className="rounded-md p-1.5 text-[#818995] hover:bg-neutral-100"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-xl border border-[#E8EAED] p-3">
                <span className="block text-[0.6875rem] font-semibold text-[#68717D]">
                  Current Subscription
                </span>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-bold text-[#20242A]">Free Tier</span>
                  <span className="rounded-full bg-[#E7F8EB] px-2 py-0.5 text-[0.625rem] font-semibold text-[#27A34D]">
                    Active
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[#E8EAED] p-3">
                <span className="block text-[0.6875rem] font-semibold text-[#68717D]">
                  Payment Method
                </span>
                <p className="mt-1 text-xs text-[#818995]">
                  No payment method connected yet.
                </p>
              </div>

              <div className="rounded-xl border border-[#E8EAED] p-3">
                <span className="block text-[0.6875rem] font-semibold text-[#68717D]">
                  Invoices
                </span>
                <p className="mt-1 text-xs text-[#818995]">
                  No past invoices available on the Free plan.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-[#E8EAED] pt-3">
              <button
                type="button"
                onClick={() => setShowBillingModal(false)}
                className="h-9 rounded-lg border border-[#DFE3E8] px-4 text-xs font-semibold text-[#4E5661] hover:bg-neutral-50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
