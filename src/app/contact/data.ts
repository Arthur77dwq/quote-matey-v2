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
    {
      type: 'CONTACTFORM',
      visible: true,
      Inputs: [
        [
          {
            name: 'name',
            field: 'Full Name',
            placeholder: 'Albert Einstein',
            required: true,
            type: 'text',
            autoFocus: true,
            autoComplete: 'on',
          },
          {
            name: 'email',
            field: 'Email',
            placeholder: 'albert@domain.com',
            required: true,
            type: 'email',
            autoFocus: false,
            autoComplete: 'on',
          },
        ],
        [
          {
            name: 'phone',
            field: 'Phone Number',
            placeholder: '+61 88-8844-4422',
            required: false,
            type: 'tel',
            minLength: 10,
            maxLength: 15,
            autoFocus: false,
            autoComplete: 'on',
          },
          {
            name: 'subject',
            field: 'Subject',
            placeholder: 'Enterprise Quotation Needed, etc',
            required: true,
            type: 'text',
            autoFocus: false,
            autoComplete: 'off',
          },
        ],
        [
          {
            name: 'message',
            field: 'Message',
            placeholder: 'Type Message...',
            required: true,
            type: 'text',
            autoFocus: false,
            autoComplete: 'off',
          },
        ],
      ],
    },
  ],
};
