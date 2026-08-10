import { DataType } from '@/types/pages';

export const DATA: DataType = {
  metadata: {
    title: 'Sign Up',
    description: `Signup to generate Quotes faster using QuoteMatey.`,
    path: '/signup',
  },
  sections: [
    {
      type: 'AUTHSCREEN',
      visible: true,
      form: {
        type: 'signup',
        onSuccess: '/chat',
        top: {
          icon: {
            active: true,
            icon: 'ArrowLeft',
            type: 'ICON',
            position: 'left',
          },
          text: 'Back',
        },
        header: {
          title: [
            {
              id: '1',
              type: 'text',
              text: 'Create your account and ',
              bold: true,
              weight: 'bold',
            },
            {
              id: '2',
              type: 'text',
              text: ' quote faster.',
              strong: true,
            },
          ],
          description:
            'Join thousands of tradies using AI to send professional quotes in seconds.',
          logo: {
            type: 'IMG',
            src: '/quotematey-hor-with-out-subtitle.png',
            alt: 'QuoteMatey Logo',
          },
        },
        body: {
          inputs: [
            {
              id: '0',
              name: 'email',
              type: 'email',
              placeholder: 'Email address',
              icon: {
                type: 'ICON',
                active: true,
                position: 'left',
                icon: 'Mail',
              },
            },
            {
              id: '1',
              name: 'password',
              type: 'password',
              placeholder: 'Create password',
              info: 'Password must be at least 8 characters ',
              icon: {
                type: 'ICON',
                active: true,
                position: 'left',
                icon: 'LockKeyhole',
              },
            },
            {
              id: '2',
              name: 'tnc',
              type: 'checkbox',
              label: [
                {
                  id: '0',
                  type: 'text',
                  text: 'I agree to the',
                },
                {
                  id: '1',
                  type: 'link',
                  href: '/terms',
                  text: ' Terms',
                  bold: true,
                  weight: 'semibold',
                  strong: true,
                },
                {
                  id: '2',
                  type: 'text',
                  text: ' & ',
                },
                {
                  id: '3',
                  type: 'link',
                  href: '/legal-pages/privacy-policy',
                  text: ' Privacy Policy',
                  bold: true,
                  weight: 'semibold',
                  strong: true,
                },
              ],
              icon: {
                type: 'ICON',
                active: true,
                position: 'left',
                icon: 'LockKeyhole',
              },
            },
          ],
          links: [],
        },
        footer: {
          text: [
            {
              id: '0',
              type: 'text',
              text: 'Already have an account?',
            },
            {
              id: '1',
              type: 'link',
              href: '/login',
              text: ' Login',
              bold: true,
              weight: 'semibold',
              strong: true,
            },
          ],
          buttons: [
            {
              id: 0,
              type: 'submit',
              variant: 'primary',
              action: 'authCustomSignup',
              link: null,
              text: 'Create Free Account',
              icon: null,
            },
            { id: 1, type: 'separator', text: 'or', active: true },
            {
              id: 2,
              variant: 'outline',
              action: 'authWithPopUp',
              link: null,
              text: 'Sign up with Google',
              icon: {
                type: 'ICON',
                active: true,
                position: 'left',
                icon: 'google',
              },
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
