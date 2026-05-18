export type Interval = 'WEEK' | 'MONTH' | 'YEAR';

export type TenureType = 'REGULAR' | 'TRIAL';

export interface CreatePaypalPlanBody {
  product_id: string;
  name: string;
  description: string;

  billing_cycles: Array<{
    frequency: {
      interval_unit: Interval;
      interval_count: number;
    };
    tenure_type: TenureType;
    sequence: number;
    total_cycles: number; // 0 = infinite
    pricing_scheme: {
      fixed_price: {
        value: string; // "499.00"
        currency_code: string;
      };
    };
  }>;

  payment_preferences: {
    auto_bill_outstanding: boolean;
    payment_failure_threshold: number;
  };
}

export interface PaypalPlanResponse {
  id: string; // P-XXXX
  name: string;
  status: string;
  create_time: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface AllPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billing_interval?: string;
  isFree: boolean;
  paypal_plan_id?: string;
  paypal_product_id?: string;
  environment: 'sandbox' | 'production';
  version: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  subscriptions: Subscription[];
  limits: PlanLimit[];
}
