import {
  Zap,
  Shield,
  Target,
  Clock,
  TrendingUp,
  Smartphone,
} from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: '10x Faster Quoting',
    description:
      'What used to take 30 minutes now takes 2. Quote more jobs in less time.',
    stat: '87 sec',
    statLabel: 'avg quote time',
  },
  {
    icon: TrendingUp,
    title: 'Win More Jobs',
    description:
      'First to quote usually wins. Be faster than every competitor in your area.',
    stat: '47%',
    statLabel: 'higher win rate',
  },
  {
    icon: Shield,
    title: 'Never Underquote Again',
    description:
      'AI catches materials and labour you might forget. Protect your margins.',
    stat: '$380',
    statLabel: 'avg saved per job',
  },
  {
    icon: Target,
    title: 'Look Like a Pro',
    description:
      'Clean, consistent quotes that build instant trust with customers.',
    stat: '4.9/5',
    statLabel: 'customer rating',
  },
  {
    icon: Smartphone,
    title: 'Quote From Anywhere',
    description:
      'On-site? In the van? At home? Generate quotes from your phone instantly.',
    stat: '100%',
    statLabel: 'mobile friendly',
  },
  {
    icon: Clock,
    title: 'Get Your Evenings Back',
    description:
      'Stop spending nights doing admin. Quote during the job, not after.',
    stat: '15 hrs',
    statLabel: 'saved per month',
  },
];

export function Benefits() {
  return (
    <section className="py-24 bg-[#0a1628] text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f57a0a]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#f57a0a] bg-[#f57a0a]/10 px-4 py-1.5 rounded-full mb-4">
            Why Tradies Love Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            The unfair advantage your
            <br className="hidden sm:block" />
            <span className="text-[#f57a0a]">
              competition doesn't want you to have
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            While they're still scratching numbers on paper, you've already sent
            a professional quote and won the job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f57a0a] to-orange-600 flex items-center justify-center shadow-lg shadow-[#f57a0a]/20">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white block">
                    {benefit.stat}
                  </span>
                  <span className="text-xs text-white/50">
                    {benefit.statLabel}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
