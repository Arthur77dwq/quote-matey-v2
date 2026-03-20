import { Star, Quote, TrendingUp, Clock, Trophy } from "lucide-react"

const testimonials = [
  {
    quote: "I won 3 extra jobs in my first week. The customer said I was the first to respond, and that's why she picked me. QuoteMatey paid for itself on day one.",
    name: "Mike Thompson",
    role: "Electrician",
    location: "Sydney",
    metric: "+$4,200",
    metricLabel: "extra this month",
    avatar: "MT",
  },
  {
    quote: "Used to spend my evenings doing quotes. Now I quote on-site before I even leave. My wife loves that I'm home for dinner again.",
    name: "Dave Wilson",
    role: "Plumber",
    location: "Melbourne",
    metric: "15 hrs",
    metricLabel: "saved per month",
    avatar: "DW",
  },
  {
    quote: "My quotes look so professional now, customers think I'm a bigger operation. One client said 'you guys have your act together.' It's just me and QuoteMatey.",
    name: "Sarah Chen",
    role: "Carpenter",
    location: "Brisbane",
    metric: "47%",
    metricLabel: "higher close rate",
    avatar: "SC",
  },
  {
    quote: "I was underquoting jobs for years. QuoteMatey caught materials I was forgetting. I've added $380 to my average job price without losing customers.",
    name: "James O'Brien",
    role: "Handyman",
    location: "Perth",
    metric: "+$380",
    metricLabel: "per job average",
    avatar: "JO",
  },
  {
    quote: "The AI is scary accurate. Sent it a photo of a busted pipe, got a quote back in 45 seconds. Materials, labour, everything. Spot on.",
    name: "Tom Nguyen",
    role: "Plumber",
    location: "Adelaide",
    metric: "45 sec",
    metricLabel: "quote time",
    avatar: "TN",
  },
  {
    quote: "Tried 3 other quoting apps. This is the only one my tradie brain can actually use. No training needed. Just works.",
    name: "Chris Miller",
    role: "Electrician",
    location: "Gold Coast",
    metric: "2 min",
    metricLabel: "to learn",
    avatar: "CM",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#f57a0a] bg-[#f57a0a]/10 px-4 py-1.5 rounded-full mb-4">
            Real Results From Real Tradies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-4 tracking-tight">
            2,847 tradies can't be wrong
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These aren't actors. These are real tradies who stopped losing jobs to slow quotes.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-16 pb-16 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground block">$2.4M+</span>
              <span className="text-sm text-muted-foreground">in jobs won</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground block">127,000+</span>
              <span className="text-sm text-muted-foreground">quotes generated</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground block">4.9/5</span>
              <span className="text-sm text-muted-foreground">average rating</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-border/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600 block">{testimonial.metric}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{testimonial.metricLabel}</span>
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-slate-200" />
                <p className="text-foreground leading-relaxed pl-4">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
