import { GlobalData } from '@/types/global';

export const GLOBAL_DATA: GlobalData = {
  brand: {
    logo: {
      normal: '/favicon.svg',
      big: '/favicon-big.png',
      with_bg: '/favicon-with-bg.png',
      social: '/images/og-image.png',
      long_with_subtitle: '/quotematey-hor-with-subtitle.png',
      long_with_out_subtitle: '/quotematey-hor-with-out-subtitle.png',
    },
  },
  metadata: {
    siteName: 'Quote Matey',
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    category: 'Business Software',

    defaultTitle: 'AI Quote Generator for Tradies | Quote Matey',

    titleTemplate: '%s | Quote Matey',

    defaultDescription:
      'Create professional quotes in minutes with AI-powered quoting software for tradies. Turn photos into accurate quotes, save time, and win more jobs.',

    defaultKeywords: [
      'quote generator',
      'quotation software',
      'business quotes',
      'sales quotations',
      'quote templates',
      'AI quote generator',
    ],

    defaultOgImage: '/images/og-image.png',

    author: 'Quote Matey Team',

    robots: {
      index: true,
      follow: true,
    },
  },
  headers: {
    type: 'GLOBAL_HEADER',
    logo: {
      href: '/',
      target: '_self',
      text: null,
      active: true,
      alt: 'Quote Matey',
      src: '/quotematey-hor-with-out-subtitle.png',
    },
    navBar: {
      active: true,
      links: [
        {
          href: '#product',
          target: '_self',
          text: 'Product',
          active: false,
        },
        {
          href: '/pricing',
          target: '_self',
          text: 'Pricing',
          active: false,
        },
        {
          href: '/about',
          target: '_self',
          text: 'About',
          active: false,
        },
      ],
    },
    buttons: [
      {
        id: 0,
        variant: 'outline',
        hidden: {
          mobile: true,
        },
        text: 'Login',
        link: {
          href: '/login',
          target: '_self',
          text: null,
          active: true,
        },
        icon: null,
      },
      {
        id: 1,
        variant: 'default',
        text: 'Start Free',
        link: {
          href: '/chat',
          target: '_self',
          text: null,
          active: true,
        },
        icon: {
          type: 'ICON',
          position: 'right',
          active: true,
          icon: 'ArrowRight',
        },
      },
    ],
  },
  footer: {
    BgImage: {
      type: 'IMG',
      src: '/images/FooterIMG.png',
      alt: '',
    },
    type: 'GLOBAL_FOOTER',
    title:
      'The AI-powered quoting tool that helps tradies win more jobs by quoting faster and looking more professional.',
    cta: {
      href: 'mailto:support@quotematey.com',
      target: '_blank',
      text: 'support@quotematey.com',
      active: true,
    },
    linkCategory: [
      {
        category: 'Pages',
        links: [
          {
            href: '/about',
            target: '_self',
            text: 'About',
            active: true,
          },
          {
            href: '/blog',
            target: '_self',
            text: 'Blog',
            active: true,
          },
          {
            href: '/pricing',
            target: '_self',
            text: 'Pricing',
            active: true,
          },
        ],
      },
      {
        category: 'Support',
        links: [
          {
            href: '/faqs',
            target: '_self',
            text: 'FAQs',
            active: true,
          },
          {
            href: '/contact',
            target: '_self',
            text: 'Contact',
            active: true,
          },
          {
            href: '/legal-pages/privacy-policy',
            target: '_self',
            text: 'Privacy Policy',
            active: true,
          },
        ],
      },
    ],
  },
  authDialog: {
    type: 'signup',
    variant: 'secondary',
    onSuccess: '/chat',
    top: {
      icon: {
        active: true,
        icon: 'X',
        type: 'ICON',
        position: 'center',
      },
      text: '',
    },
    header: {
      title: [
        {
          id: '1',
          type: 'text',
          text: 'Sign Up',
          bold: true,
          weight: 'bold',
        },
      ],
      description: 'Get started in seconds. Create your account.',
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
          value: 'signup',
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
  notFound: {
    tag: 'Something went wrong',
    title: [
      {
        id: '0',
        type: 'text',
        text: '404',
        strong: true,
        bold: true,
        weight: 'bold',
      },
    ],
    subTitle: 'Page not found',
    description:
      "The page you are looking for doesn't exist or has been moved.",
    buttons: [
      {
        id: 0,
        variant: 'secondary',
        text: 'Back to home',
        link: {
          href: '/',
          target: '_self',
          text: null,
          active: true,
        },
        icon: {
          type: 'ICON',
          active: true,
          position: 'right',
          icon: 'ArrowRight',
        },
      },
    ],
  },
};
