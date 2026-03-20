import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'QuoteMatey - Quote Faster, Win More Jobs | AI Quoting for Tradies',
  description: 'Stop losing jobs to faster tradies. QuoteMatey turns any photo into a professional quote in 60 seconds. Join 2,847+ tradies winning more work.',
  generator: 'v0.app',
  icons: {
    icon: '/images/QuoteMateyAppIcon.png',
    shortcut: '/images/QuoteMateyAppIcon.png',
    apple: '/images/QuoteMateyAppIcon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/QuoteMateyAppIcon.png" />
        <link rel="apple-touch-icon" href="/images/QuoteMateyAppIcon.png" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
