import { X, Check, TrendingDown, TrendingUp, DollarSign, Clock } from "lucide-react"

const beforeItems = [
  { text: "Spend 20-30 mins writing each quote", impact: "Time wasted" },
  { text: "Underquote jobs by $200-500 on average", impact: "Money lost" },
  { text: "Messy quotes that look unprofessional", impact: "Trust lost" },
  { text: "Slow responses = jobs go to competitors", impact: "Jobs lost" },
  { text: "Forget materials, labour, or call-out fees", impact: "Profit lost" },
]

const afterItems = [
  { text: "Generate accurate quotes in under 2 minutes", impact: "10x faster" },
  { text: "Consistent, profitable pricing every single time", impact: "+$3K/mo" },
  { text: "Clean, professional quotes that win trust", impact: "More wins" },
  { text: "First to respond = first to get hired", impact: "Beat rivals" },
  { text: "AI catches everything you might forget", impact: "No mistakes" },
]

export function BeforeAfter() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#f57a0a] bg-[#f57a0a]/10 px-4 py-1.5 rounded-full mb-4">
            The Transformation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-4 tracking-tight">
            You're losing <span className="text-red-500">$50,000+</span> every year
            <br className="hidden sm:block" />
            <span className="text-muted-foreground text-2xl sm:text-3xl lg:text-4xl">to slow, sloppy quotes</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Before */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center shadow-lg z-10">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200/80 rounded-2xl p-8 pt-10 h-full">
              <h3 className="text-2xl font-bold text-red-700 mb-6">Without QuoteMatey</h3>
              <ul className="space-y-5">
                {beforeItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-red-800 font-medium">{item.text}</span>
                      <span className="block text-sm text-red-500 font-semibold mt-0.5">{item.impact}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-red-200">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-red-500" />
                  <div>
                    <span className="text-3xl font-bold text-red-600">-$4,200</span>
                    <span className="text-red-500 text-sm block">lost per month (avg)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shadow-lg z-10">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/80 rounded-2xl p-8 pt-10 h-full">
              <h3 className="text-2xl font-bold text-green-700 mb-6">With QuoteMatey</h3>
              <ul className="space-y-5">
                {afterItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-green-800 font-medium">{item.text}</span>
                      <span className="block text-sm text-green-600 font-semibold mt-0.5">{item.impact}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-green-200">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <span className="text-3xl font-bold text-green-600">+$5,800</span>
                    <span className="text-green-500 text-sm block">extra revenue per month (avg)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-[#0a1628] rounded-2xl p-8 lg:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Quick Math: Can You Afford <span className="text-red-400">NOT</span> to Use This?
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-xl p-5">
                <Clock className="w-6 h-6 text-[#f57a0a] mx-auto mb-2" />
                <span className="text-3xl font-bold block">15+ hrs</span>
                <span className="text-white/60 text-sm">saved per month on quotes</span>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <span className="text-3xl font-bold block">3-5 more</span>
                <span className="text-white/60 text-sm">jobs won per month</span>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <span className="text-3xl font-bold block">$3,000+</span>
                <span className="text-white/60 text-sm">extra in your pocket</span>
              </div>
            </div>
            <p className="mt-8 text-lg text-white/80">
              QuoteMatey costs <span className="text-white font-bold">$39/month</span>. 
              Win just <span className="text-green-400 font-bold">ONE extra job</span> and it pays for itself 100x over.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
