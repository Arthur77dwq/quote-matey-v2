"use client"

import { Check, X, Sparkles, Shield, Zap } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Test the waters",
    features: [
      { text: "50 quotes per month", included: true },
      { text: "Photo & video analysis", included: true },
      { text: "Standard templates", included: true },
      { text: "Email support", included: true },
      { text: "Custom branding", included: false },
      { text: "Quote analytics", included: false },
    ],
    highlighted: false,
    cta: "Start Free Trial",
    note: "Great for getting started",
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "For serious tradies",
    badge: "Most Popular",
    features: [
      { text: "Unlimited quotes", included: true },
      { text: "Priority AI (2x faster)", included: true },
      { text: "Custom branded templates", included: true },
      { text: "Quote history & analytics", included: true },
      { text: "Priority support", included: true },
      { text: "Team access (coming soon)", included: true },
    ],
    highlighted: true,
    cta: "Start Free Trial",
    savings: "Win 1 job = pays for 3 months",
    annualPrice: "$29",
  },
]

const comparisonValue = [
  { item: "Time saved per month", value: "15+ hours", money: "= $750+ in labour" },
  { item: "Extra jobs from speed", value: "3-5 jobs", money: "= $1,500-$5,000" },
  { item: "Saved from underquoting", value: "$380/job avg", money: "= $1,500+ per month" },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#f57a0a] bg-[#f57a0a]/10 px-4 py-1.5 rounded-full mb-4">
            Simple, Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-4 tracking-tight">
            Costs less than <span className="text-[#f57a0a]">one missed job</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If QuoteMatey helps you win just ONE extra job per month, 
            it pays for itself <span className="font-bold text-foreground">50-100x over</span>.
          </p>
        </div>

        {/* Value Comparison */}
        <div className="bg-[#0a1628] rounded-2xl p-6 lg:p-8 mb-12 max-w-4xl mx-auto">
          <h3 className="text-white font-bold text-lg mb-6 text-center">What $39/month gets you:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {comparisonValue.map((item, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                <span className="text-white/60 text-sm block mb-1">{item.item}</span>
                <span className="text-white font-bold text-2xl block">{item.value}</span>
                <span className="text-green-400 text-sm font-medium">{item.money}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-white/60 text-sm mt-6">
            Total potential value: <span className="text-green-400 font-bold">$3,750 - $7,250/month</span> for just $39
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all ${
                plan.highlighted
                  ? "border-[#f57a0a] shadow-2xl shadow-[#f57a0a]/10 scale-[1.02]"
                  : "border-border shadow-lg"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#f57a0a] to-orange-500 text-white text-sm font-bold px-5 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <h3 className="text-2xl font-bold text-[#0a1628] mb-1">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-5xl font-bold text-[#0a1628]">{plan.price}</span>
                  <span className="text-muted-foreground pb-1">{plan.period}</span>
                </div>
                {plan.annualPrice && (
                  <p className="text-sm text-muted-foreground mt-2">
                    or <span className="font-semibold text-foreground">{plan.annualPrice}/mo</span> billed annually (save 25%)
                  </p>
                )}
              </div>

              {plan.savings && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 text-center">
                  <span className="text-green-700 font-semibold">{plan.savings}</span>
                </div>
              )}

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-slate-400" />
                      </div>
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  plan.highlighted
                    ? "bg-[#f57a0a] text-white hover:bg-[#e06d00] shadow-lg shadow-[#f57a0a]/20"
                    : "bg-[#0a1628] text-white hover:bg-[#1a3a5c]"
                }`}
              >
                {plan.cta}
              </button>

              {plan.note && (
                <p className="text-center text-sm text-muted-foreground mt-4">{plan.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-border p-8 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-[#0a1628] mb-2">
            30-Day Money-Back Guarantee
          </h3>
          <p className="text-muted-foreground">
            Try QuoteMatey risk-free. If you don't win more jobs or save time, 
            we'll refund every cent. No questions. No hassle. No risk.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#f57a0a]" />
              <span>No credit card for trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
