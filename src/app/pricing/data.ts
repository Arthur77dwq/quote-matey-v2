import { DataType } from '@/types/pages';

export const DATA: DataType = {
  metadata: {
    title: 'Pricing',
    description: 'Pricing plans designed to cost you less than one missed job.',
    path: '/pricing',
  },
  sections: [
    {
      type: 'HERO',
      visible: true,
      title: [
        { bold: true, weight: 'bold', type: 'text', text: 'Costs less than' },
        {
          bold: true,
          weight: 'bold',
          type: 'text',
          text: ' one missed job',
          strong: true,
        },
      ],
      tag: 'Subscription plans',
    },
    {
      type: 'PRICING',
      visible: true,
      plans: [
        {
          id: 'free',
          variant: 'neutral',
          version: 1,
          name: 'Free plan',
          trend: {
            text: 'Popular',
            tranding: false,
          },
          pricing: { price: '$0', currency: 'AUD' },
          period: 'month',
          description: 'Best for trying QuoteMatey',
          features: [
            { text: '300 credit per month', included: true },
            { text: 'Limited AI usage', included: true },
            { text: 'Restricted templates & features', included: true },
            { text: 'Basic AI quote generation', included: true },
            { text: 'Quote history access', included: true },
            { text: 'Email support', included: true },
          ],
          cta: {
            target: '_self',
            text: 'Get Started',
            active: true,
            href: '/dashboard/plan',
          },
        },
        {
          id: 'starter_plan',
          variant: 'primary',
          version: 1,
          name: 'Starter plan',
          trend: {
            text: 'Popular',
            tranding: true,
          },
          pricing: { price: '$19', currency: 'AUD' },
          period: 'month',
          description: 'Best for active tradies',
          features: [
            { text: '10,000 credits per month', included: true },
            { text: 'Basic templates included', included: true },
            { text: 'Standard AI response speed', included: true },
            { text: 'Full quote dashboard', included: true },
            { text: 'Quote export support', included: true },
            { text: 'Quote history & regeneration', included: true },
          ],
          cta: {
            target: '_self',
            text: 'Get Started',
            active: true,
            href: '/dashboard/plan',
          },
        },
        {
          id: 'pro_plan',
          variant: 'secondary',
          version: 1,
          name: 'Pro plan',
          trend: {
            text: 'Popular',
            tranding: false,
          },
          pricing: { price: '$49', currency: 'AUD' },
          period: 'month',
          description: 'Best for growing businesses',
          features: [
            { text: 'Unlimited usage under fair use policy', included: true },
            { text: 'Better AI API performance', included: true },
            { text: 'Full template access', included: true },
            { text: 'Unlimited quote history', included: true },
            { text: 'Advanced quote formatting', included: true },
            { text: 'Priority support', included: true },
          ],
          cta: {
            target: '_self',
            text: 'Get Started',
            active: true,
            href: '/dashboard/plan',
          },
        },
      ],
      footer: 'No credit card required • Cancel anytime',
    },
    {
      type: 'QNA',
      visible: true,
      variant: 'secondary',
      title: [
        { bold: true, weight: 'bold', type: 'text', text: 'Frequently asked ' },
        {
          type: 'lineBreak',
          text: '',
        },
        {
          bold: true,
          weight: 'bold',
          type: 'text',
          text: ' questions',
          strong: true,
        },
      ],
      description: [
        {
          bold: true,
          weight: 'medium',
          type: 'text',
          text: 'Find quick answers to common questions about the platform, pricing, and security.',
        },
      ],
      categories: [
        {
          variant: 'secondary',
          questions: [
            {
              variant: 'secondary',
              question: "What if I'm not tech-savvy?",
              answer:
                'Perfect. Neither are most of our users. If you can take a photo with your phone and tap a button, you can use QuoteMatey. We designed it for tradies, not tech nerds. No training needed. Our average user sends their first quote within 3 minutes of signing up.',
            },
            {
              variant: 'secondary',
              question: 'Will this work for my specific trade?',
              answer:
                'QuoteMatey works for electricians, plumbers, carpenters, painters, HVAC techs, landscapers, roofers, tilers, plasterers, and pretty much any trade or service business. The AI adapts to your specific trade and learns from your adjustments over time.',
            },
            {
              variant: 'secondary',
              question: 'Is there really no credit card required?',
              answer:
                "Really. Start your free trial with no payment info. You get free quotes to test everything. Only pay if you decide it's worth it (spoiler: after winning their first extra job, most tradies sign up immediately).",
            },
            {
              variant: 'secondary',
              question: 'How is this different from other quoting software?',
              answer:
                "Other tools make you fill in forms and templates manually. QuoteMatey uses AI to generate the entire quote from a photo or description. It's like having a quoting assistant who's seen 100,000 jobs. Also, we're built specifically for tradies, not generic business software with a trade skin.",
            },
            {
              variant: 'secondary',
              question: 'How fast can I start using this?',
              answer:
                "About 2 minutes. Sign up, add your business details, and you're ready to quote. Most tradies send their first AI-generated quote within 5 minutes of creating an account. No complex setup, no importing data, no training required.",
            },
          ],
        },
      ],
    },
  ],
};
