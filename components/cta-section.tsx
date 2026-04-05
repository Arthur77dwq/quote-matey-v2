'use client';

import {
  ArrowRight,
  Clock,
  CreditCard,
  Shield,
  Users,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CTASection() {
  const router = useRouter();
  return (
    <section
      id="cta"
      className="py-24 bg-gradient-to-br from-[#0a1628] via-[#0f2744] to-[#0a1628] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f57a0a]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgency Banner */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-green-400 font-medium">
            47 tradies signed up in the last 24 hours
          </span>
        </div>

        <div className="text-center">
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight text-balance">
            Right now, a faster tradie is
            <span className="block text-[#f57a0a]">
              stealing your next job.
            </span>
          </h2>

          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Every day you wait costs you{' '}
            <span className="text-white font-semibold">$150-$500</span> in lost
            jobs.
            <span className="block mt-2">
              How much longer can you afford to be slow?
            </span>
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <button
              onClick={() => router.push('/chat')}
              className="group inline-flex items-center gap-3 bg-[#f57a0a] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#e06d00] transition-all shadow-2xl shadow-[#f57a0a]/30 hover:shadow-[#f57a0a]/40 hover:-translate-y-1"
            >
              <Zap className="w-6 h-6" />
              Start Winning Jobs Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-white/60 text-sm">
              Join 2,847+ tradies already using QuoteMatey
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <CreditCard className="w-6 h-6 text-[#f57a0a] mx-auto mb-2" />
              <span className="text-white text-sm font-medium block">
                No Credit Card
              </span>
              <span className="text-white/50 text-xs">required to start</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Clock className="w-6 h-6 text-[#f57a0a] mx-auto mb-2" />
              <span className="text-white text-sm font-medium block">
                2-Minute Setup
              </span>
              <span className="text-white/50 text-xs">quote in 5 mins</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Shield className="w-6 h-6 text-[#f57a0a] mx-auto mb-2" />
              <span className="text-white text-sm font-medium block">
                30-Day Guarantee
              </span>
              <span className="text-white/50 text-xs">
                full refund, no questions
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <Users className="w-6 h-6 text-[#f57a0a] mx-auto mb-2" />
              <span className="text-white text-sm font-medium block">
                2,847+ Tradies
              </span>
              <span className="text-white/50 text-xs">can't be wrong</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
