import { DataType } from '@/types/pages';

export const DATA: DataType = {
  metadata: {
    title: 'Reset Password Success',
    description: `Reset Password Success to generate Quotes faster using QuoteMatey.`,
    path: '/reset-password/success',
  },
  sections: [
    {
      type: 'AUTHSCREEN',
      visible: true,
      form: {
        type: 'reset-password',
        onSuccess: '/',
        top: {
          icon: {
            type: 'ICON',
            active: true,
            position: 'center',
            icon: 'Mail',
          },
        },
        header: {
          title: [
            {
              id: '0',
              type: 'text',
              bold: true,
              weight: 'light',
              text: 'Check your email',
            },
          ],
          description: [
            {
              id: '0',
              type: 'text',
              bold: true,
              weight: 'light',
              text: "We've sent a password reset link to ",
            },
            {
              id: '1',
              type: 'children',
              bold: true,
              weight: 'bold',
            },
            {
              id: '2',
              type: 'text',
              bold: true,
              weight: 'light',
              text: '. Please check your inbox and follow the instructions to reset your password.',
            },
          ],
        },
        footer: {
          buttons: [
            {
              id: 0,
              type: 'submit',
              action: '',
              variant: 'primary',
              link: {
                target: '_self',
                text: '',
                href: '/login',
                active: true,
              },
              text: 'Back to Login',
              icon: null,
            },
            {
              id: 1,
              type: 'submit',
              action: 'resend',
              variant: 'secondary',
              link: null,
              icon: null,
              text: 'Resend Email',
            },
          ],
          text: [
            {
              id: '0',
              type: 'text',
              bold: true,
              weight: 'light',
              text: "Didn't receive the email? Check your spam folder or ",
            },
            {
              id: '1',
              type: 'link',
              bold: true,
              weight: 'light',
              href: '/reset-password',
              text: 'try again',
              strong: true,
            },
          ],
        },
      },
      info: {
        image: {
          type: 'IMG',
          src: '/images/dashboard.png',
          alt: 'Dashboard shell image',
        },
        topCard: {
          id: '0',
          variant: 'primary',
          icon: {
            type: 'ICON',
            icon: 'Check',
            position: 'left',
            active: true,
            color: 'green',
          },
          title: [
            {
              id: '0',
              type: 'text',
              text: 'Quote generated',
            },
          ],
          description: 'Professional quote ready to send',
        },
        bottom: [
          {
            variant: 'secondary',
            id: '0',
            icon: {
              type: 'ICON',
              icon: 'Clock',
              position: 'left',
              stroke: '#0023D6',
              active: true,
            },
            title: [
              {
                id: '0',
                type: 'text',
                text: '30 mins ',
                bold: true,
                weight: 'bold',
              },
              {
                id: '1',
                type: 'text',
                text: ' \u2192',
                bold: true,
                weight: 'bold',
              },
              {
                id: '2',
                type: 'text',
                text: ' 1 min',
                bold: true,
                weight: 'bold',
              },
            ],
            description: 'Save hours on every quote',
          },
          {
            variant: 'secondary',
            id: '1',
            icon: {
              type: 'ICON',
              icon: 'Zap',
              position: 'left',
              stroke: '#FF5900',
              active: true,
            },
            title: [
              {
                id: '0',
                type: 'text',
                bold: true,
                weight: 'bold',
                text: 'Generated in 23 seconds',
              },
            ],
            description: 'From photos or text',
          },
          {
            variant: 'secondary',
            id: '2',
            icon: {
              type: 'ICON',
              icon: 'MessageSquare',
              stroke: '#001685',
              position: 'left',
              active: true,
            },
            title: [
              {
                id: '0',
                type: 'text',
                bold: true,
                weight: 'bold',
                text: 'Professional every time',
              },
            ],
            description: 'Customer-ready quotes',
          },
        ],
        achievement: {
          title: 'Trusted by thousands of tradies across Australia',
          users: [
            {
              type: 'IMG',
              src: '/images/mowingLawn.jpg',
              alt: 'Mowing Lawn',
            },
            {
              type: 'IMG',
              src: '/images/project-managers.webp',
              alt: 'Project managers',
            },
            {
              type: 'IMG',
              src: '/images/tap.jpg',
              alt: 'Leaking tap',
            },
            {
              type: 'IMG',
              src: '/images/electrician2.jpg',
              alt: 'Electrician',
            },
          ],
          ratingText: '4.9/5 from 1,200+ tradies',
          star: 5,
        },
      },
    },
  ],
};
