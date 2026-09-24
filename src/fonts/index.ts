import { Geist, Geist_Mono, Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const plusJakarta = localFont({
  src: [
    {
      path: './PlusJakartaSans/PlusJakartaSans-Variable.woff2',
      style: 'normal',
    },
    {
      path: './PlusJakartaSans/PlusJakartaSans-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});
