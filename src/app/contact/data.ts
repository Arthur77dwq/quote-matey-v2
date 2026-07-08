import { DataType } from '@/types/pages';

export const DATA: DataType = {
  metadata: {
    title: 'FAQs',
    description:
      'Find quick answers to common questions about QuoteMatey, pricing, features, payments, and account support.',
    path: '/faqs',
  },
  sections: [
    {
      type: 'HERO',
      visible: true,
      title: [
        { bold: true, weight: 'bold', type: 'text', text: 'Get in touch' },
        {
          bold: true,
          weight: 'bold',
          type: 'text',
          text: ' with us',
          strong: true,
        },
      ],
      description: [
        {
          bold: true,
          weight: 'medium',
          type: 'text',
          text: 'Get answers about QuoteMatey, pricing, features, and',
        },
        {
          type: 'lineBreak',
          text: '',
        },
        {
          bold: true,
          weight: 'medium',
          type: 'text',
          text: ' integrations. Our team is here to help you save time, simplify',
        },
        {
          type: 'lineBreak',
          text: '',
        },
        {
          bold: true,
          weight: 'medium',
          type: 'text',
          text: ' quoting, and grow your trade business with AI-powered tools.',
        },
      ],
    },
  ],
};
