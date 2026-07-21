import { DataType } from '@/types/pages';

export const DATA: DataType = {
  metadata: {
    title: 'Privacy Policy',
    description:
      'This Privacy Policy explains how we collect, use, store, and protect your information when you use QuoteMatey, including our website, dashboard, and related services.',
    path: '/legal-pages/privacy-policy',
  },
  sections: [
    {
      type: 'HERO',
      visible: true,
      BGImage: {
        src: '/images/about/BackgroundSKYUNDERLAY.jpg',
        alt: '',
      },
      title: [
        {
          id: '0',
          bold: true,
          weight: 'bold',
          type: 'text',
          text: 'Privacy Policy',
        },
      ],
      description: [
        {
          id: '01',
          bold: true,
          weight: 'medium',
          type: 'text',
          text: 'Last updated: June 11, 2026',
        },
      ],
    },
    {
      type: 'PRIVACYPOLICY',
      visible: true,
      contents: [
        {
          id: '1',
          type: 'text',
          text: 'QuoteMatey ("QuoteMatey", "we", "our", or "us") is an AI-powered quoting assistant designed to help tradies generate professional job quotes from photos and text.',
        },
        // {
        //   id: '2',
        //   type: 'lineBreak',
        // },
        {
          id: '3',
          type: 'text',
          text: 'This Privacy Policy explains how we collect, use, store, and protect your information when you use QuoteMatey, including our website, dashboard, and related services.',
        },
        {
          id: '4',
          type: 'lineBreak',
        },
        {
          id: '5',
          type: 'text',
          text: 'By using QuoteMatey, you agree to the terms of this Privacy Policy.',
        },
        {
          id: '6',
          type: 'HEADING',
          level: 2,
          text: '1. Information We Collect',
        },
        {
          id: '7',
          type: 'text',
          text: 'We collect information to provide and improve the QuoteMatey service.',
        },
        {
          id: '8',
          type: 'HEADING',
          level: 3,
          text: '1.1 Information You Provide',
        },

        {
          id: '9',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'We may collect:',
            },
            {
              type: 'li',
              text: 'Account information (name, email, login details)',
            },
            {
              type: 'li',
              text: 'Business details (trade type, hourly rate, markup, GST settings)',
            },
            {
              type: 'li',
              text: 'Job inputs (text, photos)',
            },
            {
              type: 'li',
              text: 'Quotes generated and edited within the platform',
            },
            {
              type: 'li',
              text: 'Messages sent through support/contact forms',
            },
          ],
        },
        {
          id: '10',
          type: 'HEADING',
          level: 3,
          text: '1.2 Uploaded Job Content',
        },
        {
          id: '11',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'When you use QuoteMatey, you may upload:',
            },
            {
              type: 'li',
              text: 'Images of job sites',
            },
            {
              type: 'li',
              text: 'Written job descriptions',
            },
            {
              type: 'li',
              text: 'This content is processed by AI to generate structured quote drafts.',
            },
          ],
        },
        {
          id: '12',
          type: 'HEADING',
          level: 3,
          text: '1.3 Usage Data',
        },
        {
          id: '13',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'We may automatically collect:',
            },
            {
              type: 'li',
              text: 'Pages visited',
            },
            {
              type: 'li',
              text: 'Features used (quotes, templates, settings)',
            },
            {
              type: 'li',
              text: 'Usage frequency',
            },
            {
              type: 'li',
              text: 'Device and browser information',
            },
            {
              type: 'li',
              text: 'Log data (timestamps, actions taken).',
            },
            {
              type: 'text',
              text: 'This helps us improve performance and reliability.',
            },
          ],
        },
        {
          id: '14',
          type: 'HEADING',
          level: 3,
          text: '1.4 Payment Information',
        },
        {
          id: '15',
          type: 'text',
          text: 'If you subscribe to a paid plan, payment processing is handled securely by third-party payment providers. We do not store full credit card details on our servers.',
        },
        {
          id: '16',
          type: 'HEADING',
          level: 2,
          text: '2. How We Use Your Information',
        },
        {
          id: '17',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'We use collected data to:',
            },
            {
              type: 'li',
              text: 'Generate AI-powered quotes',
            },
            {
              type: 'li',
              text: 'Personalize quote outputs based on business settings',
            },
            {
              type: 'li',
              text: 'Store quote history and templates',
            },
            {
              type: 'li',
              text: 'Manage subscriptions and usage limits',
            },
            {
              type: 'li',
              text: 'Improve AI performance and accuracy',
            },
            {
              type: 'li',
              text: 'Provide customer support',
            },
            {
              type: 'li',
              text: 'Detect abuse or misuse of the platform',
            },
          ],
        },
        {
          id: '18',
          type: 'HEADING',
          level: 2,
          text: '3. How AI Processing Works',
        },
        {
          id: '19',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'QuoteMatey uses AI systems to process job inputs.',
            },
            {
              type: 'text',
              text: 'When you submit content:',
            },
            {
              type: 'li',
              text: 'Your input is analyzed (text, image)',
            },
            {
              type: 'li',
              text: 'AI extracts job scope, labour estimates, and materials',
            },
            {
              type: 'li',
              text: 'A structured quote draft is generated',
            },
            {
              type: 'text',
              text: 'Important:',
            },
            {
              type: 'li',
              text: 'AI outputs are probabilistic.',
            },
            {
              type: 'li',
              text: 'Results may contain errors or incomplete information.',
            },
            {
              type: 'li',
              text: 'Users must always review generated quotes before use.',
            },
          ],
        },
        {
          id: '20',
          type: 'HEADING',
          level: 2,
          text: '4. Data Storage & Retention',
        },
        {
          id: '21',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'We securely store:',
            },
            {
              type: 'li',
              text: 'Account information',
            },
            {
              type: 'li',
              text: 'Generated quotes',
            },
            {
              type: 'li',
              text: 'Job history',
            },
            {
              type: 'li',
              text: 'Uploaded content (as required for functionality)',
            },
            {
              type: 'li',
              text: 'We retain data as long as your account is active or as needed to provide services.',
            },
            {
              type: 'text',
              text: 'You may request deletion of your data at any time.',
            },
          ],
        },
        {
          id: '22',
          type: 'HEADING',
          level: 2,
          text: '5. Uploaded File Handling',
        },
        {
          id: '23',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'Files you upload (images) are:',
            },
            {
              type: 'li',
              text: 'Securely stored for processing',
            },
            {
              type: 'li',
              text: 'Used only to generate quotes',
            },
            {
              type: 'li',
              text: 'Not sold or shared with third parties for marketing',
            },
            {
              type: 'li',
              text: 'Uploaded content may be temporarily processed by AI services to generate outputs.',
            },
            {
              type: 'li',
              text: 'We do not use your private job data for unrelated advertising purposes.',
            },
          ],
        },
        {
          id: '24',
          type: 'HEADING',
          level: 2,
          text: '6. Data Sharing',
        },
        {
          id: '25',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'We do not sell your personal data.',
            },
            {
              type: 'text',
              text: 'We may share limited data with trusted third parties only when necessary, such as:',
            },
            {
              type: 'li',
              text: 'AI processing providers',
            },
            {
              type: 'li',
              text: 'Payment processors',
            },
            {
              type: 'li',
              text: 'Cloud hosting services',
            },
            {
              type: 'li',
              text: 'Analytics tools',
            },
            {
              type: 'li',
              text: 'All third-party providers are required to handle data securely.',
            },
          ],
        },
        {
          id: '26',
          type: 'HEADING',
          level: 2,
          text: '7. Data Security',
        },
        {
          id: '27',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'We take reasonable technical and organizational measures to protect your data, including:',
            },
            {
              type: 'li',
              text: 'Encrypted data transmission (HTTPS)',
            },
            {
              type: 'li',
              text: 'Secure authentication systems',
            },
            {
              type: 'li',
              text: 'Restricted database access',
            },
            {
              type: 'li',
              text: 'Monitored infrastructure',
            },
            {
              type: 'li',
              text: 'However, no system is 100% secure, and we cannot guarantee absolute protection.',
            },
          ],
        },
        {
          id: '28',
          type: 'HEADING',
          level: 2,
          text: '8. Your Rights',
        },
        {
          id: '29',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'Depending on your location, you may have rights to:',
            },
            {
              type: 'li',
              text: 'Access your personal data',
            },
            {
              type: 'li',
              text: 'Correct inaccurate information',
            },
            {
              type: 'li',
              text: 'Request deletion of data',
            },
            {
              type: 'li',
              text: 'Export your data',
            },
            {
              type: 'li',
              text: 'Restrict processing',
            },
            {
              type: 'li',
              text: 'You can request changes or deletion by contacting support.',
            },
          ],
        },
        {
          id: '30',
          type: 'HEADING',
          level: 2,
          text: '9. Cookies & Tracking',
        },
        {
          id: '31',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'QuoteMatey may use cookies and similar technologies to:',
            },
            {
              type: 'li',
              text: 'Improve performance',
            },
            {
              type: 'li',
              text: 'Analyze usage patterns',
            },
            {
              type: 'li',
              text: 'Measure feature engagement',
            },
            {
              type: 'text',
              text: 'We only track events that help improve product value, such as:',
            },
            {
              type: 'li',
              text: 'Quote generation',
            },
            {
              type: 'li',
              text: 'Quote export',
            },
            {
              type: 'li',
              text: 'Template usage',
            },
            {
              type: 'li',
              text: 'Upgrade actions',
            },
          ],
        },
        {
          id: '32',
          type: 'HEADING',
          level: 2,
          text: '10. AI Accuracy Disclaimer',
        },
        {
          id: '33',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'QuoteMatey is an AI-assisted quoting tool, not a financial or legal system.',
            },
            {
              type: 'text',
              text: 'We do not guarantee:',
            },
            {
              type: 'li',
              text: 'Pricing accuracy',
            },
            {
              type: 'li',
              text: 'Labour estimates',
            },
            {
              type: 'li',
              text: 'Material correctness',
            },
            {
              type: 'li',
              text: 'Business profitability',
            },
            {
              type: 'li',
              text: 'Job outcomes',
            },
            {
              type: 'li',
              text: 'Users are fully responsible for reviewing and approving all final quotes.',
            },
          ],
        },
        {
          id: '34',
          type: 'HEADING',
          level: 2,
          text: "11. Children's Privacy",
        },
        {
          id: '35',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'QuoteMatey is not intended for individuals under the legal age of majority in their jurisdiction.',
            },
            {
              type: 'text',
              text: 'We do not knowingly collect data from children.',
            },
          ],
        },
        {
          id: '36',
          type: 'HEADING',
          level: 2,
          text: '12. International Users',
        },
        {
          id: '37',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'If you access QuoteMatey from outside our primary operating jurisdiction, you acknowledge that your data may be transferred and processed in other countries where our servers or service providers operate.',
            },
          ],
        },
        {
          id: '38',
          type: 'HEADING',
          level: 2,
          text: '13. Data Deletion',
        },
        {
          id: '39',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'You may request deletion of your account and associated data at any time.',
            },
            {
              type: 'text',
              text: 'Upon deletion:',
            },
            {
              type: 'li',
              text: 'Account information is removed',
            },
            {
              type: 'li',
              text: 'Stored quotes may be deleted or anonymized',
            },
            {
              type: 'li',
              text: 'Logs may be retained for legal or security reasons',
            },
          ],
        },
        {
          id: '40',
          type: 'HEADING',
          level: 2,
          text: '14. Changes to This Policy',
        },
        {
          id: '41',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'We may update this Privacy Policy from time to time.',
            },
            {
              type: 'text',
              text: 'When changes occur:',
            },
            {
              type: 'li',
              text: 'We will update the “Last Updated” date',
            },
            {
              type: 'li',
              text: 'Continued use of QuoteMatey means acceptance of changes',
            },
          ],
        },
        {
          id: '42',
          type: 'HEADING',
          level: 2,
          text: '15. Contact Us',
        },
        {
          id: '43',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'If you have any questions about this Privacy Policy or your data, contact us via:',
            },
            {
              type: 'text',
              text: 'Contact QuoteMatey',
            },
          ],
        },
        {
          id: '44',
          type: 'HEADING',
          level: 2,
          text: 'Summary',
        },
        {
          id: '45',
          type: 'ul',
          items: [
            {
              type: 'text',
              text: 'QuoteMatey collects only the data necessary to:',
            },
            {
              type: 'li',
              text: 'Generate AI-powered quotes',
            },
            {
              type: 'li',
              text: 'Improve user experience',
            },
            {
              type: 'li',
              text: 'Manage accounts and subscriptions',
            },
            {
              type: 'li',
              text: 'Ensure platform stability and security',
            },
            {
              type: 'text',
              text: 'Your job data is used only to power your quoting workflow not for unrelated purposes.',
            },
          ],
        },
      ],
    },
  ],
};
