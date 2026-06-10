import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

import GoogleAnalyticsTracker from '@/components/analytics';
import { Navbar } from '@/components/navbar';
import { SEO_CONFIG } from '@/config/seo';
import { AuthProvider } from '@/context/AuthContext';
import { isProd } from '@/lib/utils';

const _geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const _geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ICON = '/images/QuoteMateyAppIcon.png';

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),

  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  category: SEO_CONFIG.category,
  description: SEO_CONFIG.defaultDescription,
  referrer: 'origin-when-cross-origin',
  keywords: SEO_CONFIG.defaultKeywords,

  authors: [
    {
      name: SEO_CONFIG.author,
    },
  ],

  robots: {
    index: isProd ? SEO_CONFIG.robots.index : false,
    follow: isProd ? SEO_CONFIG.robots.follow : false,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  openGraph: {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    siteName: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    locale: 'en_US',
    type: 'website',

    images: [
      {
        url: SEO_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.siteName,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,

    images: [SEO_CONFIG.defaultOgImage],
  },

  alternates: {
    canonical: SEO_CONFIG.siteUrl,
  },
  icons: {
    icon: ICON,
    shortcut: ICON,
    apple: ICON,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            {/* Google Analytics */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}
      >
        <Toaster
          closeButton
          position="top-right"
          offset={{ top: 80, right: 20 }}
        />
        <Suspense fallback={null}>
          <GoogleAnalyticsTracker />
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
