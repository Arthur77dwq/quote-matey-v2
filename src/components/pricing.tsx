'use client';

import { PriceCard } from './price-card';

const plans = [
  {
    name: 'Free',
    trend: {
      text: 'Most Popular',
      tranding: false,
    },
    pricing: { price: '$0', currency: 'AUD' },
    period: 'month',
    description: 'Designed for trial users and light use.',
    features: [
      { icon: 'image', text: '1 Image quote/week', included: true },
      { icon: 'text', text: '3 Text quote/week', included: true },
    ],
    points: [
      { text: 'Unlimited usage', included: false },
      { text: 'Priority processing', included: false },
      { text: 'Advanced refinement of quotes', included: false },
      { text: 'Webhook or business integrations', included: false },
      { text: 'Advanced consistency tuning', included: false },
    ],
    highlighted: false,
    cta: {
      text: 'Get Started',
      target: '/chat',
    },
  },
  {
    name: 'Starter Plan',
    trend: {
      text: 'Most Popular',
      tranding: true,
    },
    pricing: { price: '$29', currency: 'AUD' },
    period: 'month',
    description: 'Designed for working tradies using it daily.',
    features: [
      { icon: 'image', text: 'Unlimited Image quote', included: true },
      { icon: 'text', text: 'Unlimited Text quote', included: true },
    ],
    points: [
      { text: 'Unlimited usage', included: true },
      { text: 'Priority processing', included: true },
      { text: 'Advanced refinement of quotes', included: true },
      { text: 'Webhook or business integrations', included: true },
      { text: 'Advanced consistency tuning', included: true },
    ],
    highlighted: true,
    cta: {
      text: 'Get Started',
      target: '',
    },
  },
];

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
