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
        {
          id: '1',
          bold: true,
          weight: 'bold',
          type: 'text',
          text: 'Get in touch',
        },
        {
          id: '2',
          bold: true,
          weight: 'bold',
          type: 'text',
          text: ' with us',
          strong: true,
        },
      ],
      description: [
        {
          id: '1',
          bold: true,
          weight: 'medium',
          type: 'text',
          text: 'Get answers about QuoteMatey, pricing, features, and',
        },
        { id: '2', type: 'lineBreak', text: '' },
        {
          id: '3',
          bold: true,
          weight: 'medium',
          type: 'text',
          text: ' integrations. Our team is here to help you save time, simplify',
        },
        { id: '4', type: 'lineBreak', text: '' },
        {
          id: '5',
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
            placeholder: 'Enter your full name',
            required: true,
            type: 'text',
            autoFocus: true,
            autoComplete: 'on',
          },
          {
            name: 'email',
            field: 'Email',
            placeholder: 'hello@yourbrand.com',
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
            placeholder: 'Your contact number',
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
            placeholder: 'How can we help you?',
            required: false,
            type: 'text',
            autoFocus: false,
            autoComplete: 'off',
          },
        ],
        [
          {
            name: 'message',
            field: 'Message',
            placeholder: 'Write your message here...',
            required: false,
            type: 'textarea',
            autoFocus: false,
            autoComplete: 'off',
          },
        ],
      ],
    },
  ],
};
