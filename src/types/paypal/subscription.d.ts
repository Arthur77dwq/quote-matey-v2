export type SubscriptionStatus =
  | 'APPROVAL_PENDING'
  | 'APPROVED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CANCELLED'
  | 'EXPIRED';

export interface CreateSubscriptionBody {
  plan_id: string;

  application_context?: {
    brand_name?: string;
    return_url: string;
    cancel_url: string;
    user_action?: 'SUBSCRIBE_NOW';
  };
}

export interface PaypalSubscriptionResponse {
  id: string; // I-XXXX
  status: SubscriptionStatus;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}
