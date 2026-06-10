import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function matchRoute(pathname: string, routes: readonly string[]) {
  return routes.some((route) => pathname.startsWith(route));
}

export function toDate(value?: string) {
  if (!value) return undefined;

  const date = new Date(value);

  return isNaN(date.getTime()) ? undefined : date;
}

export function formattedDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function cleanOutput(text?: string): string | undefined {
  return text
    ?.replace(/\*\*/g, '')
    ?.replace(/#{2,}/g, '')
    ?.replace(/[🎯✅🔥]/gu, '');
  // ?.replace(/\s+/g, ' ');
}

export const isProd = process.env.PAYPAL_ENV === 'live';
