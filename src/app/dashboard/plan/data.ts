export type BillingCycle = 'monthly' | 'yearly';

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface PlanCardData {
  id: string;
  name: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
  priceMonthly: string;
  priceYearly: string;
  pricePeriod: string;
  points: string;
  isCurrent: boolean;
  buttonText: string;
  buttonVariant: 'current' | 'primary' | 'outline';
  features: PlanFeature[];
  footnote?: string;
}

export interface PlanComparisonRow {
  feature: string;
  free: string | boolean;
  starter: string | boolean;
  premium: string | boolean;
}

export interface UsageBreakdownItem {
  id: string;
  type: 'image' | 'text' | 'regen' | 'template';
  label: string;
  count: number;
  points: string;
}

export interface CurrentPlanData {
  planName: string;
  badge: string;
  pointsUsed: number;
  pointsTotal: number;
  resetsInDays: number;
  breakdown: UsageBreakdownItem[];
  totalUsed: string;
}

export interface BillingDetailsData {
  billingCycle: string;
  currentPlan: string;
  nextBillingDate: string;
  paymentMethod: string;
}

export interface UsageHistoryEntry {
  id: string;
  date: string;
  action: string;
  category: 'Image Input' | 'Text Input' | 'Regeneration' | 'Template';
  points: number;
  jobRef?: string;
}

const FEATURE_ANALYTICS_DASHBOARD = 'Analytics dashboard';

export const PLANS: PlanCardData[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Great for getting started with AI quotes.',
    priceMonthly: '$0',
    priceYearly: '$0',
    pricePeriod: '/month',
    points: '100 points / month',
    isCurrent: true,
    buttonText: 'Current Plan',
    buttonVariant: 'current',
    features: [
      { name: 'AI quote generation (limited)', included: true },
      { name: 'Basic templates', included: true },
      { name: 'PDF export', included: true },
      { name: 'Up to 10 quotes', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced templates', included: false },
      { name: 'Priority AI processing', included: false },
      { name: 'Unlimited quotes', included: false },
      { name: FEATURE_ANALYTICS_DASHBOARD, included: false },
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Most Popular',
    isPopular: true,
    description: 'Perfect for small businesses and regular quoting.',
    priceMonthly: '$19.99',
    priceYearly: '$16.59',
    pricePeriod: '/month',
    points: '10,000 points / month',
    isCurrent: false,
    buttonText: 'Upgrade to Starter',
    buttonVariant: 'primary',
    features: [
      { name: 'Everything in Free', included: true },
      { name: 'Standard templates', included: true },
      { name: 'Unlimited quotes', included: true },
      { name: 'Priority AI processing', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced templates', included: false },
      { name: 'Team members', included: false },
      { name: FEATURE_ANALYTICS_DASHBOARD, included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For power users who need unlimited potential.',
    priceMonthly: '$49.00',
    priceYearly: '$40.67',
    pricePeriod: '/month',
    points: 'Unlimited points*',
    isCurrent: false,
    buttonText: 'Upgrade to Premium',
    buttonVariant: 'outline',
    features: [
      { name: 'Everything in Starter', included: true },
      { name: 'All premium templates', included: true },
      { name: 'Advanced AI model access', included: true },
      { name: 'Team members (up to 5)', included: true },
      { name: FEATURE_ANALYTICS_DASHBOARD, included: true },
      { name: 'Priority support', included: true },
    ],
    footnote: '*Fair usage policy applies.',
  },
];

export const COMPARISON_ROWS: PlanComparisonRow[] = [
  {
    feature: 'Monthly Points',
    free: '100',
    starter: '10,000',
    premium: 'Unlimited*',
  },
  {
    feature: 'AI Model',
    free: 'Standard',
    starter: 'Advanced',
    premium: 'Advanced (High Power)',
  },
  {
    feature: 'Templates',
    free: 'Basic',
    starter: 'Standard',
    premium: 'All Premium',
  },
  {
    feature: 'Max Quotes',
    free: '10',
    starter: 'Unlimited',
    premium: 'Unlimited',
  },
  {
    feature: 'Export Options',
    free: 'PDF',
    starter: 'PDF, Copy, Email',
    premium: 'PDF, Copy, Email',
  },
  {
    feature: 'Team Members',
    free: '1',
    starter: '1',
    premium: 'Up to 5',
  },
  {
    feature: 'Analytics',
    free: 'Limited',
    starter: 'Basic',
    premium: 'Advanced',
  },
  {
    feature: 'Priority Support',
    free: false,
    starter: false,
    premium: true,
  },
];

export const CURRENT_PLAN: CurrentPlanData = {
  planName: 'Free Plan',
  badge: 'Free Plan',
  pointsUsed: 568,
  pointsTotal: 1000,
  resetsInDays: 18,
  breakdown: [
    {
      id: 'img-inputs',
      type: 'image',
      label: 'Image inputs',
      count: 2,
      points: '100 pts',
    },
    {
      id: 'text-inputs',
      type: 'text',
      label: 'Text inputs',
      count: 8,
      points: '136 pts',
    },
    {
      id: 'regens',
      type: 'regen',
      label: 'Regenerations',
      count: 3,
      points: '51 pts',
    },
    {
      id: 'templates',
      type: 'template',
      label: 'Template applications',
      count: 1,
      points: '25 pts',
    },
  ],
  totalUsed: '312 pts',
};

export const BILLING_DETAILS: BillingDetailsData = {
  billingCycle: 'Monthly',
  currentPlan: 'Free Plan',
  nextBillingDate: '—',
  paymentMethod: '—',
};

export const USAGE_HISTORY: UsageHistoryEntry[] = [
  {
    id: 'use-1',
    date: 'Today, 02:40 PM',
    action: 'Bathroom plumbing quote generated with 2 photos',
    category: 'Image Input',
    points: 50,
    jobRef: 'QM-1094',
  },
  {
    id: 'use-2',
    date: 'Today, 01:15 PM',
    action: 'Kitchen sink tapware estimate text prompt',
    category: 'Text Input',
    points: 17,
    jobRef: 'QM-1092',
  },
  {
    id: 'use-3',
    date: 'Yesterday, 04:22 PM',
    action: 'Regenerated materials pricing breakdown',
    category: 'Regeneration',
    points: 17,
    jobRef: 'QM-1089',
  },
  {
    id: 'use-4',
    date: 'Nov 21, 11:30 AM',
    action: 'Applied standard commercial plumbing template',
    category: 'Template',
    points: 25,
    jobRef: 'QM-1085',
  },
  {
    id: 'use-5',
    date: 'Nov 20, 09:10 AM',
    action: 'Toilet suite installation quote photo upload',
    category: 'Image Input',
    points: 50,
    jobRef: 'QM-1081',
  },
];
