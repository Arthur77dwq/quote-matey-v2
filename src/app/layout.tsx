import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

import GoogleAnalyticsTracker from '@/components/analytics';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { GLOBAL_DATA } from '@/constant/data/global';
import { AuthProvider } from '@/context/AuthContext';
import { geist, geistMono, inter, plusJakarta } from '@/fonts';
import { isProd } from '@/lib/utils';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(GLOBAL_DATA.metadata?.siteUrl || ''),

  title: {
    default: GLOBAL_DATA.metadata?.defaultTitle || '',
    template: GLOBAL_DATA.metadata?.titleTemplate || '',
  },
  category: GLOBAL_DATA.metadata?.category,
  description: GLOBAL_DATA.metadata?.defaultDescription,
  referrer: 'origin-when-cross-origin',
  keywords: GLOBAL_DATA.metadata?.defaultKeywords,

  authors: [
    {
      name: GLOBAL_DATA.metadata?.author,
    },
  ],

  robots: {
    index: isProd ? GLOBAL_DATA.metadata?.robots.index : false,
    follow: isProd ? GLOBAL_DATA.metadata?.robots.follow : false,
  },

  openGraph: {
    title: GLOBAL_DATA.metadata?.defaultTitle,
    description: GLOBAL_DATA.metadata?.defaultDescription,
    siteName: GLOBAL_DATA.metadata?.siteName,
    url: GLOBAL_DATA.metadata?.siteUrl,
    locale: 'en_US',
    type: 'website',

    images: [
      {
        url: GLOBAL_DATA.metadata?.defaultOgImage || '',
        width: 1200,
        height: 630,
        alt: GLOBAL_DATA.metadata?.siteName,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: GLOBAL_DATA.metadata?.defaultTitle,
    description: GLOBAL_DATA.metadata?.defaultDescription,

    images: [GLOBAL_DATA.metadata?.defaultOgImage || ''],
  },

  alternates: {
    canonical: GLOBAL_DATA.metadata?.siteUrl,
  },
  icons: {
    icon: GLOBAL_DATA.brand.logo.normal,
    shortcut: GLOBAL_DATA.brand.logo.normal,
    apple: GLOBAL_DATA.brand.logo.normal,
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
        className={`${plusJakarta.variable}
          ${inter.variable}
          ${geist.variable}
          ${geistMono.variable}
           font-sans antialiased`}
      >
        <Toaster
          closeButton
          position="top-right"
          offset={{ top: 80, right: 20 }}
        />
        <Suspense fallback={null}>
          <GoogleAnalyticsTracker />
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
