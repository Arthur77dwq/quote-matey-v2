import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';

import GoogleAnalyticsTracker from '@/components/analytics';
import { AuthProvider } from '@/context/AuthContext';

const _geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const _geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ICON = '/images/QuoteMateyAppIcon.png';
export const metadata: Metadata = {
  title: 'QuoteMatey - Quote Faster, Win More Jobs | AI Quoting for Tradies',
  description:
    'Stop losing jobs to faster tradies. QuoteMatey turns any photo into a professional quote in 60 seconds. Join 2,847+ tradies winning more work.',
  generator: 'v0.app',
  icons: {
    icon: ICON,
    shortcut: ICON,
    apple: ICON,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/QuoteMateyAppIcon.png" />
        <link rel="apple-touch-icon" href="/images/QuoteMateyAppIcon.png" />
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
      </head>
      <body
        className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}
      >
        <Suspense fallback={null}>
          <GoogleAnalyticsTracker />
        </Suspense>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
