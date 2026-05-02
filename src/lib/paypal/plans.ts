import { CreatePaypalPlanBody, PaypalPlanResponse } from '@/types/paypal/plan';

import { paypalHttp } from './http';

type Interval = 'MONTH' | 'YEAR';

export async function createPlan(params: {
  productId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: Interval;
}) {
  const body: CreatePaypalPlanBody = {
    product_id: params.productId,
    name: params.name,
    description: params.description,

    billing_cycles: [
      {
        frequency: {
          interval_unit: params.interval,
          interval_count: 1,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 0,

        pricing_scheme: {
          fixed_price: {
            value: params.price.toString(),
            currency_code: params.currency,
          },
        },
      },
    ],

    payment_preferences: {
      auto_bill_outstanding: true,
      payment_failure_threshold: 3,
    },
  };

  const data = await paypalHttp<PaypalPlanResponse, CreatePaypalPlanBody>(
    '/v1/billing/plans',
    'POST',
    body,
  );

  return data.id as string;
}
