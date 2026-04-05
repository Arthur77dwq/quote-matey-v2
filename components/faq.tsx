'use client';

import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How accurate are the AI-generated quotes?',
    answer:
      "Our AI analyzes thousands of similar jobs to provide estimates that are typically within 10-15% of final quotes. But here's the thing—you always review and adjust before sending. Think of it as a really smart assistant that does 90% of the work, and you add the finishing touches. Most tradies find they barely need to change anything.",
  },
  {
    question: "What if I'm not tech-savvy?",
    answer:
      'Perfect. Neither are most of our users. If you can take a photo with your phone and tap a button, you can use QuoteMatey. We designed it for tradies, not tech nerds. No training needed. Our average user sends their first quote within 3 minutes of signing up.',
  },
  {
    question: 'Will this work for my specific trade?',
    answer:
      'QuoteMatey works for electricians, plumbers, carpenters, painters, HVAC techs, landscapers, roofers, tilers, plasterers, and pretty much any trade or service business. The AI adapts to your specific trade and learns from your adjustments over time.',
  },
  {
    question: 'Is there really no credit card required?',
    answer:
      "Really. Start your free trial with no payment info. You get 5 free quotes to test everything. Only pay if you decide it's worth it (spoiler: after winning their first extra job, most tradies sign up immediately).",
  },
  {
    question: "What if I don't like it? Can I get a refund?",
    answer:
      "100%. We have a no-questions-asked 30-day money-back guarantee. If QuoteMatey doesn't help you win more jobs or save time, we'll refund every cent. We're confident you'll love it, but we're also not going to hold your money hostage.",
  },
  {
    question: 'How is this different from other quoting software?',
    answer:
      "Other tools make you fill in forms and templates manually. QuoteMatey uses AI to generate the entire quote from a photo or description. It's like having a quoting assistant who's seen 100,000 jobs. Also, we're built specifically for tradies — not generic business software with a trade skin.",
  },
  {
    question: "Can my customers tell it's AI-generated?",
    answer:
      "No way. Quotes look like they came from you, with your branding and your style. Customers just think you're impressively fast and professional. Several users have told us customers specifically commented on how polished their quotes look.",
  },
  {
    question: 'How fast can I start using this?',
    answer:
      "About 2 minutes. Sign up, add your business details, and you're ready to quote. Most tradies send their first AI-generated quote within 5 minutes of creating an account. No complex setup, no importing data, no training required.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#f57a0a] bg-[#f57a0a]/10 px-4 py-1.5 rounded-full mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4 tracking-tight">
            Everything you need to know
          </h2>
          <p className="text-lg text-muted-foreground">
            Can't find what you're looking for? Chat with us anytime.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                openIndex === index
                  ? 'border-[#0a1628]/20 shadow-lg'
                  : 'border-border hover:border-[#0a1628]/10'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-[#0a1628] pr-4 text-lg">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIndex === index
                      ? 'bg-[#0a1628] text-white'
                      : 'bg-slate-100'
                  }`}
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-slate-50 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[#0a1628] flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-bold text-[#0a1628] mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <button className="inline-flex items-center gap-2 bg-[#0a1628] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a3a5c] transition-colors">
            Chat with us
          </button>
        </div>
      </div>
    </section>
  );
}
