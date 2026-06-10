// src/lib/seo.ts

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/config/seo';

import { isProd } from './utils';

type GenerateMetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
};

export function generateMetadata({
  title,
  description,
  image,
  path = '',
  noIndex = false,
}: GenerateMetadataProps): Metadata {
  const pageTitle = title
    ? SEO_CONFIG.titleTemplate.replace('%s', title)
    : SEO_CONFIG.defaultTitle;

  const pageDescription = description || SEO_CONFIG.defaultDescription;

  const pageImage =
    image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultOgImage}`;

  const canonicalUrl = `${SEO_CONFIG.siteUrl}${path}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: SEO_CONFIG.defaultKeywords,
    category: SEO_CONFIG.category,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },

    robots: {
      index: isProd && !noIndex,
      follow: isProd && !noIndex,
    },
  };
}
