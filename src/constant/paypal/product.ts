import { CreatePaypalProductBody } from '@/types/paypal/product';

export const Product: CreatePaypalProductBody = {
  name: 'QuoteMatey SaaS',
  description:
    'AI-powered quote generation tool for tradespeople to create professional estimates quickly',
  type: 'SERVICE',
  category: 'SOFTWARE',
  image_url: 'https://quotematey.com/images/QuoteMateyAppIcon.png',
  home_url: 'https://quotematey.com',
};
