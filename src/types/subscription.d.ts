// ============================================
// PLAN
// ============================================

export type BillingInterval = 'MONTH' | 'YEAR';

export type Environment = 'sandbox' | 'live';

export interface PlanLimit {
  id: string;

  plan_id: string;

  text_limit: number;
  image_limit: number;

  interval: 'WEEK' | 'MONTH';

  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: string;

  name: string;
  description: string | null;

  price: number;
  currency: string;

  billing_interval: BillingInterval | null;

  isFree: boolean;

  paypal_plan_id: string | null;
  paypal_product_id: string | null;

  environment: Environment;

  version: number;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  limits?: PlanLimit[];
}

// ============================================
// SUBSCRIPTION
// ============================================

export type SubscriptionStatus =
  | 'ACTIVE'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'PENDING'
  | 'SUSPENDED';

export interface Subscription {
  id: string;

  firebase_uid: string;

  plan_id: string;

  plan?: Plan;

  paypal_subscription_id: string | null;

  status: SubscriptionStatus;

  start_date: Date | null;
  next_billing_date: Date | null;
  end_date: Date | null;

  cancel_at_period_end: boolean;

  last_payment_date: Date | null;
  last_payment_amount: number | null;

  currency: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionPlan = {
  id: string;
  version: string;
  name: string;
  trend: { text: string; tranding: boolean };
  description: string;
  pricing: { price: string; currency: string };
  period: string;
  features: {
    icon?: string;
    text: string;
    included: boolean;
  }[];
  points: {
    text: string;
    included: boolean;
  }[];
  highlighted: boolean;
  cta: { text: string; target: string };
};
