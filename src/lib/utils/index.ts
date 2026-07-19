import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { RichTextNode } from '@/types/pages';

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

export const nameAcronoym = (name: string) => {
  const parts = name?.trim().split(/\s+/) ?? [];
  const acronymArray = parts.map((part) => part[0]);
  const acronym = acronymArray.join('');
  return acronym || null;
};

export const styleParse = (node: RichTextNode) => {
  const weightClass = {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  } as const;

  if (node.type !== 'lineBreak')
    return cn(
      node?.bold && weightClass[node.weight ?? 'normal'],
      node?.strong && 'text-warning-600',
      node?.italic && 'italic',
    );
};
