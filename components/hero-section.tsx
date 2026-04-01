'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Camera,
  Video,
  Play,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Zap,
  X,
  Upload,
} from 'lucide-react';

export function HeroSection() {
  const [jobDescription, setJobDescription] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const router = useRouter();

  const generateQuote = () => {
    if (jobDescription.trim()) {
      router.push(`/chat?message=${encodeURIComponent(jobDescription)}`);
    } else {
      router.push('/chat');
    }
  };

  return (
    <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/30" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#f57a0a]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#0a1628]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white border border-border/80 rounded-full pl-3 pr-4 py-2 mb-8 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-foreground">
                2,847 tradies started winning more jobs this month
              </span>
            </div>

            {/* Headline - Pain + Competition + Outcome */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-[#0a1628] mb-6">
              The fastest tradie
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">wins the job.</span>
                <span className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 bg-[#f57a0a]/20 -z-0 -rotate-1" />
              </span>
              <br />
              <span className="text-muted-foreground text-3xl sm:text-4xl lg:text-5xl">
                Are you fast enough?
              </span>
            </h1>

            {/* Subheadline - Speed + Money + Advantage */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Your competitors are quoting in{' '}
              <span className="text-foreground font-semibold">60 seconds</span>{' '}
              while you're still doing the math. Every slow quote costs you{' '}
              <span className="text-foreground font-semibold">
                $3,000-$5,000
              </span>{' '}
              in lost jobs per month.
            </p>

            {/* Primary + Secondary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => router.push('/chat')}
                className="group inline-flex items-center justify-center gap-2.5 bg-[#f57a0a] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#e06d00] transition-all shadow-xl shadow-[#f57a0a]/25 hover:shadow-2xl hover:shadow-[#f57a0a]/30 hover:-translate-y-0.5"
              >
                <Zap className="w-5 h-5" />
                Start Winning Jobs Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('video-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group inline-flex items-center justify-center gap-2 bg-white text-foreground px-6 py-4 rounded-full text-lg font-semibold border-2 border-border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
              >
                <Play className="w-5 h-5 text-[#f57a0a] fill-[#f57a0a]/20" />
                See it in Action
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#f57a0a]" />
                <span>2 min setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0a1628]" />
                <span>50 free quotes</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="relative lg:pl-8">
            {/* Main Demo Card */}
            <div className="bg-white rounded-3xl border border-border/80 shadow-2xl shadow-[#0a1628]/8 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-foreground block">
                    Try it now — free
                  </span>
                  <span className="text-xs text-muted-foreground">
                    See your quote in 60 seconds
                  </span>
                </div>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-semibold">
                  Live
                </span>
              </div>

              <input
                type="text"
                placeholder="Describe the job... (e.g., 'Leaking tap, need new fitting')"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-5 py-4 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0a1628] focus:border-transparent mb-4 bg-slate-50/50 text-base"
              />

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-50 text-foreground rounded-xl hover:bg-slate-100 transition-colors text-sm font-semibold border border-border/50"
                >
                  <Camera className="w-5 h-5 text-[#0a1628]" />
                  Upload Photo
                </button>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-50 text-foreground rounded-xl hover:bg-slate-100 transition-colors text-sm font-semibold border border-border/50"
                >
                  <Video className="w-5 h-5 text-[#0a1628]" />
                  Upload Video
                </button>
              </div>

              <button
                onClick={generateQuote}
                className="w-full bg-gradient-to-r from-[#0a1628] to-[#1a3a5c] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Generate My Quote Now
              </button>

              <p className="text-center text-sm text-muted-foreground mt-5">
                AI creates draft instantly.{' '}
                <span className="font-medium text-foreground">
                  You always review before sending.
                </span>
              </p>
            </div>

            {/* Speed Badge */}
            <div className="hidden lg:flex absolute -top-8 -right-4 items-center gap-2 bg-white border border-border rounded-full px-4 py-2.5 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-[#f57a0a]/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#f57a0a]" />
              </div>
              <div className="pr-1">
                <span className="text-lg font-bold text-foreground block leading-tight">
                  47s
                </span>
                <span className="text-xs text-muted-foreground">
                  avg. quote time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Feature Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#0a1628]">Coming Soon!</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#f57a0a]/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#f57a0a]" />
              </div>
              <p className="text-muted-foreground">
                Photo and video upload is currently in development. This feature
                will be available in the next update!
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>What's coming:</strong>
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI photo analysis for instant quotes</li>
                <li>• Video job descriptions</li>
                <li>• Automatic material detection</li>
                <li>• Mobile app integration</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-[#0a1628] text-white py-3 rounded-xl font-semibold hover:bg-[#1a2d45] transition-colors"
              >
                Got it, thanks!
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-slate-100 text-foreground py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
              >
                Notify me when ready
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
