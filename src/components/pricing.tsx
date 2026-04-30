'use client';

import { plans } from '@/constant/subscription-plan';

import { PriceCard } from './price-card';

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 bg-linear-to-b from-white to-slate-50"
    >
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
          {plans.map((plan, index) => (
            <PriceCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
