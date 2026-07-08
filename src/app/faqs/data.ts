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
        { bold: true, weight: 'bold', type: 'text', text: 'Frequently' },
        { type: 'lineBreak', text: '' },
        { bold: true, weight: 'bold', type: 'text', text: 'asked' },
        {
          bold: true,
          weight: 'bold',
          type: 'text',
          text: ' questions',
          strong: true,
        },
      ],
      description: [
        {
          bold: true,
          weight: 'medium',
          type: 'text',
          text: 'Find quick answers to common questions about QuoteMatey,',
        },
        {
          type: 'lineBreak',
          text: '',
        },
        {
          bold: true,
          weight: 'medium',
          type: 'text',
          text: ' pricing, features, payments, and account support.',
        },
      ],
    },
    {
      type: 'QNA',
      visible: true,
      categories: [
        {
          category: 'General',
          questions: [
            {
              question: 'How fast can I create a quote?',
              answer:
                'Most quotes can be generated in minutes using photos, voice notes, or simple job details.',
            },
            {
              question: 'Can I use QuoteMatey on-site?',
              answer:
                'Yes, QuoteMatey works on mobile and desktop so you can create and manage quotes anywhere.',
            },
            {
              question: 'How does the AI quoting work?',
              answer:
                'Our AI helps turn job information into professional quotes automatically, saving hours of manual work.',
            },
            {
              question: 'Is QuoteMatey built for all trades?',
              answer:
                'Yes, QuoteMatey is designed for electricians, plumbers, builders, landscapers, and many other trades.',
            },
          ],
        },
        {
          category: 'Platform & features',
          questions: [
            {
              question: 'What can QuoteMatey do?',
              answer:
                'QuoteMatey helps tradies create quotes, manage jobs, save templates, and organize client details in one place.',
            },
            {
              question: 'Can I upload photos or voice notes?',
              answer:
                'Yes, you can generate quotes using photos, videos, voice notes, or written job descriptions.',
            },
            {
              question: 'Does QuoteMatey save quote templates?',
              answer:
                'Yes, you can create reusable templates to speed up future quotes.',
            },
            {
              question: 'Can I manage multiple jobs at once?',
              answer:
                'Yes, QuoteMatey is built to help you stay organized across multiple clients and projects.',
            },
          ],
        },
        {
          category: 'Pricing & plans',
          questions: [
            {
              question: 'Can I upgrade my plan later?',
              answer:
                'Absolutely, you can upgrade or change your plan anytime.',
            },
            {
              question: 'What payment methods are accepted?',
              answer:
                'We accept PayPal which includes credit and debit cards, Apple Pay, and bank payments for secure and flexible checkout options.',
            },
          ],
        },
        {
          category: 'Account & support',
          questions: [
            {
              question: 'How do I create an account?',
              answer:
                'Simply sign up with your email and start creating quotes in minutes.',
            },
            {
              question: 'Can I cancel my subscription anytime?',
              answer:
                'Yes, there are no lock-in contracts and you can cancel whenever you want.',
            },
            {
              question: 'How can I contact support?',
              answer:
                'You can contact our support team directly through email or the support section inside QuoteMatey.',
            },
            {
              question: 'How quickly will I receive a response?',
              answer:
                'Our team aims to respond as quickly as possible to help keep your business moving.',
            },
          ],
        },
      ],
    },
    {
      type: 'CTA',
      visible: true,
      title: 'Still have questions?',
      description: 'Reach out and our team will guide you.',
      buttons: [
        {
          id: 0,
          variant: 'secondary-dark',
          link: null,
          text: 'Talk to our team',
          icon: { active: true, position: 'right', icon: 'ArrowRight' },
        },
      ],
    },
  ],
};
