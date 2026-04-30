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
