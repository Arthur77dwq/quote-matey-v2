import { Star, TrendingUp, Zap, Users } from "lucide-react"

export function SocialProofBar() {
  return (
    <section className="py-8 bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          {/* Left - Headline */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 border-2 border-[#0a1628] flex items-center justify-center text-[10px] font-bold text-slate-700">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm sm:text-base font-medium text-white/90">
              Join <span className="text-[#f57a0a] font-bold">2,847+</span> tradies winning more work
            </span>
          </div>

          {/* Right - Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#f57a0a]" />
              </div>
              <div>
                <span className="font-bold text-white block text-lg leading-tight">127K+</span>
                <span className="text-white/60 text-xs">quotes sent</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <span className="font-bold text-white block text-lg leading-tight">$2.4M+</span>
                <span className="text-white/60 text-xs">jobs won</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <div>
                <span className="font-bold text-white block text-lg leading-tight">4.9/5</span>
                <span className="text-white/60 text-xs">avg rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
