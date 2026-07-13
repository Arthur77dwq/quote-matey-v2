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

    defaultTitle: 'Quote Matey | AI Quote Generator for Tradies',

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
          position: 'right',
          active: true,
          icon: 'ArrowRight',
        },
      },
    ],
  },
};
