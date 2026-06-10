export const SEO_CONFIG = {
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
};
