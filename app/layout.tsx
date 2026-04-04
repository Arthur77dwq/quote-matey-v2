import './globals.css';

// import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import Script from 'next/script';

import GoogleAnalyticsTracker from '@/components/Analytics';

// const _geist = Geist({ subsets: ['latin'] });
// const _geistMono = Geist_Mono({ subsets: ['latin'] });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: 'QuoteMatey - Quote Faster, Win More Jobs | AI Quoting for Tradies',
  description:
    'Stop losing jobs to faster tradies. QuoteMatey turns any photo into a professional quote in 60 seconds. Join 2,847+ tradies winning more work.',
  generator: 'v0.app',
  icons: {
    icon: '/images/QuoteMateyAppIcon.png',
    shortcut: '/images/QuoteMateyAppIcon.png',
    apple: '/images/QuoteMateyAppIcon.png',
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
      <body className="font-sans antialiased">
        <GoogleAnalyticsTracker />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
