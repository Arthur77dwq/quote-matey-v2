import { DataType } from '@/types/pages';

export const DATA: DataType = {
  metadata: {
    title: 'Login',
    description: `Login to generate Quotes faster using QuoteMatey.`,
    path: '/login',
  },
  sections: [
    {
      type: 'AUTHSCREEN',
      visible: true,
      form: {
        type: 'login',
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
          title: {
            type: 'HEADING',
            level: 1,
            content: [
              {
                active: true,
                id: '1',
                type: 'TEXT',
                text: 'Welcome',
                bold: true,
                weight: 'bold',
              },
              {
                id: '2',
                active: true,
                type: 'TEXT',
                text: ' back',
                strong: true,
              },
            ],
          },
          description:
            'Login to access your quotes, templates and AI assistant.',
          logo: {
            type: 'IMG',
            src: '/quotematey-hor-with-out-subtitle.png',
            alt: 'QuoteMatey Logo',
          },
        },
        body: {
          inputs: [
            {
              id: 'alpha',
              name: 'type',
              type: 'text',
              className: 'hidden',
              value: 'login',
            },
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
              placeholder: 'Password',
              icon: {
                type: 'ICON',
                active: true,
                position: 'left',
                icon: 'LockKeyhole',
              },
            },
          ],
          links: [
            {
              id: '0',
              href: '/reset-password',
              target: '_self',
              text: 'Forgot password?',
              active: true,
            },
          ],
        },
        footer: {
          text: [
            {
              id: '0',
              type: 'text',
              text: 'Don’t have an account?',
            },
            {
              id: '1',
              type: 'link',
              href: '/signup',
              text: ' Sign up now',
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
              action: 'authCustomLogin',
              link: null,
              text: 'Login',
              icon: null,
            },
            { id: 1, type: 'separator', text: 'or', active: true },
            {
              id: 2,
              variant: 'outline',
              action: 'authWithPopUp',
              link: null,
              text: 'Continue with Google',
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
          title: {
            type: 'HEADING',
            level: 1,
            content: [
              {
                active: true,
                id: '0',
                type: 'TEXT',
                text: 'Quote generated',
              },
            ],
          },
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
            title: {
              type: 'HEADING',
              level: 1,
              content: [
                {
                  active: true,
                  id: '0',
                  type: 'TEXT',
                  text: '30 mins ',
                  bold: true,
                  weight: 'bold',
                },
                {
                  id: '1',
                  active: true,
                  type: 'TEXT',
                  text: ' \u2192',
                  bold: true,
                  weight: 'bold',
                },
                {
                  active: true,
                  id: '2',
                  type: 'TEXT',
                  text: ' 1 min',
                  bold: true,
                  weight: 'bold',
                },
              ],
            },
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
            title: {
              type: 'HEADING',
              level: 1,
              content: [
                {
                  active: true,
                  id: '0',
                  type: 'TEXT',
                  bold: true,
                  weight: 'bold',
                  text: 'Generated in 23 seconds',
                },
              ],
            },
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
            title: {
              type: 'HEADING',
              level: 1,
              content: [
                {
                  active: true,
                  id: '0',
                  type: 'TEXT',
                  bold: true,
                  weight: 'bold',
                  text: 'Professional every time',
                },
              ],
            },
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
