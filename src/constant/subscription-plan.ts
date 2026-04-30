import { SubscriptionPlan } from '@/types/subscription';

export const plans: SubscriptionPlan[] = [
  {
    id: '0',
    version: 'v1',
    name: 'Free',
    trend: {
      text: 'Most Popular',
      tranding: false,
    },
    pricing: { price: '$0', currency: 'AUD' },
    period: 'month',
    description: 'Designed for trial users and light use.',
    features: [
      { icon: 'image', text: '1 Image quote/week', included: true },
      { icon: 'text', text: '3 Text quote/week', included: true },
    ],
    points: [
      { text: 'Unlimited usage', included: false },
      { text: 'Priority processing', included: false },
      { text: 'Advanced refinement of quotes', included: false },
      { text: 'Webhook or business integrations', included: false },
      { text: 'Advanced consistency tuning', included: false },
    ],
    highlighted: false,
    cta: {
      text: 'Get Started',
      target: '/chat',
    },
  },
  {
    id: '1',
    version: 'v1',
    name: 'Starter Plan',
    trend: {
      text: 'Most Popular',
      tranding: true,
    },
    pricing: { price: '$29', currency: 'AUD' },
    period: 'month',
    description: 'Designed for working tradies using it daily.',
    features: [
      { icon: 'image', text: 'Unlimited Image quote', included: true },
      { icon: 'text', text: 'Unlimited Text quote', included: true },
    ],
    points: [
      { text: 'Unlimited usage', included: true },
      { text: 'Priority processing', included: true },
      { text: 'Advanced refinement of quotes', included: true },
      { text: 'Webhook or business integrations', included: true },
      { text: 'Advanced consistency tuning', included: true },
    ],
    highlighted: true,
    cta: {
      text: 'Get Started',
      target: '',
    },
  },
];
