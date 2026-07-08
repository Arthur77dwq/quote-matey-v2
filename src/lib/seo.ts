import type { Metadata } from 'next';

import { GLOBAL_DATA } from '@/constant/data/global';
import { MetadataProps } from '@/types/global';

import { isProd } from './utils';

export function generateMetadata(
  props: MetadataProps | null | undefined,
): Metadata | null {
  if (props) {
    const { title, description, image, path = '', noIndex = false } = props;
    const pageTitle = title
      ? GLOBAL_DATA.metadata?.titleTemplate.replace('%s', title)
      : GLOBAL_DATA.metadata?.defaultTitle;

    const pageDescription =
      description || GLOBAL_DATA.metadata?.defaultDescription;

    const pageImage =
      image ||
      `${GLOBAL_DATA.metadata?.siteUrl}${GLOBAL_DATA.metadata?.defaultOgImage}`;

    const canonicalUrl = `${GLOBAL_DATA.metadata?.siteUrl}${path}`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: GLOBAL_DATA.metadata?.defaultKeywords,
      category: GLOBAL_DATA.metadata?.category,

      alternates: {
        canonical: canonicalUrl,
      },

      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: canonicalUrl,
        siteName: GLOBAL_DATA.metadata?.siteName,
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
  return null;
}
