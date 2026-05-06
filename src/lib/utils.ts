import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function matchRoute(pathname: string, routes: readonly string[]) {
  return routes.some((route) => pathname.startsWith(route));
}
