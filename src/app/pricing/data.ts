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
  ],
};
