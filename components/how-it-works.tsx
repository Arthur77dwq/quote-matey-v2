'use client';

import { Camera, Zap, Send, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Snap. Describe. Done.',
    description:
      "Take a photo of the job site, record a quick video, or just type what you see. That's all we need.",
    icon: Camera,
    time: '10 sec',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    number: '02',
    title: 'AI Does The Heavy Lifting',
    description:
      'Our AI analyzes the job, identifies materials, estimates labour, and creates a professional quote instantly.',
    icon: Zap,
    time: '47 sec',
    color: 'from-[#f57a0a] to-orange-600',
  },
  {
    number: '03',
    title: 'Send & Win The Job',
    description:
      'Review the quote, make any tweaks, and send it off. Be the first to respond. Win the job.',
    icon: Send,
    time: '30 sec',
    color: 'from-green-500 to-emerald-600',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-slate-100/50 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#f57a0a] bg-[#f57a0a]/10 px-4 py-1.5 rounded-full mb-4">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-4 tracking-tight">
            Photo to quote in <span className="text-[#f57a0a]">87 seconds</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No complicated setup. No learning curve. Just faster quotes and more
            jobs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-green-200" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-white rounded-2xl p-8 border border-border/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 h-full">
                {/* Step number with icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-5xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Time badge */}
                <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  {step.time}
                </div>

                <h3 className="text-xl font-bold text-[#0a1628] mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector for mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <ChevronRight className="w-6 h-6 text-slate-300 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Average time from photo to sent quote:{' '}
            <span className="font-bold text-foreground">
              1 minute 27 seconds
            </span>
          </p>
          <button
            onClick={() =>
              document
                .getElementById('cta')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center gap-2 text-[#f57a0a] font-semibold hover:gap-3 transition-all"
          >
            Start your free trial
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
